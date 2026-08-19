# @stackline/resize-observer project memory

Last updated: 2026-08-19

## Current release

- Package: `@stackline/resize-observer`
- Stable version: `1.0.1`
- Public npm registry: `https://registry.npmjs.org/`
- Local Verdaccio registry: `http://192.168.3.52:4873/`
- Public docs: `https://alexandro.net/docs/vanilla/resize-observer/`
- Repository: `https://github.com/alexandroit/resize-observer`

## What was done for 1.0.1

- Confirmed that `src/` already matches the final upstream Juggle `v3` branch; no observer algorithm change was needed.
- Preserved every library file from `1.0.0` byte for byte and retained the same three named exports and prototype methods.
- Added only four distribution entries: bundled native ESM, direct browser globals, ESM declarations, and CommonJS declarations.
- Fixed native Node ESM, which previously failed on extensionless internal imports.
- Fixed the direct browser download so it exposes constructor globals as documented.
- Added TypeScript 3.9 declaration checks while keeping TypeScript 5.9 for development.
- Updated Jest 30, Rollup 4, ESLint 10, esbuild, ts-jest, and related tooling; `npm audit` reports zero known vulnerabilities.
- Made package inspection, historical downloads, versioned docs, AI-readable docs, and CI release artifacts reproducible.
- Restored generated documentation for the historical Stackline `4.x` docs sources and retained the `1.0.0` docs/download.
- Pinned every GitHub Actions dependency and moved CI/Pages builds to Node 22.22.
- Published the same CI-built tarball to Verdaccio and public npm as `latest`.
- Created Git tags and GitHub releases for `v1.0.0` and `v1.0.1`.
- Deployed only `/var/www/html/alexandro.net_docs/vanilla/resize-observer/` on `codex-server`.

## Release evidence

- Release tag commit: `0f4d4528b0405eaf4172dde450e18a8209e8fced`
- Package-content commit: `dd0d1e2381105fceff9f92d915cb6046a8d9562f`
- Final GitHub Actions CI run: `32314140981` (success)
- Final GitHub Pages workflow run: `32314140987` (success)
- Artifact directory: `/storage/data/releases/stackline-resize-observer/1.0.1-ci-32314140981`
- Tarball: `stackline-resize-observer-1.0.1.tgz` (21,814 bytes, 61 files)
- SHA-512: `3aed22fcfdd9087e46d1d446fb4daa77cd0bacb2db7223fc231a300bdace64eb4740e5d31c3f65fac414935e76d8832e94a79a3e71d049ca59148af480cd77ec`
- npm integrity: `sha512-Ou0i/P3ZCH5G0dRG+02qd80LrLLbciP8IxowC9rOZOtHQOXTHD9l+sQUk1522IMulKeaPnHQScpZFIr0gM137A==`
- npm shasum: `70f3a334c337f3616f3806b23d37dac566a4db41`
- Public npm and Verdaccio anonymous downloads matched the CI artifact byte for byte.
- `publint`: all good; Are the Types Wrong: no problems for Node 10, Node 16 ESM/CJS, bundlers, or package metadata.
- Tests: 7 suites passed; 64 passed, 1 skipped; 100% line coverage.
- Registry verification: 483 dependency signatures and 70 attestations verified.
- Public consumer project: `/storage/data/github/tests/stackline-resize-observer-test`.
- Public consumer smoke: TypeScript 3.9, native ESM, CommonJS, browser global, and audit all passed.
- Production docs returned HTTP 200, redirect to `v1.0.1`, expose current `llms*` files, and matched local hashes.

## Verification commands

Run these from `/storage/data/github/revivejs/resize-observer/resize-observer`:

```bash
npm run ci
npm run build:download
npm view @stackline/resize-observer version --registry https://registry.npmjs.org/
npm view @stackline/resize-observer version --registry http://192.168.3.52:4873/
```

Expected version:

```text
1.0.1
```

## Notes for future releases

- Keep docs source changes in `docs-src`, then rebuild generated `docs`.
- Deploy only this package's documentation directory. Never use a full docs-root `--delete` for a package release:

```bash
rsync -av --delete --chmod=D755,F644 --rsync-path='sudo rsync' docs/ codex-server:/var/www/html/alexandro.net_docs/vanilla/resize-observer/
```

- Publish to local Verdaccio from localhost because the saved auth token is host-specific:

```bash
npm publish --registry http://127.0.0.1:4873/ --access public
```

- Jest/jsdom still print deprecation notices for development-only transitive packages (`inflight`, old `glob`, and `whatwg-encoding`). They are not shipped to consumers and currently have no audit findings. Recheck them when Jest updates its dependency tree; do not force incompatible overrides.
