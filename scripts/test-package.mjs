import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const expectedExports = [
  'ResizeObserver',
  'ResizeObserverEntry',
  'ResizeObserverSize',
];

const esm = await import('@stackline/resize-observer');
const require = createRequire(import.meta.url);
const commonjs = require('@stackline/resize-observer');

assert.deepEqual(Object.keys(esm).sort(), expectedExports);
assert.deepEqual(Object.keys(commonjs).sort(), expectedExports);

for (const exportName of expectedExports) {
  assert.equal(typeof esm[exportName], 'function');
  assert.equal(typeof commonjs[exportName], 'function');
}

const browserBundle = await readFile(
  new URL('../lib/exports/resize-observer.browser.js', import.meta.url),
  'utf8',
);
const browserGlobal = {};
browserGlobal.globalThis = browserGlobal;
vm.runInNewContext(browserBundle, browserGlobal);

for (const exportName of expectedExports) {
  assert.equal(typeof browserGlobal[exportName], 'function');
}

console.log('ESM, CommonJS, and browser-global package entry points are valid.');
