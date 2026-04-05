import { ResizeObserver } from '../../src/exports/resize-observer';

const meta = window.__REVIVE_RESIZE_DOCS_META__;

const state = {
  selectedDemoId: 'basic-observe',
  width: 240,
  height: 140,
  padding: 16,
  border: 8,
  textScale: 1,
  boxOption: 'content-box',
  perfCount: 120
};

const demoGroups = [
  {
    title: 'Getting Started',
    demos: [
      {
        id: 'basic-observe',
        category: 'Getting Started',
        title: 'Basic observe',
        summary: 'Observe one resizable HTML element and inspect the classic entry fields immediately.',
        controls: ['width', 'height', 'padding'],
        code: () => `import { ResizeObserver } from '@revivejs/resize-observer';

const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.contentRect.width, entry.contentRect.height);
  }
});

ro.observe(document.querySelector('[data-resize-target]'));`,
        toolbar: () => [
          actionButton('Increase width', () => updateState('width', Math.min(state.width + 30, 420))),
          actionButton('Increase height', () => updateState('height', Math.min(state.height + 24, 260))),
          actionButton('Reset', resetSizing)
        ],
        mount({ playground, observe, report }) {
          const wrap = create('div', { className: 'playground-center' });
          const target = createObservedBox('Observe me');
          applySize(target);
          wrap.appendChild(target);
          playground.appendChild(wrap);

          observe(target, {}, (entry, count) => {
            report([
              toneResult('Callback count', String(count), 'good'),
              result('contentRect', rectValue(entry.contentRect)),
              result('contentBoxSize', boxSizeValue(entry.contentBoxSize[0])),
              result('borderBoxSize', boxSizeValue(entry.borderBoxSize[0]))
            ]);
          });
        }
      }
    ]
  },
  {
    title: 'Box Options',
    demos: [
      {
        id: 'box-options',
        category: 'Box Options',
        title: 'content-box / border-box / device-pixel-content-box',
        summary: 'Switch observation boxes on the same element and compare what the entry exposes.',
        controls: ['width', 'height', 'padding', 'border', 'boxOption'],
        code: () => `import { ResizeObserver } from '@revivejs/resize-observer';

const ro = new ResizeObserver((entries) => {
  const entry = entries[0];
  console.log(entry.contentBoxSize, entry.borderBoxSize, entry.devicePixelContentBoxSize);
});

ro.observe(target, { box: '${state.boxOption}' });`,
        toolbar: () => [actionButton('Reset', resetSizing)],
        mount({ playground, observe, report }) {
          const wrap = create('div', { className: 'playground-center' });
          const target = createObservedBox(state.boxOption);
          applySize(target);
          target.style.padding = `${state.padding}px`;
          target.style.borderWidth = `${state.border}px`;
          wrap.appendChild(target);
          playground.appendChild(wrap);

          observe(target, { box: state.boxOption }, (entry, count) => {
            report([
              toneResult('Observed box', state.boxOption, 'good'),
              result('Callback count', String(count)),
              result('contentBoxSize', boxSizeValue(entry.contentBoxSize[0])),
              result('borderBoxSize', boxSizeValue(entry.borderBoxSize[0])),
              result('devicePixelContentBoxSize', boxSizeValue(entry.devicePixelContentBoxSize[0]))
            ]);
          });
        }
      }
    ]
  },
  {
    title: 'DOM Targets',
    demos: [
      {
        id: 'inline-target',
        category: 'DOM Targets',
        title: 'Inline element target',
        summary: 'Observe text-driven inline content and see how wrapping changes the measured size.',
        controls: ['width', 'textScale'],
        code: () => `const target = document.querySelector('.observer-target.is-inline');
ro.observe(target);`,
        toolbar: () => [
          actionButton('More text', () => updateState('textScale', Math.min(state.textScale + 0.25, 2))),
          actionButton('Less text', () => updateState('textScale', Math.max(state.textScale - 0.25, 0.75)))
        ],
        mount({ playground, observe, report }) {
          const note = create('p', {
            className: 'playground-note',
            textContent: 'Inline elements change size through content wrapping rather than fixed block dimensions.'
          });
          const wrap = create('div', { className: 'playground-center' });
          const target = createObservedBox('Inline content wraps as width changes.');
          target.classList.add('is-inline');
          target.style.maxWidth = `${state.width}px`;
          target.style.fontSize = `${state.textScale}rem`;
          wrap.appendChild(target);
          playground.append(note, wrap);

          observe(target, {}, (entry, count) => {
            report([
              toneResult('Callback count', String(count), 'good'),
              result('contentRect', rectValue(entry.contentRect)),
              result('Inline width limit', `${state.width}px`),
              result('Font size', `${state.textScale.toFixed(2)}rem`)
            ]);
          });
        }
      },
      {
        id: 'svg-target',
        category: 'DOM Targets',
        title: 'SVG element target',
        summary: 'Observe an SVG rect to confirm the ponyfill handles scalable graphics alongside HTML elements.',
        controls: ['width', 'height'],
        code: () => `const rect = document.querySelector('svg rect');
ro.observe(rect);`,
        toolbar: () => [actionButton('Reset', resetSizing)],
        mount({ playground, observe, report }) {
          const wrap = create('div', { className: 'svg-wrap' });
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('class', 'svg-demo');
          svg.setAttribute('width', '100%');
          svg.setAttribute('height', '220');
          svg.setAttribute('viewBox', '0 0 520 220');

          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', '80');
          rect.setAttribute('y', '40');
          rect.setAttribute('rx', '20');
          rect.setAttribute('ry', '20');
          rect.setAttribute('width', String(state.width));
          rect.setAttribute('height', String(state.height));
          rect.setAttribute('fill', '#cf5c36');

          const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          label.setAttribute('class', 'svg-label');
          label.setAttribute('x', String(80 + state.width / 2));
          label.setAttribute('y', String(40 + state.height / 2));
          label.textContent = 'SVG target';

          svg.append(rect, label);
          wrap.appendChild(svg);
          playground.appendChild(wrap);

          observe(rect, {}, (entry, count) => {
            report([
              toneResult('Callback count', String(count), 'good'),
              result('contentRect', rectValue(entry.contentRect)),
              result('SVG width', `${state.width}px`),
              result('SVG height', `${state.height}px`)
            ]);
          });
        }
      }
    ]
  },
  {
    title: 'Interaction',
    demos: [
      {
        id: 'transition-target',
        category: 'Interaction',
        title: 'Transition target',
        summary: 'Watch callbacks fire while border and size transition over time.',
        controls: ['width', 'height'],
        code: () => `target.toggleAttribute('data-filled');
ro.observe(target, { box: 'border-box' });`,
        toolbar: ({ target }) => [
          actionButton('Toggle transition', () => target.toggleAttribute('data-filled'))
        ],
        mount({ playground, observe, report, registerTarget }) {
          const wrap = create('div', { className: 'playground-center' });
          const target = createObservedBox('Transition me');
          target.classList.add('is-transition');
          applySize(target);
          wrap.appendChild(target);
          playground.appendChild(wrap);
          registerTarget(target);

          observe(target, { box: 'border-box' }, (entry, count) => {
            report([
              toneResult('Callback count', String(count), 'good'),
              result('borderBoxSize', boxSizeValue(entry.borderBoxSize[0])),
              result('contentRect', rectValue(entry.contentRect)),
              result('State', target.hasAttribute('data-filled') ? 'Filled' : 'Inset border')
            ]);
          });
        }
      },
      {
        id: 'animation-target',
        category: 'Interaction',
        title: 'Animation target',
        summary: 'Pause and resume an animated box to verify repeated size notifications stay stable.',
        controls: ['width', 'height'],
        code: () => `target.toggleAttribute('data-animate');
ro.observe(target, { box: 'border-box' });`,
        toolbar: ({ target }) => [
          actionButton('Toggle animation', () => target.toggleAttribute('data-animate'))
        ],
        mount({ playground, observe, report, registerTarget }) {
          const wrap = create('div', { className: 'playground-center' });
          const target = createObservedBox('Animate me');
          target.classList.add('is-animation');
          applySize(target);
          wrap.appendChild(target);
          playground.appendChild(wrap);
          registerTarget(target);

          observe(target, { box: 'border-box' }, (entry, count) => {
            report([
              toneResult('Callback count', String(count), 'good'),
              result('borderBoxSize', boxSizeValue(entry.borderBoxSize[0])),
              result('contentRect', rectValue(entry.contentRect)),
              result('Animation state', target.hasAttribute('data-animate') ? 'Running' : 'Paused')
            ]);
          });
        }
      }
    ]
  },
  {
    title: 'Lifecycle',
    demos: [
      {
        id: 'multiple-targets',
        category: 'Lifecycle',
        title: 'Multiple targets',
        summary: 'Observe multiple elements with one observer and inspect the latest callback batch.',
        controls: ['width', 'height'],
        code: () => `ro.observe(primary);
ro.observe(secondary);`,
        toolbar: () => [
          actionButton('Increase width', () => updateState('width', Math.min(state.width + 24, 420))),
          actionButton('Increase height', () => updateState('height', Math.min(state.height + 18, 240)))
        ],
        mount({ playground, observeMany, report }) {
          const stack = create('div', { className: 'observer-stack' });
          const primary = createObservedBox('Primary target');
          const secondary = createObservedBox('Secondary target');
          secondary.classList.add('observer-secondary');
          applySize(primary);
          secondary.style.width = `${Math.max(140, state.width - 60)}px`;
          secondary.style.height = `${Math.max(100, state.height - 30)}px`;
          stack.append(primary, secondary);
          playground.appendChild(stack);

          observeMany([
            { element: primary, options: {} },
            { element: secondary, options: { box: 'border-box' } }
          ], (entries, count) => {
            report([
              toneResult('Callback count', String(count), 'good'),
              result('Batch size', String(entries.length)),
              result('Primary rect', rectValue(entries[0].contentRect)),
              result('Secondary rect', rectValue(entries[1].contentRect))
            ]);
          });
        }
      },
      {
        id: 'lifecycle-controls',
        category: 'Lifecycle',
        title: 'observe / unobserve / disconnect',
        summary: 'Control the lifecycle manually and verify callbacks stop when the target is no longer observed.',
        controls: ['width', 'height'],
        code: () => `ro.observe(target);
ro.unobserve(target);
ro.disconnect();`,
        toolbar: ({ target, helpers }) => [
          actionButton('Observe', () => helpers.observeTarget(target)),
          actionButton('Unobserve', () => helpers.unobserveTarget(target)),
          actionButton('Disconnect', () => helpers.disconnectObserver()),
          actionButton('Resize target', () => updateState('width', state.width === 240 ? 320 : 240))
        ],
        mount({ playground, report, registerTarget, lifecycle }) {
          const wrap = create('div', { className: 'playground-center' });
          const target = createObservedBox('Lifecycle target');
          applySize(target);
          wrap.appendChild(target);
          playground.appendChild(wrap);
          registerTarget(target);

          lifecycle.setReporter((entry, count, status) => {
            report([
              toneResult('Observer status', status, status === 'observing' ? 'good' : 'warn'),
              result('Callback count', String(count)),
              result('contentRect', entry ? rectValue(entry.contentRect) : 'No callback yet'),
              result('Target width', `${state.width}px`)
            ]);
          });

          lifecycle.observeTarget(target);
        }
      }
    ]
  },
  {
    title: 'Performance',
    demos: [
      {
        id: 'performance-grid',
        category: 'Performance',
        title: 'Observed grid',
        summary: 'Toggle a grid of many observed elements to inspect callback throughput without leaving the docs.',
        controls: ['perfCount'],
        code: () => `const nodes = [...grid.children];
nodes.forEach((node) => ro.observe(node));
grid.toggleAttribute('data-animate');`,
        toolbar: ({ target }) => [
          actionButton('Toggle animation', () => target.toggleAttribute('data-animate'))
        ],
        mount({ playground, report, registerTarget, observeMany }) {
          const note = create('p', {
            className: 'playground-note observer-note',
            textContent: 'Click the button to animate the observed grid and watch the callback count climb.'
          });
          const grid = create('div', { className: 'performance-area' });
          const total = Math.max(40, Math.min(240, Number(state.perfCount)));
          const items = [];

          for (let index = 0; index < total; index += 1) {
            const cell = create('div');
            items.push({ element: cell, options: {} });
            grid.appendChild(cell);
          }

          playground.append(note, grid);
          registerTarget(grid);

          observeMany(items, (entries, count) => {
            report([
              toneResult('Callback count', String(count), 'good'),
              result('Observed elements', String(total)),
              result('Last batch size', String(entries.length)),
              result('Animating', grid.hasAttribute('data-animate') ? 'Yes' : 'No')
            ]);
          });
        }
      }
    ]
  }
];

