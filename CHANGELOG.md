# Changelog

## 1.0.1 - 2026-08-19

- preserved the upstream Juggle v3 observer algorithm and the three existing named exports
- added a bundled `.mjs` entry point so native Node ESM imports resolve correctly
- retained the existing UMD/CommonJS entry point and added a dedicated browser-global bundle for direct script usage
- split ESM and CommonJS declaration routing and added a TypeScript 3.9 consumer regression test
- refreshed Jest, Rollup, ESLint, esbuild, and related build dependencies
- made versioned docs, AI-readable docs, direct downloads, and CI release artifacts reproducible
- added package entry-point smoke tests for ESM, CommonJS, and browser globals

## 1.0.0 - 2026-05-22

- established the stable Stackline 1.x package line
- preserved the Juggle ResizeObserver v3 runtime and public API
- published package documentation and a browser download bundle under the Stackline namespace

## Legacy Stackline version history

The entries below describe the earlier Stackline version sequence that preceded the stable `1.x` line.

## 4.0.5 - 2026-04-05

- standardized the README to the Stackline release pattern
- added versioned docs history for `4.0.0` through `4.0.5` under `docs-src/` and `docs/`
- replaced the old single demo page with an interactive example explorer covering box options, SVG, inline targets, transitions, animations, lifecycle controls, and observed-grid performance
- updated the docs build pipeline to generate per-version static builds and a version selector index
- no public API or output changes

## 4.0.4 - 2026-04-03

- upgraded Rollup from 2 to 3 (UMD bundler step; 2→3 required before advancing to 4)
- `rollup.config.js` unchanged — CJS format and simple UMD config fully compatible with Rollup 3
- UMD output format and public API unaffected
- no public API or output changes

## 4.0.3 - 2026-04-03

- upgraded ESLint from 8 to 9 (flat config)
- replaced `@typescript-eslint/eslint-plugin` + `@typescript-eslint/parser` v5 with `typescript-eslint` v8 (unified package, ESLint 9 compatible)
- migrated lint config from legacy `.eslintrc.json` to `eslint.config.js` (flat config)
- removed `@typescript-eslint/indent` rule (removed upstream in v6; code style unchanged)
- removed stale inline `// eslint-disable-next-line` directives from tests (now handled at config level)
- fixed test bug: `toBeTruthy` / `toBeFalsy` referenced as properties instead of called as functions in `dom-rect-read-only.test.ts`
- no public API or output changes

## 4.0.2 - 2026-04-03

- upgraded TypeScript from 4.7 to 5.9 (build toolchain)
- upgraded Jest from 28 to 29
- upgraded ts-jest from 28 to 29
- upgraded @types/jest from 28 to 29
- upgraded jest-environment-jsdom from 28 to 29
- no public API or output changes

## 4.0.1 - 2026-04-03

- renamed npm package scope to `@stackline/resize-observer`

## 4.0.0 - 2026-04-03

- republished the package for the maintained `@stackline/resize-observer` scope
- restored a local `docs/` build flow for GitHub Pages
- removed legacy analytics and stale upstream-only repository metadata
- added a GitHub Actions CI workflow for build, test, and package verification

## Upstream history

Earlier `3.x` releases were published from the original upstream project at `@juggle/resize-observer`.
