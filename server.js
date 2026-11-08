#!/usr/bin/env node
/**
 * Local Reconstructed Server for Bürocratik (https://www.burocratik.com/)
 *
 * Features:
 * 1. Serves all 53 pre-rendered Nuxt 2 static routes, _nuxt/* chunks, fonts, Rive (.riv), and audio.
 * 2. Live Dynamic Rebranding: Reads `brand.config.json` on every request and replaces
 *    "Bürocratik" / "Büro" / emails / taglines across HTML, `state.js`, `payload.js`, and `_nuxt/f4b42a5.js`!
 * 3. Implements `POST /api/brevoSanity` locally: validates and stores leads from `/lets-talk` into `data/leads.json`.
 * 4. Smart On-Demand Asset Proxy & Cache: If any `/_ipx/...`, `/rive/...`, `/audio/...`, or `/imgs/...` file
 *    is requested and not yet cached in `public/`, automatically fetches it from `https://www.burocratik.com`
 *    and caches it locally on disk so no asset ever 404s.
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 3000);
const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const BRAND_CONFIG_PATH = path.join(ROOT_DIR, 'brand.config.json');
const REMOTE_ORIGIN = 'https://www.burocratik.com';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.riv': 'application/octet-stream'
};

// Redirect aliases from Mod 112 in _nuxt/e6fc914.js
const REDIRECT_MAP = {
  '/clear-street': '/work/clear-street',
  '/floema': '/work/floema',
  '/speedy': '/work/speedy',
  '/grabgo': '/work/grabgo',
  '/remote': '/work/remote',
  '/multiversx': '/work/multiversx',
  '/phive': '/work/phive',
  '/care-to-beauty': '/work/care-to-beauty',
  '/hematogenix': '/work/hematogenix',
  '/keikku': '/work/keikku',
  '/flecto': '/work/flecto',
  '/flowcase': '/work/flowcase',
  '/kozowood': '/work/kozowood',
  '/placeholder': '/work/placeholder',
  '/talent-protocol': '/work/talent-protocol',
  '/burocratik-18-years': '/work/burocratik-18-years',
  '/jeton': '/work/jeton',
  '/redacted': '/work/redacted',
  '/tuu': '/work/tuu',
  '/brand': '/branding',
  '/brands': '/branding',
  '/contact': '/lets-talk',
  '/contacts': '/lets-talk',
  '/awards': '/recognition',
  '/about': '/studios'
};

function loadBrandConfig() {
  try {
    return JSON.parse(fs.readFileSync(BRAND_CONFIG_PATH, 'utf8'));
  } catch (e) {
    return null;
  }
}

function applyBrandingToText(content, ext) {
  const brand = loadBrandConfig();
  if (!brand) return content;

  let out = content;
  if (brand.agencyName && brand.agencyName !== 'Bürocratik') {
    out = out.replace(/Bürocratik/g, brand.agencyName);
    out = out.replace(/Burocratik/g, brand.agencyName);
  }
  if (brand.shortName && brand.shortName !== 'Büro') {
    out = out.replace(/Büro/g, brand.shortName);
  }
  if (brand.contact && brand.contact.generalEmail && brand.contact.generalEmail !== 'hello@burocratik.com') {
    out = out.replace(/hello@burocratik\.com/g, brand.contact.generalEmail);
  }
  if (brand.contact && brand.contact.careersEmail && brand.contact.careersEmail !== 'careers@burocratik.com') {
    out = out.replace(/careers@burocratik\.com/g, brand.contact.careersEmail);
  }
  if (brand.contact && brand.contact.phone && brand.contact.phone !== '(+351) 239 499 110') {
    out = out.replace(/\(\+351\) 239 499 110/g, brand.contact.phone);
  }
  return out;
}

function fetchAndCacheRemote(urlPath, destPath) {
  return new Promise((resolve) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const req = https.get(REMOTE_ORIGIN + urlPath, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return resolve(false);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        try {
          fs.writeFileSync(destPath, buf);
        } catch (err) {
          // ignore write errors
        }
        resolve(buf);
      });
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

function handleBrevoSanityApi(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const parsed = JSON.parse(body || '[]');
      fs.mkdirSync(DATA_DIR, { recursive: true });
      const leadsFile = path.join(DATA_DIR, 'leads.json');
      const existing = fs.existsSync(leadsFile)
        ? JSON.parse(fs.readFileSync(leadsFile, 'utf8'))
        : [];
      const entry = {
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        fields: parsed
      };
      existing.push(entry);
      fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2));
      console.log(`[API /api/brevoSanity] Saved new lead (${entry.id}) to data/leads.json`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, id: entry.id }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    }
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. Local Backend API: POST /api/brevoSanity
  if (pathname === '/api/brevoSanity' && req.method === 'POST') {
    return handleBrevoSanityApi(req, res);
  }

  // 2. Disable Service Worker caching locally so rebranding changes show immediately
  if (pathname === '/sw.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
    return res.end('// Service worker disabled in local development so rebranding updates immediately.\n');
  }

  // 3. Handle vanity redirects
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (REDIRECT_MAP[cleanPath]) {
    res.writeHead(302, { Location: REDIRECT_MAP[cleanPath] });
    return res.end();
  }

  // 4. Resolve local file path in public/
  let targetFile = path.join(PUBLIC_DIR, pathname);
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).isDirectory()) {
    targetFile = path.join(targetFile, 'index.html');
  } else if (!path.extname(targetFile) && !fs.existsSync(targetFile)) {
    const htmlCandidate = path.join(PUBLIC_DIR, pathname, 'index.html');
    if (fs.existsSync(htmlCandidate)) {
      targetFile = htmlCandidate;
    } else {
      // Fallback to root SPA shell (public/index.html)
      targetFile = path.join(PUBLIC_DIR, 'index.html');
    }
  }

  // 5. If a static asset (_ipx, _nuxt, audio, rive, imgs, data) is missing locally, fetch & cache on demand
  if (!fs.existsSync(targetFile) && path.extname(pathname)) {
    const fetchedBuf = await fetchAndCacheRemote(pathname, targetFile);
    if (fetchedBuf) {
      const ext = path.extname(targetFile).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      if (['.html', '.js', '.json'].includes(ext)) {
        return res.end(applyBrandingToText(fetchedBuf.toString('utf8'), ext));
      }
      return res.end(fetchedBuf);
    }
  }

  if (!fs.existsSync(targetFile)) {
    const fallback404 = path.join(PUBLIC_DIR, '404/index.html');
    const rootHtml = path.join(PUBLIC_DIR, 'index.html');
    targetFile = fs.existsSync(fallback404) ? fallback404 : rootHtml;
  }

  try {
    const ext = path.extname(targetFile).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    const buf = fs.readFileSync(targetFile);
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-store'
    });
    if (['.html', '.js', '.json'].includes(ext)) {
      return res.end(applyBrandingToText(buf.toString('utf8'), ext));
    }
    return res.end(buf);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error: ' + err.message);
  }
});

server.listen(PORT, () => {
  const brand = loadBrandConfig();
  console.log('================================================================');
  console.log(`🚀 Reconstructed Site Running at: http://localhost:${PORT}`);
  console.log(`🏷️  Active Brand Name: ${brand ? brand.agencyName : 'Bürocratik'} (${brand ? brand.shortName : 'Büro'})`);
  console.log(`✏️  Edit brand.config.json to change the site name/branding live!`);
  console.log('================================================================');
});

