#!/usr/bin/env node
/**
 * Decompiler & Source Extractor (`npm run extract-src`)
 * Extracts and organizes all Webpack modules, Vue components, Nuxt router, plugins,
 * directives, Sanity GROQ queries, GLSL shaders, and CSS from `public/_nuxt/*.js`
 * into a clean, human-readable `src/` directory tree.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NUXT_DIR = path.join(ROOT, 'public/_nuxt');
const SRC_DIR = path.join(ROOT, 'src');

function extractModulesFromChunk(filename) {
  const filePath = path.join(NUXT_DIR, filename);
  if (!fs.existsSync(filePath)) return {};
  const code = fs.readFileSync(filePath, 'utf8');
  const captured = {};
  const sandboxWindow = {
    webpackJsonp: {
      push(entry) {
        const mods = entry[1] || {};
        for (const [k, fn] of Object.entries(mods)) {
          captured[k] = fn.toString();
        }
      }
    }
  };
  try {
    const fn = new Function('window', 'self', code);
    fn(sandboxWindow, sandboxWindow);
  } catch (err) {
    // Fallback for runtime chunk
  }
  return captured;
}

function formatJs(code, headerComment) {
  return `/**\n * ${headerComment}\n * Reconstructed from Bürocratik (_nuxt bundle)\n */\n\n${code}\n`;
}

function main() {
  // 1. Collect all modules across all chunks
  const allChunkFiles = fs.readdirSync(NUXT_DIR).filter((f) => f.endsWith('.js'));
  const chunkModules = {};
  const globalModMap = {};

  for (const file of allChunkFiles) {
    const mods = extractModulesFromChunk(file);
    chunkModules[file] = mods;
    for (const [id, src] of Object.entries(mods)) {
      globalModMap[id] = { file, src };
    }
  }

  console.log(`Extracted ${Object.keys(globalModMap).length} total Webpack modules across ${allChunkFiles.length} chunks.`);

  // 2. Write Router & App Entry (from e6fc914.js Mod 112)
  if (globalModMap[112]) {
    fs.writeFileSync(
      path.join(SRC_DIR, 'router/router-and-app-entry.js'),
      formatJs(globalModMap[112].src, 'Nuxt 2 Router (All 43 Route Definitions) & App Bootstrap (Module 112 in _nuxt/e6fc914.js)')
    );
  }

  // 3. Write Core Plugins (from f4b42a5.js)
  const pluginMap = {
    'sanity-client.js': [130, 154, 135, 159, 385, 386],
    'page-lifecycle.js': [114, 155],
    'page-modal.js': [118, 496],
    'video-player.js': [151],
    'lenis-scroller.js': [152],
    'bot-assistant.js': [49],
    'custom-cursor.js': [176, 205, 387, 398, 399, 400, 401, 402, 403, 404],
    'audio-manager.js': [246, 264],
    'mouse-tracker.js': [247],
    'sanity-preview.js': [248],
    'gsap-custom-eases.js': [250],
    'helpers-and-keystack.js': [251, 209]
  };

  for (const [outName, ids] of Object.entries(pluginMap)) {
    const combined = ids
      .filter((id) => globalModMap[id])
      .map((id) => `// ==================== MODULE ${id} (${globalModMap[id].file}) ====================\nconst mod_${id} = ${globalModMap[id].src};`)
      .join('\n\n');
    fs.writeFileSync(
      path.join(SRC_DIR, 'plugins', outName),
      formatJs(combined, `Plugin: ${outName} (Modules: ${ids.join(', ')})`)
    );
  }

  // 4. Write Directives (v-motion, v-pointer, v-bot, v-intersection, v-lifecycle, v-has-scroll, v-prevent-scroll)
  if (globalModMap[249]) {
    fs.writeFileSync(
      path.join(SRC_DIR, 'directives/directives.js'),
      formatJs(globalModMap[249].src, 'Global Vue Directives: v-motion, v-pointer, v-bot, v-intersection, v-lifecycle, v-has-scroll, v-prevent-scroll (Module 249)')
    );
  }

  // 5. Write CMS GROQ Queries (Chunk 0 _nuxt/8c9bb95.jsMod 768 + Chunk 5 Mod 259)
  const cmsMods = [768, 259, 68].filter((id) => globalModMap[id]);
  fs.writeFileSync(
    path.join(SRC_DIR, 'cms/sanity-groq-queries.js'),
    formatJs(
      cmsMods.map((id) => `// ==================== MODULE ${id} (${globalModMap[id].file}) ====================\nconst mod_${id} = ${globalModMap[id].src};`).join('\n\n'),
      'Sanity.io GROQ Query Builders for Pages & Case Studies (Modules 768, 259, 68)'
    )
  );

  // 6. Write Layout & Builder Components
  const layoutMap = {
    'AppLayout.js': [413, 415],
    'Navbar.js': [202],
    'LoadingCurtain.js': [203],
    'PageNavbar.js': [204],
    'PageBuilder.js': [253],
    'CaseStudyBuilder.js': [265],
    'LetsTalkPage.js': [263],
    'Error404Page.js': [414],
    'ThreeSpaceWrapper.js': [389]
  };
  for (const [outName, ids] of Object.entries(layoutMap)) {
    const combined = ids
      .filter((id) => globalModMap[id])
      .map((id) => `// ==================== MODULE ${id} (${globalModMap[id].file}) ====================\nconst mod_${id} = ${globalModMap[id].src};`)
      .join('\n\n');
    fs.writeFileSync(
      path.join(SRC_DIR, 'components/layout', outName),
      formatJs(combined, `Layout Component: ${outName}`)
    );
  }

  // 7. Write UI Primitives (Mod 25, Mod 41, Mod 99, Mod 106, Mod 255, Mod 256, Mod 391, Mod 392)
  const primitivesMap = {
    'CorePrimitives.js': [25],
    'MotionAndTextPrimitives.js': [41, 99],
    'CardsAndControls.js': [106, 391, 392],
    'ImageAndPlayPrimitives.js': [255, 256]
  };
  for (const [outName, ids] of Object.entries(primitivesMap)) {
    const combined = ids
      .filter((id) => globalModMap[id])
      .map((id) => `// ==================== MODULE ${id} (${globalModMap[id].file}) ====================\nconst mod_${id} = ${globalModMap[id].src};`)
      .join('\n\n');
    fs.writeFileSync(
      path.join(SRC_DIR, 'components/primitives', outName),
      formatJs(combined, `UI Primitives: ${outName}`)
    );
  }

  // 8. Write All Page Sections, Routes, and WebGL Scenes from Lazy Chunks
  const NamedSectionChunks = {
    'c3d5f5e.js': 'FooterSection.js',
    'c49cf9b.js': 'TestimonialShowcaseSection.js',
    '0076ab1.js': 'BrandingPage.js',
    '1d75fc7.js': 'GameEasterEggPage.js',
    '79fb4b5.js': 'HomePage.js',
    'ec7ff87.js': 'LetsTalkRoute.js',
    '3011939.js': 'MusicEasterEggPage.js',
    '2b87ed0.js': 'NamingPage.js',
    '79c6c30.js': 'PasswordGatePage.js',
    '6a9b739.js': 'PrivacyPolicyPage.js',
    'ce815a2.js': 'RecognitionPage.js',
    '93f4dc6.js': 'RecognitionMusicPage.js',
    '0fcb2ab.js': 'StudiosPage.js',
    'e6143bb.js': 'StudiosMusicPage.js',
    '5e8af20.js': 'CaseStudyRoute.js',
    'c486466.js': 'WorkPage.js',
    '74c4944.js': 'WorkMusicPage.js',
    'bfb27c4.js': 'ThreeSpaceWarpWebGLGame.js',
    '2e4e004.js': 'ThreeStudiosLinesWebGLVisualizer.js',
    '113a1ce.js': 'EventGallerySection.js',
    '6af09bb.js': 'AwardsHeaderSection.js',
    '9544041.js': 'SelectedWorkSection.js',
    'da0c22a.js': 'BuroBirthdaySection.js',
    'dbc1086.js': 'AwardAchievementsSection.js',
    '863f31a.js': 'FaqSection.js',
    'c228739.js': 'CaseStudyHeaderSection.js',
    '4942610.js': 'StudiosServicesSection.js',
    '7c83f2e.js': 'ProjectsListSection.js',
    '748c097.js': 'StudiosHeaderSection.js',
    'ff7c3d0.js': 'ProjectsHeaderSection.js',
    '3399d13.js': 'ManifestoSection.js',
    '63e5d3c.js': 'PageCardGallerySection.js',
    '61c232e.js': 'BrandsListSection.js',
    '278e8b1.js': 'CaseStudyFullscreenMedia.js',
    '1de3694.js': 'CaseStudyHeading.js',
    '7da2e30.js': 'CaseStudyHeroVideo.js',
    'e5a5428.js': 'CaseStudyMediaGallery.js',
    'f6728a8.js': 'CaseStudyMediaMarquee.js',
    '97532f4.js': 'CaseStudyMediaSlider.js',
    '466d5e3.js': 'CaseStudyTestimonial.js',
    '5437f1e.js': 'CaseStudyTextWithMediaGallery.js',
    'ac11b49.js': 'ServicesSection.js',
    '1cdf22a.js': 'VideoHeaderSection.js',
    '20c790f.js': 'NamingShowcaseSection.js',
    'f8a7f6a.js': 'NamingsListSection.js',
    '0b64486.js': 'PrivacyContentSection.js',
    '2d7cc1b.js': 'PrivacyHeaderSection.js',
    '5c2cb72.js': 'AwardsListSection.js',
    '19f5717.js': 'EventsBiographyListSection.js',
    '63346e5.js': 'PointerPhotoGallerySection.js',
    '925645e.js': 'ClientShowcaseSection.js',
    '380d07c.js': 'StudioShowcaseSection.js',
    '8bc9b50.js': 'TeamSection.js'
  };

  for (const [chunkFile, targetName] of Object.entries(NamedSectionChunks)) {
    const mods = chunkModules[chunkFile];
    if (!mods) continue;
    const body = Object.entries(mods)
      .map(([id, src]) => `// ==================== MODULE ${id} (${chunkFile}) ====================\nconst mod_${id} = ${src};`)
      .join('\n\n');
    const subFolder = targetName.startsWith('CaseStudy') ? 'components/case-study' : 'components/sections';
    fs.writeFileSync(
      path.join(SRC_DIR, subFolder, targetName),
      formatJs(body, `${targetName} (Extracted from _nuxt/${chunkFile})`)
    );
  }

  // 9. Extract ALL CSS stylesheets across all modules into src/styles/
  const cssBlocks = [];
  for (const [id, { file, src }] of Object.entries(globalModMap)) {
    const pushMatches = src.match(/\.push\(\[[a-zA-Z_$]+\.i,\s*(["'`][\s\S]*?["'`]),\s*""\]\)/g);
    if (pushMatches) {
      for (const m of pushMatches) {
        const inner = m.replace(/^\.push\(\[[a-zA-Z_$]+\.i,\s*/, '').replace(/,\s*""\]\)$/, '');
        try {
          const parsedCss = eval(inner);
          cssBlocks.push(`/* ==================== CSS MODULE ${id} (${file}) ==================== */\n${parsedCss}`);
        } catch (e) {
          cssBlocks.push(`/* ==================== CSS MODULE ${id} (${file}) ==================== */\n${inner}`);
        }
      }
    }
  }
  fs.writeFileSync(
    path.join(SRC_DIR, 'styles/complete-site.css'),
    `/**\n * Complete Extracted Stylesheet (${cssBlocks.length} CSS Modules)\n * Includes 24-column fluid grid, Commercial Gräphik Web typography, and all component styles\n */\n\n` + cssBlocks.join('\n\n')
  );
  console.log(`Extracted ${cssBlocks.length} CSS stylesheets into src/styles/complete-site.css.`);
}

main();