const elements = {
  demoNav: document.querySelector('#demo-nav'),
  demoCategory: document.querySelector('#demo-category'),
  demoTitlePill: document.querySelector('#demo-title-pill'),
  demoTitle: document.querySelector('#demo-title'),
  demoSummary: document.querySelector('#demo-summary'),
  demoCode: document.querySelector('#demo-code'),
  controls: document.querySelector('#controls'),
  playgroundToolbar: document.querySelector('#playground-toolbar'),
  playground: document.querySelector('#playground'),
  results: document.querySelector('#results'),
  logList: document.querySelector('#log-list'),
  clearLog: document.querySelector('#clear-log'),
  packageLine: document.querySelector('#package-line'),
  docsPath: document.querySelector('#docs-path'),
  runtimeTarget: document.querySelector('#runtime-target')
};

const logEntries = [];
let activeObserver = null;
let activeTargets = [];
let callbackCount = 0;
let currentReporter = null;

elements.packageLine.textContent = meta.packageVersion;
elements.docsPath.textContent = `${meta.docsPath}/`;
elements.runtimeTarget.textContent = meta.runtimeTarget;

function flattenDemos() {
  return demoGroups.reduce((items, group) => items.concat(group.demos), []);
}

function getSelectedDemo() {
  return flattenDemos().find((demo) => demo.id === state.selectedDemoId) || flattenDemos()[0];
}

