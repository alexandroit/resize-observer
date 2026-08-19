module.exports = [
  {
    input: 'lib/exports/resize-observer.js',
    output: [
      {
        file: 'lib/exports/resize-observer.umd.js',
        format: 'umd',
        name: 'ResizeObserver',
      },
      {
        file: 'lib/exports/resize-observer.mjs',
        format: 'es',
      },
    ],
  },
  {
    input: 'scripts/browser-entry.mjs',
    output: {
      file: 'lib/exports/resize-observer.browser.js',
      format: 'iife',
    },
  },
];
