declare function useDebounce<T extends (...args: any[]) => any>(cb: T, delay: number): T;
export { useDebounce };