function renderNavigation() {
  elements.demoNav.innerHTML = demoGroups
    .map((group) => {
      const items = group.demos
        .map(
          (demo) =>
            `<button type="button" class="demo-link${demo.id === state.selectedDemoId ? ' active' : ''}" data-demo-id="${demo.id}">${escapeHtml(demo.title)}</button>`
        )
        .join('');

      return `<section class="demo-group"><h3>${escapeHtml(group.title)}</h3><div class="demo-list">${items}</div></section>`;
    })
    .join('');

  elements.demoNav.querySelectorAll('[data-demo-id]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedDemoId = button.getAttribute('data-demo-id');
      pushLog(`Opened demo: ${getSelectedDemo().category} / ${getSelectedDemo().title}.`);
      renderAll();
    });
  });
}

function renderControls() {
  const demo = getSelectedDemo();
  elements.controls.innerHTML = demo.controls
    .map((key) => {
      if (key === 'boxOption') {
        return `<div class="field"><label for="control-boxOption">Observed box</label><select id="control-boxOption" data-control="boxOption"><option value="content-box"${state.boxOption === 'content-box' ? ' selected' : ''}>content-box</option><option value="border-box"${state.boxOption === 'border-box' ? ' selected' : ''}>border-box</option><option value="device-pixel-content-box"${state.boxOption === 'device-pixel-content-box' ? ' selected' : ''}>device-pixel-content-box</option></select></div>`;
      }

      const labels = {
        width: 'Width',
        height: 'Height',
        padding: 'Padding',
        border: 'Border width',
        textScale: 'Text scale',
        perfCount: 'Observed elements'
      };
      const steps = {
        width: 10,
        height: 10,
        padding: 2,
        border: 1,
        textScale: 0.05,
        perfCount: 10
      };
      const mins = {
        width: 120,
        height: 100,
        padding: 0,
        border: 0,
        textScale: 0.75,
        perfCount: 40
      };
      const maxs = {
        width: 420,
        height: 260,
        padding: 48,
        border: 24,
        textScale: 2,
        perfCount: 240
      };

      return `<div class="field"><label for="control-${key}">${labels[key]}</label><input id="control-${key}" data-control="${key}" type="range" min="${mins[key]}" max="${maxs[key]}" step="${steps[key]}" value="${state[key]}"><span>${state[key]}</span></div>`;
    })
    .join('');

  elements.controls.querySelectorAll('[data-control]').forEach((input) => {
    input.addEventListener('input', (event) => {
      const key = event.target.getAttribute('data-control');
      const value = key === 'boxOption' ? event.target.value : Number(event.target.value);
      state[key] = value;
      pushLog(`${key} updated to ${String(value)}.`);
      renderStage();
    });
  });
}

