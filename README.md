# @stackline/resize-observer

> Polyfills the ResizeObserver API and supports box size options from the latest spec.

[![npm version](https://img.shields.io/npm/v/@stackline/resize-observer.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/resize-observer)
[![license](https://img.shields.io/npm/l/@stackline/resize-observer.svg?style=flat-square)](https://github.com/alexandroit/resize-observer)
[![GitHub repository](https://img.shields.io/badge/GitHub-repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/resize-observer)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/resize-observer/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/resize-observer/)** | **[npm](https://www.npmjs.com/package/@stackline/resize-observer)** | **[Issues](https://github.com/alexandroit/resize-observer/issues)** | **[Repository](https://github.com/alexandroit/resize-observer)**

**Current package version:** `1.0.5`

---

## Why this package?

`@stackline/resize-observer` is maintained as part of the Stackline package collection. It is an independent continuation of [the original project](https://github.com/juggle/resize-observer); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/resize-observer@1.0.5` |
| API target | `See the package-specific API reference` |
| Supported Node.js | `>=18` |
| License | `Apache-2.0` |
| Module type | `commonjs` |
| Main entry | `lib/exports/resize-observer.umd.js` |
| Module entry | `lib/exports/resize-observer.mjs` |
| Types | `lib/exports/resize-observer.d.ts` |
| Runtime dependencies | `none` |

## Installation

```bash
npm install @stackline/resize-observer
```

## Usage and API reference

> A maintained **ResizeObserver ponyfill** for browser applications, with support for `content-box`, `border-box`, and `device-pixel-content-box` observations, TypeScript declarations, ESM and UMD bundles, and versioned docs for every published Stackline release.


**[Documentation & Live Demos](https://alexandro.net/docs/vanilla/resize-observer/)** | **[npm](https://www.npmjs.com/package/@stackline/resize-observer)** | **[GitHub Download](https://github.com/alexandroit/resize-observer/tree/v3/downloads)** | **[Issues](https://github.com/alexandroit/resize-observer/issues)** | **[Repository](https://github.com/alexandroit/resize-observer)**

**Latest version:** `1.0.5`

---

> **Credits:** Original project by Juggle.<br>
> Maintained and republished by Alexandroit under the Stackline scope.

---

## Why this library?

`@stackline/resize-observer` keeps the proven ResizeObserver ponyfill API available under active
package ownership for teams that still need a browser-safe observer implementation with box-size
support. The package keeps the proven ponyfill API while cleaning up metadata, documentation, and
GitHub Pages delivery.

## Features

| Feature | Supported |
| :--- | :---: |
| Maintained Stackline 1.x ponyfill line | ✅ |
| `content-box`, `border-box`, and `device-pixel-content-box` | ✅ |
| Classic `contentRect` plus box-size arrays | ✅ |
| HTML, inline, and SVG targets | ✅ |
| Transition, animation, and lifecycle observation demos | ✅ |
| ESM and UMD bundles | ✅ |
| TypeScript declaration files | ✅ |
| Versioned docs per published package release | ✅ |

## Table of Contents

1. [Published Version Compatibility](#published-version-compatibility)
2. [Installation](#installation)
3. [Direct Download](#direct-download)
4. [Setup](#setup)
5. [Basic Usage](#basic-usage)
6. [Core APIs](#core-apis)
7. [Box Options and Output](#box-options-and-output)
8. [Browser Assets](#browser-assets)
9. [Run Locally](#run-locally)
10. [Publishing](#publishing)
11. [Security](#security)
12. [Community and Links](#community-and-links)
13. [License](#license)
14. [Credits](#credits)

## Published Version Compatibility

| Package version | Maintained line | Runtime target | TypeScript declarations | Demo link |
| :---: | :---: | :--- | :--- | :--- |
| **1.0.5** | **Current** | **ESM, CommonJS, and browser global** | **TypeScript 3.9+** | [ResizeObserver 1.0.5 docs](https://alexandro.net/docs/vanilla/resize-observer/) |
| **1.0.3** | Previous | **ESM, CommonJS, and browser global** | **TypeScript 3.9+** | [ResizeObserver 1.0.3 docs](https://alexandro.net/docs/vanilla/resize-observer/v1.0.3/) |
| 1.0.2 | Previous | ESM, CommonJS, and browser global | TypeScript 3.9+ | [ResizeObserver 1.0.2 docs](https://alexandro.net/docs/vanilla/resize-observer/v1.0.2/) |
| 1.0.1 | Previous | ESM, CommonJS, and browser global | TypeScript 3.9+ | [ResizeObserver 1.0.1 docs](https://alexandro.net/docs/vanilla/resize-observer/v1.0.1/) |
| 1.0.0 | Previous stable baseline | ESM for bundlers and UMD/CommonJS | TypeScript declarations | [ResizeObserver 1.0.0 docs](https://alexandro.net/docs/vanilla/resize-observer/v1.0.0/) |

Earlier `3.x` releases were published from the original upstream package line at `@juggle/resize-observer`.

---

## Installation

```bash
npm install @stackline/resize-observer
```

---

## Direct Download

If you want a plain JavaScript browser release, download the UMD bundle from GitHub:

- [GitHub downloads folder](https://github.com/alexandroit/resize-observer/tree/v3/downloads)

The archive includes `resize-observer.browser.js`, which exposes `window.ResizeObserver`.

```html
<script src="./resize-observer.browser.js"></script>
<script>
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      console.log(entry.contentRect.width, entry.contentRect.height);
    }
  });

  observer.observe(document.querySelector('[data-resize-target]'));
</script>
```

---

## Setup

```ts
import { ResizeObserver } from '@stackline/resize-observer';

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.contentRect.width, entry.contentRect.height);
  }
});
```

---

## Basic Usage

```ts
import { ResizeObserver } from '@stackline/resize-observer';

const target = document.querySelector('[data-resize-target]');

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const contentSize = entry.contentBoxSize[0];
    console.log({
      width: entry.contentRect.width,
      height: entry.contentRect.height,
      inlineSize: contentSize?.inlineSize,
      blockSize: contentSize?.blockSize
    });
  }
});

observer.observe(target, { box: 'content-box' });
```

---

## Core APIs

| API | Description |
| :--- | :--- |
| `new ResizeObserver(callback)` | Creates an observer that receives `ResizeObserverEntry[]` and the active observer instance. |
| `observe(target, options?)` | Starts observing an `Element` with an optional box selection. |
| `unobserve(target)` | Stops observing one target while leaving the observer active for others. |
| `disconnect()` | Stops every active observation on the observer. |

---

## Box Options and Output

| Option / Field | Description |
| :--- | :--- |
| `box: 'content-box'` | Measures the content box and maps naturally to text and padding-free layouts. |
| `box: 'border-box'` | Includes padding and borders for container-style sizing workflows. |
| `box: 'device-pixel-content-box'` | Exposes device-pixel measurements when the runtime supports them. |
| `contentRect` | Legacy rectangle snapshot used widely in existing production code. |
| `contentBoxSize` | Logical inline/block sizes for the content box. |
| `borderBoxSize` | Logical inline/block sizes for the border box. |
| `devicePixelContentBoxSize` | Logical inline/block sizes expressed in device pixels. |

---

## Browser Assets

The published package keeps the maintained distribution layout:

| File | Description |
| :--- | :--- |
| `lib/exports/resize-observer.mjs` | Bundled ESM entry point, including native Node ESM support |
| `lib/exports/resize-observer.umd.js` | CommonJS and UMD namespace entry point |
| `lib/exports/resize-observer.browser.js` | Plain browser bundle exposing `ResizeObserver`, `ResizeObserverEntry`, and `ResizeObserverSize` globals |
| `lib/exports/resize-observer.d.ts` | Shared TypeScript declarations, with ESM/CJS-specific declaration entry points |

The package keeps the established named exports in both module systems:

```js
const { ResizeObserver } = require('@stackline/resize-observer');
```

```js
import { ResizeObserver } from '@stackline/resize-observer';
```

---

## Run Locally

```bash
npm install
npm run check
npm start
```

---

## Publishing

Releases are built, tested, and published through the repository's
[GitHub Actions workflow](https://github.com/alexandroit/resize-observer/actions/workflows/publish.yml) using npm trusted
publishing and provenance. The workflow verifies the tested tarball's SHA-512
digest before publishing.

---

## Security

Report vulnerabilities privately by following [SECURITY.md](SECURITY.md). Do
not disclose exploit details in a public issue.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use the repository's issue tracker for reproducible bugs and feature requests.
Join r/Stackline to share examples, ask usage questions, and discuss releases.

## License

Apache-2.0. See [LICENSE](LICENSE).

---

## Credits

- Original project: Juggle
- Upstream repository: https://github.com/juggle/resize-observer
- Maintained by: Alexandroit

## Credits and original authors

- Original project: [resize-observer](https://github.com/juggle/resize-observer).
- Alexandro Paixao Marques.
- Juggle.
- Copyright 2019 JUGGLE LTD.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
