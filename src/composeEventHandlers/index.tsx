interface Handler<T extends any[]> {
  (...args: T): void;
}

function composeEventHandlers<T extends any[]>(...handlers: Handler<T>[]) {
  return function composedHandler(...args: T) {
    for (const handler of handlers) {
      handler(...args);
    }
  };
}

export { composeEventHandlers };