function renderToolbar(demo, context) {
  const actions = demo.toolbar ? demo.toolbar(context) : [];
  elements.playgroundToolbar.innerHTML = '';
  actions.forEach((action) => elements.playgroundToolbar.appendChild(action));
}

function renderResults(items) {
  elements.results.innerHTML = items
    .map(
      (item) =>
        `<div class="result-card${item.tone ? ` ${item.tone}` : ''}"><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.value)}</span></div>`
    )
    .join('');
}

function destroyActiveObserver() {
  if (activeObserver) {
    activeObserver.disconnect();
  }
  activeObserver = null;
  activeTargets = [];
  callbackCount = 0;
  currentReporter = null;
}

function createObserver(report) {
  callbackCount = 0;
  currentReporter = report;
  return new ResizeObserver((entries) => {
    callbackCount += 1;
    entries.forEach((entry) => {
      updateDimensions(entry.target, entry);
    });
    report(entries, callbackCount);
    pushLog(`Resize callback: ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} in batch ${callbackCount}.`);
  });
}

function renderStage() {
  destroyActiveObserver();

  const demo = getSelectedDemo();
  elements.demoCategory.textContent = demo.category;
  elements.demoTitlePill.textContent = demo.title;
  elements.demoTitle.textContent = demo.title;
  elements.demoSummary.textContent = demo.summary;
  elements.demoCode.textContent = demo.code();
  elements.playground.innerHTML = '';
  elements.playgroundToolbar.innerHTML = '';
  renderControls();

  const lifecycleState = {
    status: 'idle',
    reporter: null,
    observer: null,
    target: null
  };

  const context = {
    playground: elements.playground,
    observe(target, options, entryReport) {
      const observer = createObserver((entries, count) => {
        const entry = entries[entries.length - 1];
        entryReport(entry, count);
      });
      activeObserver = observer;
      activeTargets = [target];
      observer.observe(target, options);
    },
    observeMany(targets, batchReport) {
      const observer = createObserver((entries, count) => {
        batchReport(entries, count);
      });
      activeObserver = observer;
      activeTargets = targets.map((item) => item.element);
      targets.forEach((item) => observer.observe(item.element, item.options));
    },
    report: renderResults,
    registerTarget(target) {
      target.dataset.dimensions = '';
      context.target = target;
    },
    lifecycle: {
      setReporter(report) {
        lifecycleState.reporter = report;
      },
      observeTarget(target) {
        if (!lifecycleState.observer) {
          lifecycleState.observer = new ResizeObserver((entries) => {
            callbackCount += 1;
            const entry = entries[entries.length - 1];
            updateDimensions(entry.target, entry);
            if (lifecycleState.reporter) {
              lifecycleState.reporter(entry, callbackCount, lifecycleState.status);
            }
            pushLog(`Lifecycle callback received (${callbackCount}).`);
          });
        }
        lifecycleState.status = 'observing';
        lifecycleState.target = target;
        activeObserver = lifecycleState.observer;
        activeTargets = [target];
        lifecycleState.observer.observe(target);
        if (lifecycleState.reporter) {
          lifecycleState.reporter(null, callbackCount, lifecycleState.status);
        }
      },
      unobserveTarget(target) {
        if (lifecycleState.observer) {
          lifecycleState.status = 'unobserved';
          lifecycleState.observer.unobserve(target);
          if (lifecycleState.reporter) {
            lifecycleState.reporter(null, callbackCount, lifecycleState.status);
          }
          pushLog('Lifecycle target unobserved.');
        }
      },
      disconnectObserver() {
        if (lifecycleState.observer) {
          lifecycleState.status = 'disconnected';
          lifecycleState.observer.disconnect();
          if (lifecycleState.reporter) {
            lifecycleState.reporter(null, callbackCount, lifecycleState.status);
          }
          pushLog('Lifecycle observer disconnected.');
        }
      }
    }
  };

  demo.mount(context);
  renderToolbar(demo, {
    target: context.target,
    helpers: context.lifecycle
  });
}

