# Bürocratik — Full Reconstructed Site & Rebrandable Source (`burocratik.com`)

Complete 1:1 reverse-engineered reconstruction of `https://www.burocratik.com/` built with **REA (`rea_rea`)**.

## 🚀 1. Quick Start (Run Locally)

```bash
npm start
# Opens at http://localhost:3000
```

## 🏷️ 2. How to Change the Site Name & Branding (`brand.config.json`)

Edit **`brand.config.json`** in the root folder:

```json
{
  "agencyName": "YourAgencyName",
  "shortName": "YourBrand",
  "tagline": "Phenomenal digital experiences.\nFunctional websites.\nRock & Roll identities.",
  "metaTitle": "YourAgencyName",
  "metaDescription": "Hello, we are YourBrand. We craft remarkable experiences on screen and paper.",
  "contact": {
    "generalEmail": "hello@yourdomain.com",
    "careersEmail": "careers@yourdomain.com",
    "phone": "(+212) 600 000 000"
  }
}
```

- **Live Mode (`npm start`):** `server.js` automatically reads `brand.config.json` on every request and replaces the brand name, short name, emails, and phone across all HTML pages, `state.js`, `payload.js` routes, and the loading screen (`"Hello / We are <shortName>"`).
- **Static Export Mode (`npm run rebrand`):** Permanently applies your `brand.config.json` changes to all files inside `public/` so you can deploy `public/` to Vercel, Netlify, or Cloudflare Pages.

## 📂 3. Project Structure

```text
burocratik/
├── brand.config.json              # ✏️ Edit this file to change the site name, emails, phone & branding
├── server.js                      # 🚀 Local Node server + live rebranding + /api/brevoSanity + asset proxy
├── package.json                   # Project scripts (start, rebrand, download-assets, extract-src)
├── data/
│   └── leads.json                 # Saved leads submitted via the /lets-talk form (/api/brevoSanity)
├── public/                        # Complete runnable static & SPA build
│   ├── index.html                 # Root entry + pre-rendered route HTMLs (/work, /studios, /lets-talk, etc.)
│   ├── _nuxt/                     # All 112 Webpack JS chunks + Commercial Gräphik Web variable font (.woff2)
│   │   └── static/1791840994/     # All 53 route payload.js files + state.js + manifest.js
│   ├── data/case-studies/         # Static JSON API for instant modal case study loading
│   ├── rive/                      # Interactive Rive (.riv) animations (fuck_emoji.riv, brand logos)
│   ├── audio/                     # Interactive sound effects & Manifesto Web Audio synth packs
│   └── imgs/404/                  # Transparent WebM team videos for /404 and /game
├── src/                           # 🧩 Full Decompiled & Organized Source Code (1,014 modules + 124 CSS modules)
│   ├── router/
│   │   └── router-and-app-entry.js
│   ├── plugins/                   # 12 core plugins (Lenis scroller, page lifecycle, modal, bot, cursor, audio, etc.)
│   ├── directives/
│   │   └── directives.js          # v-motion, v-pointer, v-bot, v-intersection, v-lifecycle
│   ├── cms/
│   │   └── sanity-groq-queries.js # Full Sanity.io GROQ queries & projections
│   ├── components/
│   │   ├── layout/                # AppLayout, Navbar, LoadingCurtain, PageBuilder, CaseStudyBuilder, LetsTalkPage
│   │   ├── primitives/            # Custom Physics Slider, Folder Stack, Marquee, Form, Newsletter, RiveAsset, etc.
│   │   ├── sections/              # All 27 Page Sections + WebGL scenes (ThreeSpaceWarp, ThreeStudiosLines)
│   │   └── case-study/            # All 9 Case Study Sections
│   └── styles/
│       └── complete-site.css      # All 124 extracted CSS modules (24-column fluid grid & typography)
└── scripts/
    ├── download-assets.js         # Downloads all 112 chunks, 53 route payloads, JSONs, fonts, Rive & audio
    ├── decompile-to-src.js        # Extracts all 1,014 Webpack modules & 124 CSS modules into src/
    └── rebrand.js                 # Applies brand.config.json permanently across public/
```

