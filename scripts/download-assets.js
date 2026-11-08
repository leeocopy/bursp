#!/usr/bin/env node
/**
 * Complete Asset & Static Payload Downloader for Reconstructed Bürocratik Project
 * Downloads all Webpack chunks, static Nuxt payloads, case-study JSON files,
 * custom variable fonts, Rive (.riv) state machines, and interactive audio files.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ORIGIN = 'https://www.burocratik.com';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const STATIC_BASE = '/_nuxt/static/1791840994';

// 1. Extract all chunk hashes from _nuxt/4a88b9a.js
const runtimeCode = fs.readFileSync(path.join(PUBLIC_DIR, '_nuxt/4a88b9a.js'), 'utf8');
const chunkMapMatch = runtimeCode.match(/\{0:"[a-f0-9]+".*?\}/);
const chunkMap = chunkMapMatch ? eval('(' + chunkMapMatch[0] + ')') : {};

// 2. Extract all 53 routes from manifest.js
const manifestCode = fs.readFileSync(path.join(PUBLIC_DIR, '_nuxt/static/1791840994/manifest.js'), 'utf8');
const routesMatch = manifestCode.match(/routes:\[(.*?)\]/);
const routes = routesMatch ? JSON.parse('[' + routesMatch[1] + ']') : ['/'];

const CASE_SLUGS = [
  'clear-street', 'floema', 'speedy', 'grabgo', 'remote', 'multiversx',
  'phive', 'care-to-beauty', 'hematogenix', 'kozowood', 'talent-protocol',
  'flowcase', 'burocratik-18-years', 'jeton', 'redacted', 'tuu', 'keikku', 'flecto'
];

function buildDownloadList() {
  const urls = new Set();

  // Root HTML & core pages HTML
  urls.add('/');
  for (const r of ['/work', '/studios', '/recognition', '/branding', '/naming', '/lets-talk', '/privacy-policy', '/404', '/game', '/music', '/password']) {
    urls.add(r);
  }

  // All Webpack JS chunks
  for (const hash of Object.values(chunkMap)) {
    urls.add(`/_nuxt/${hash}.js`);
  }

  // All 53 route payload.js files
  for (const r of routes) {
    const clean = r === '/' ? '' : r;
    urls.add(`${STATIC_BASE}${clean}/payload.js`);
  }

  // Case study JSON endpoints for modal loader
  urls.add('/data/case-studies/index.json');
  for (const slug of CASE_SLUGS) {
    urls.add(`/data/case-studies/${slug}.json`);
  }

  // Fonts, Favicon, Social Preview, Rive, Audio
  urls.add('/favicon.ico');
  urls.add('/social-preview.jpg');
  urls.add('/_nuxt/fonts/CommercialGraphik-Upright-VF_wght-Web.20c08f0.woff2');
  urls.add('/rive/fuck_emoji.riv');
  urls.add('/audio/image-spawn.mp3');
  urls.add('/audio/home/18fkn-bass.mp3');
  for (let i = 1; i <= 5; i++) urls.add(`/audio/manifesto/${i}.mp3`);
  for (let i = 1; i <= 8; i++) {
    urls.add(`/audio/2Test/K-1/${i}.mp3`);
    urls.add(`/audio/2Test/Part4/${i}.mp3`);
  }
  for (let i = 1; i <= 9; i++) {
    urls.add(`/imgs/404/000${i}.webm`);
  }

  return Array.from(urls);
}

function downloadFile(urlPath) {
  return new Promise((resolve) => {
    let localRel = urlPath;
    if (urlPath === '/' || (!path.extname(urlPath) && !urlPath.endsWith('.json') && !urlPath.endsWith('.js'))) {
      localRel = path.join(urlPath, 'index.html');
    }
    const destPath = path.join(PUBLIC_DIR, localRel);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve({ urlPath, status: 'cached' });
    }
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    const req = https.get(ORIGIN + urlPath, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectPath = res.headers.location.startsWith('http')
          ? new URL(res.headers.location).pathname
          : res.headers.location;
        return downloadFile(redirectPath).then(resolve);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return resolve({ urlPath, status: `http_${res.statusCode}` });
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve({ urlPath, status: 'downloaded' });
      });
      fileStream.on('error', () => resolve({ urlPath, status: 'write_error' }));
    });
    req.on('error', (err) => resolve({ urlPath, status: `error:${err.message}` }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ urlPath, status: 'timeout' });
    });
  });
}

async function runPool(items, concurrency, fn) {
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function main() {
  const list = buildDownloadList();
  console.log(`Downloading ${list.length} assets from ${ORIGIN}...`);
  const results = await runPool(list, 12, downloadFile);
  const counts = {};
  for (const r of results) counts[r.status] = (counts[r.status] || 0) + 1;
  console.log('Primary pass summary:', counts);

  // Also scan downloaded payload.js files for any additional /rive/*.riv files
  const rivePaths = new Set();
  function scanForRive(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scanForRive(full);
      else if (entry.name.endsWith('.js') || entry.name.endsWith('.json')) {
        const content = fs.readFileSync(full, 'utf8');
        const matches = content.match(/\/rive\/[A-Za-z0-9_.-]+\.riv/g) || [];
        for (const m of matches) rivePaths.add(m);
      }
    }
  }
  scanForRive(PUBLIC_DIR);
  if (rivePaths.size > 0) {
    console.log(`Downloading ${rivePaths.size} discovered Rive (.riv) animations...`);
    await runPool(Array.from(rivePaths), 8, downloadFile);
  }
  console.log('Done!');
}

main();