function renderLog() {
  elements.logList.innerHTML = logEntries
    .map((entry) => `<div class="log-entry">${escapeHtml(entry)}</div>`)
    .join('');
}

function pushLog(message) {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  logEntries.unshift(`${timestamp}  ${message}`);
  logEntries.splice(14);
  renderLog();
}

function renderAll() {
  renderNavigation();
  renderStage();
  renderLog();
}

function create(tag, props = {}) {
  const element = document.createElement(tag);
  Object.assign(element, props);
  return element;
}

function createObservedBox(text) {
  const box = create('div', { className: 'observer-target' });
  box.textContent = text;
  box.dataset.resizeTarget = 'true';
  return box;
}

function applySize(element) {
  element.style.width = `${state.width}px`;
  element.style.height = `${state.height}px`;
  element.style.padding = `${state.padding}px`;
  element.style.borderWidth = `${state.border}px`;
}

function updateDimensions(target, entry) {
  target.dataset.dimensions = rectValue(entry.contentRect);
}

function rectValue(rect) {
  return `${Math.round(rect.width)} x ${Math.round(rect.height)}`;
}

function boxSizeValue(size) {
  if (!size) {
    return 'Unavailable';
  }

  return `${Math.round(size.inlineSize)} x ${Math.round(size.blockSize)}`;
}

function result(label, value) {
  return { label, value };
}

function toneResult(label, value, tone) {
  return { label, value, tone };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function updateState(key, value) {
  state[key] = value;
  pushLog(`${key} updated to ${String(value)}.`);
  renderStage();
}

function resetSizing() {
  state.width = 240;
  state.height = 140;
  state.padding = 16;
  state.border = 8;
  pushLog('Sizing controls reset.');
  renderStage();
}

function actionButton(label, onClick) {
  const button = create('button', { type: 'button', textContent: label });
  button.addEventListener('click', onClick);
  return button;
}

elements.clearLog.addEventListener('click', () => {
  logEntries.splice(0, logEntries.length);
  renderLog();
});

renderAll();
pushLog(`Loaded docs line ${meta.packageVersion}.`);
