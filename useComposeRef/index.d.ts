/// <reference types="react" />
declare function useComposeRef(...refs: React.MutableRefObject<any>[]): (node: HTMLElement) => void;
export { useComposeRef };
