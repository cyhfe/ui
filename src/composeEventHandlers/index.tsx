function callAll(...fns: ((args: any) => void)[]) {
  return function (...args: any) {
    const _args = [...args];
    fns.forEach((fn) => fn(_args));
  };
}

export { callAll };
