/// <reference types="react" />
declare type PossibleEvent = MouseEvent | TouchEvent;
declare type Handler = (event: PossibleEvent) => void;
export declare function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: Handler | null, options?: AddEventListenerOptions): void;
export {};
//# sourceMappingURL=index.d.ts.map