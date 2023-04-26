// DOMRect属性不可枚举，Object.keys拿不到
const rectKeys: (keyof DOMRect)[] = [
  'bottom',
  'height',
  'left',
  'right',
  'top',
  'width',
  'x',
  'y',
];

let rid: number | null = null;

interface RectProps {
  rect: DOMRect;
  callbacks: ((rect: DOMRect) => void)[];
}

function hasChanged(prev: DOMRect, curr: DOMRect) {
  return rectKeys.some((key) => prev[key] !== curr[key]);
}

function run(observable: Map<HTMLElement, RectProps>) {
  observable.forEach((prevRectProps, element) => {
    const currRect = element.getBoundingClientRect();
    const changed = hasChanged(prevRectProps.rect, currRect);
    if (changed) {
      const nextRectProps = {
        ...prevRectProps,
        rect: currRect,
      };
      observable.set(element, nextRectProps);
      nextRectProps.callbacks.forEach((cb) => cb(currRect));
    }
  });
  rid = requestAnimationFrame(() => {
    run(observable);
  });
}

function observeRect(dom: HTMLElement, onChange: (rect: DOMRect) => void) {
  const observable = new Map<HTMLElement, RectProps>();
  function observe() {
    if (!observable.has(dom)) {
      const rect = dom.getBoundingClientRect();
      observable.set(dom, {
        callbacks: [onChange],
        rect,
      });
    } else {
      const currentrectProps = observable.get(dom)!;
      currentrectProps.callbacks.push(onChange);
    }

    if (observable.size === 0) {
      run(observable);
    }

    return function unobserve() {
      observable.delete(dom);
      if (observable.size === 0 && rid) {
        cancelAnimationFrame(rid);
      }
    };
  }
  return {
    observable,
    observe,
  };
}

export default observeRect;
