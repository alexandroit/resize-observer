import { ResizeObserver } from '../../src/exports/resize-observer';

window.ResizeObserver = ResizeObserver;

const perfArea = document.getElementById('performance-example');
const perfFragment = document.createDocumentFragment();
const perfCount = document.getElementById('performance-count');
let ticks = 0;

const ro = new ResizeObserver(entries => {
  entries.forEach(entry => {
    if (entry.target.parentElement === perfArea) {
      ticks += 1;
      perfCount.innerText = ticks;
      return;
    }
    const { inlineSize, blockSize } = entry.contentBoxSize[0];
    entry.target.setAttribute('dimensions', `${Math.round(inlineSize)} x ${Math.round(blockSize)}`);
  });
});

[...document.querySelectorAll('pre code')].forEach(el => {
  el.textContent = el.textContent.trim();
});

const perfEls = [];

for (let i = 0; i < 200; i += 1) {
  const el = document.createElement('div');
  perfEls.push(el);
  perfFragment.appendChild(el);
}

perfArea.appendChild(perfFragment);

if (!('toggleAttribute' in HTMLElement.prototype)) {
  HTMLElement.prototype.toggleAttribute = function (attr) {
    if (this.hasAttribute(attr)) {
      this.removeAttribute(attr);
      return false;
    }
    this.setAttribute(attr, '');
    return true;
  }
}

perfArea.addEventListener('click', function () {
  const animating = this.toggleAttribute('data-animate');
  perfEls.forEach(el => animating ? ro.observe(el) : ro.unobserve(el));
});

document.getElementById('transition-example').addEventListener('click', function () {
  this.toggleAttribute('data-fill');
});

document.getElementById('animation-example').addEventListener('click', function () {
  this.toggleAttribute('data-animate');
});

[...document.querySelectorAll('[data-resize]')].forEach(el => ro.observe(el));
