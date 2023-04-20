/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when
 * passed as a dependency.
 */
declare function useStableCallback<T extends (...args: any[]) => any>(callback: T | null | undefined): T;
export { useStableCallback };
