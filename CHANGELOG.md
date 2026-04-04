# Changelog

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

- renamed npm package scope to `@revivejs/resize-observer`

## 4.0.0 - 2026-04-03

- republished the package for the maintained `@revivejs/resize-observer` scope
- restored a local `docs/` build flow for GitHub Pages
- removed legacy analytics and stale upstream-only repository metadata
- added a GitHub Actions CI workflow for build, test, and package verification

## Upstream history

Earlier `3.x` releases were published from the original upstream project at `@juggle/resize-observer`.
