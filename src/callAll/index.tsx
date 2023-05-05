function callAll(...fns: (((args: any) => void) | undefined)[]) {
  return function (...args: any) {
    const _args = [...args];
    fns.forEach((fn) => fn?.(_args));
  };
}

export { callAll };
