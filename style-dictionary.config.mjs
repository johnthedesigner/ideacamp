// Style Dictionary v5 — compiles DTCG token source (tokens/src/*.json) into
// CSS custom properties at styles/tokens/tokens.css.
// Source JSON is authoritative; the compiled CSS is a build artifact — never edit it.
// Run: node style-dictionary.config.mjs   (or: npm run tokens)

import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens/src/*.json'],
  platforms: {
    css: {
      // The default 'css' transformGroup minus 'size/rem': we keep dimensions
      // as authored px (matching the site), and this avoids size/rem choking on
      // the fluid clamp() type sizes. shadow/css/shorthand serializes the DTCG
      // shadow arrays; fontFamily/css quotes multi-word families.
      transforms: [
        'attribute/cti',
        'name/kebab',
        'time/seconds',
        'html/icon',
        'color/css',
        'asset/url',
        'fontFamily/css',
        'cubicBezier/css',
        'strokeStyle/css/shorthand',
        'border/css/shorthand',
        'typography/css/shorthand',
        'transition/css/shorthand',
        'shadow/css/shorthand',
      ],
      buildPath: 'styles/tokens/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            // Emit the primitive→semantic aliasing as var() references
            // (e.g. --color-primary: var(--color-blue-650)) so the two-tier
            // architecture is visible in the compiled output.
            outputReferences: true,
            // Keep $description text as inline comments in the CSS.
            outputReferenceFallbacks: false,
          },
        },
      ],
    },
  },
});

await sd.hasInitialized;
await sd.buildAllPlatforms();
console.log('✓ tokens compiled → styles/tokens/tokens.css');
