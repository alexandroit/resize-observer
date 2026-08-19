import {
  ResizeObserver,
  ResizeObserverEntry,
  ResizeObserverSize,
} from '../lib/exports/resize-observer.js';

const root = typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
    ? self
    : undefined;

if (root) {
  root.ResizeObserver = ResizeObserver;
  root.ResizeObserverEntry = ResizeObserverEntry;
  root.ResizeObserverSize = ResizeObserverSize;
}
