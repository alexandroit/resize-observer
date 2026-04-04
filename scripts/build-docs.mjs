import { build } from 'esbuild';
import { copyFile, mkdir } from 'node:fs/promises';

await mkdir('docs', { recursive: true });

await build({
  entryPoints: ['docs/src/page.js'],
  outfile: 'docs/page.js',
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2018'],
  minify: true
});

await copyFile('docs/src/index.html', 'docs/index.html');
await copyFile('docs/src/page.css', 'docs/page.css');
