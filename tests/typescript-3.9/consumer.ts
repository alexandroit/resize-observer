import {
  ResizeObserver as StacklineResizeObserver,
  ResizeObserverEntry,
  ResizeObserverSize,
} from '../..';

const callback = (
  entries: ResizeObserverEntry[],
  observer: StacklineResizeObserver,
): void => {
  const size: ResizeObserverSize | undefined = entries[0]?.contentBoxSize[0];
  void size;
  observer.disconnect();
};

const observer = new StacklineResizeObserver(callback);
declare const target: Element;

observer.observe(target, { box: 'border-box' });
observer.unobserve(target);
observer.disconnect();
