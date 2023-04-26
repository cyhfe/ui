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

interface RectProps {
  rect: DOMRect;
  callbacks: ((rect: DOMRect) => void)[];
}

let rid: number | null = null;
const observable = new Map<HTMLElement, RectProps>();

function hasChanged(prev: DOMRect, curr: DOMRect) {
  let changed = false;
  rectKeys.forEach((key) => {
    if (prev[key] !== curr[key]) {
      changed = true;
      return;
    }
  });
  return changed;
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
  function observe() {
    if (!observable.has(dom)) {
      const rect = dom.getBoundingClientRect();
      observable.set(dom, {
        callbacks: [onChange],
        rect,
      });
      onChange(rect);
    } else {
      const currentrectProps = observable.get(dom)!;
      currentrectProps.callbacks.push(onChange);
    }

    if (observable.size > 0 && rid === null) {
      rid = requestAnimationFrame(() => {
        run(observable);
      });
    }
  }
  function unobserve() {
    observable.delete(dom);
    if (observable.size === 0 && rid !== null) {
      cancelAnimationFrame(rid);
      rid = null;
    }
  }
  return {
    observable,
    observe,
    unobserve,
  };
}

export default observeRect;
