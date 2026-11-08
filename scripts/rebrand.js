#!/usr/bin/env node
/**
 * Static Rebranding Tool (`npm run rebrand`)
 * Permanently rewrites static files in `public/` using values from `brand.config.json`
 * so the site can also be deployed to any static host (Vercel, Netlify, Cloudflare Pages).
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const BRAND_CONFIG_PATH = path.join(ROOT_DIR, 'brand.config.json');

const brand = JSON.parse(fs.readFileSync(BRAND_CONFIG_PATH, 'utf8'));

function transformContent(text) {
  let out = text;
  if (brand.agencyName) {
    out = out.replace(/Bürocratik/g, brand.agencyName);
    out = out.replace(/Burocratik/g, brand.agencyName);
  }
  if (brand.shortName) {
    out = out.replace(/Büro/g, brand.shortName);
  }
  if (brand.contact?.generalEmail) {
    out = out.replace(/hello@burocratik\.com/g, brand.contact.generalEmail);
  }
  if (brand.contact?.careersEmail) {
    out = out.replace(/careers@burocratik\.com/g, brand.contact.careersEmail);
  }
  if (brand.contact?.phone) {
    out = out.replace(/\(\+351\) 239 499 110/g, brand.contact.phone);
  }
  return out;
}

let updatedCount = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(html|js|json)$/i.test(entry.name)) {
      const orig = fs.readFileSync(full, 'utf8');
      const next = transformContent(orig);
      if (next !== orig) {
        fs.writeFileSync(full, next, 'utf8');
        updatedCount++;
      }
    }
  }
}

walk(PUBLIC_DIR);
console.log(`✅ Rebranding applied to ${updatedCount} files in public/ (${brand.agencyName} / ${brand.shortName}).`);

