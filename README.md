# @revivejs/resize-observer

> A maintained ResizeObserver ponyfill for browser applications, with support for content-box, border-box, and device-pixel-content-box observations.

[![npm version](https://img.shields.io/npm/v/@revivejs/resize-observer.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/resize-observer)
[![npm downloads](https://img.shields.io/npm/dt/@revivejs/resize-observer.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/resize-observer)
[![npm monthly](https://img.shields.io/npm/dm/@revivejs/resize-observer.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/resize-observer)
[![license](https://img.shields.io/npm/l/@revivejs/resize-observer.svg?style=flat-square)](https://github.com/alexandroit/resize-observer/blob/HEAD/LICENSE)
[![TypeScript 4.7+](https://img.shields.io/badge/TypeScript-4.7%2B-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/resize-observer.svg?style=flat-square)](https://github.com/alexandroit/resize-observer/stargazers)

**[Documentation & Demo](https://alexandroit.github.io/resize-observer/)** | **[Repository](https://github.com/alexandroit/resize-observer)** | **[npm](https://www.npmjs.com/package/@revivejs/resize-observer)** | **[Changelog](https://github.com/alexandroit/resize-observer/blob/HEAD/CHANGELOG.md)**

---

> **Credits:** Original project by Juggle.  
> Maintained and modernized by Revivejs.

---

## Why this package?

`@revivejs/resize-observer` preserves the proven upstream ResizeObserver polyfill while updating the package metadata, docs, demo pipeline, and repository automation for the current maintainer. It stays framework-agnostic, so Angular, React, Vue, Web Components, and plain browser apps can all use the same entry point.

---

## Features

| Feature | Supported |
| :--- | :---: |
| ResizeObserver ponyfill API | Yes |
| `content-box` observations | Yes |
| `border-box` observations | Yes |
| `device-pixel-content-box` observations | Yes |
| Resize loop error delivery | Yes |
| Inline-element handling rules | Yes |
| SVG element observation | Yes |
| Static GitHub Pages demo in `docs/` | Yes |

---

## Table of Contents

1. [Framework Compatibility](#framework-compatibility)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [API](#api)
5. [Configuration](#configuration)
6. [Run Locally](#run-locally)
7. [Publishing](#publishing)
8. [License](#license)

---

## Framework Compatibility

| Package Version | Angular | React | Vue | TypeScript | Notes |
| :--- | :---: | :---: | :---: | :---: | :--- |
| 4.x | Any browser-based version | Any browser-based version | Any browser-based version | 4.7+ | Maintained `@revivejs` fork |
| 3.x | Any browser-based version | Any browser-based version | Any browser-based version | 4.7 | Original upstream `@juggle` package line |

This library is not Angular-specific. If your framework runs in a browser and can import npm packages, it can use this ponyfill.

---

## Installation

```bash
npm install @revivejs/resize-observer
```

---

## Quick Start

```ts
import { ResizeObserver } from '@revivejs/resize-observer';

const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { inlineSize, blockSize } = entry.contentBoxSize[0];
    entry.target.setAttribute(
      'data-size',
      `${Math.round(inlineSize)} x ${Math.round(blockSize)}`
    );
  }
});

ro.observe(document.body, { box: 'content-box' });
```

---

## API

### `new ResizeObserver(callback)`

Creates an observer that receives `ResizeObserverEntry[]` and the active observer instance.

### `observe(target, options?)`

Starts observing an `Element`.

### `unobserve(target)`

Stops observing a previously registered `Element`.

### `disconnect()`

Stops all active observations for the observer.

### Resize observer entry fields

- `contentRect`
- `contentBoxSize`
- `borderBoxSize`
- `devicePixelContentBoxSize`

---

## Configuration

| Option | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `box` | `'content-box' \| 'border-box' \| 'device-pixel-content-box'` | Selects which box size to observe for each target. | `'content-box'` |

---

## Run Locally

```bash
npm install
npm test
npm run build
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

Apache-2.0

---

## Credits

- Original project: Juggle
- Maintained by: Revivejs
