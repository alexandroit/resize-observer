# @stackline/resize-observer

> A maintained **ResizeObserver 4.0.x ponyfill** for browser applications, with support for `content-box`, `border-box`, and `device-pixel-content-box` observations, TypeScript declarations, ESM and UMD bundles, and versioned docs for every published Stackline release.

[![npm version](https://img.shields.io/npm/v/%40stackline%2Fresize-observer.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/resize-observer)
[![npm downloads](https://img.shields.io/npm/dt/%40stackline%2Fresize-observer.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/resize-observer)
[![npm monthly](https://img.shields.io/npm/dm/%40stackline%2Fresize-observer.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/resize-observer)
[![license](https://img.shields.io/npm/l/%40stackline%2Fresize-observer.svg?style=flat-square)](https://github.com/alexandroit/resize-observer/blob/HEAD/LICENSE)
[![JavaScript ES2018+](https://img.shields.io/badge/JavaScript-ES2018%2B-f7df1e?style=flat-square&logo=javascript&logoColor=111)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TypeScript typings](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/resize-observer.svg?style=flat-square)](https://github.com/alexandroit/resize-observer/stargazers)

**[Documentation & Live Demos](https://alexandroit.github.io/resize-observer/)** | **[npm](https://www.npmjs.com/package/@stackline/resize-observer)** | **[GitHub Download](https://github.com/alexandroit/resize-observer/tree/v3/downloads)** | **[Issues](https://github.com/alexandroit/resize-observer/issues)** | **[Repository](https://github.com/alexandroit/resize-observer)**  

**Latest version:** `4.0.5`

---

> **Credits:** Original project by Juggle.  
> Maintained and republished by Alexandroit under the Stackline scope.

---

## Why this library?

`@stackline/resize-observer` keeps the proven ResizeObserver ponyfill API available under active
package ownership for teams that still need a browser-safe observer implementation with box-size
support. The package stays intentionally close to the maintained 4.0.x line while cleaning up
metadata, documentation, and GitHub Pages delivery.

## Features

| Feature | Supported |
| :--- | :---: |
| Maintained ResizeObserver 4.0.x ponyfill line | ✅ |
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
11. [License](#license)

## Published Version Compatibility

| Package version | Maintained line | Runtime target | TypeScript declarations | Demo link |
| :---: | :---: | :--- | :--- | :--- |
| **4.0.5** | **ResizeObserver 4.0.x** | **Modern browsers with ES2018 demo bundle** | **`lib/exports/resize-observer.d.ts`** | [ResizeObserver 4.0.5 docs](https://alexandroit.github.io/resize-observer/v4.0.5/) |
| **4.0.4** | **ResizeObserver 4.0.x** | **Modern browsers with ES2018 demo bundle** | **`lib/exports/resize-observer.d.ts`** | [ResizeObserver 4.0.4 docs](https://alexandroit.github.io/resize-observer/v4.0.4/) |
| 4.0.3 | ResizeObserver 4.0.x | Modern browsers with ES2018 demo bundle | `lib/exports/resize-observer.d.ts` | [ResizeObserver 4.0.3 docs](https://alexandroit.github.io/resize-observer/v4.0.3/) |
| 4.0.2 | ResizeObserver 4.0.x | Modern browsers with ES2018 demo bundle | `lib/exports/resize-observer.d.ts` | [ResizeObserver 4.0.2 docs](https://alexandroit.github.io/resize-observer/v4.0.2/) |
| 4.0.1 | ResizeObserver 4.0.x | Modern browsers with ES2018 demo bundle | `lib/exports/resize-observer.d.ts` | [ResizeObserver 4.0.1 docs](https://alexandroit.github.io/resize-observer/v4.0.1/) |
| 4.0.0 | ResizeObserver 4.0.x | Modern browsers with ES2018 demo bundle | `lib/exports/resize-observer.d.ts` | [ResizeObserver 4.0.0 docs](https://alexandroit.github.io/resize-observer/v4.0.0/) |

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
| `lib/exports/resize-observer.js` | ESM bundle |
| `lib/exports/resize-observer.umd.js` | UMD/browser-compatible bundle |
| `lib/exports/resize-observer.d.ts` | TypeScript declarations |

---

## Run Locally

```bash
npm install
npm test
npm run build
npm run build:docs:all
npm start
```

---

## Publishing

```bash
npm run build
npm run pack:check
npm publish --access public
```

---

## License

Apache-2.0. See [LICENSE](LICENSE).

---

## Credits

- Original project: Juggle
- Upstream repository: https://github.com/juggle/resize-observer
- Maintained by: Alexandroit
