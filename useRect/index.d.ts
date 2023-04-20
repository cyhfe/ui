import React from 'react';
export declare type RectProps = {
    rect: DOMRect | undefined;
    hasRectChanged: boolean;
    callbacks: ((...args: any[]) => void)[];
};
export declare function observeRect(node: Element, cb: (rect: DOMRect) => void): {
    observe(): void;
    unobserve(): void;
};
interface Options {
    onChange?: (rect: DOMRect) => void;
    observe?: boolean;
}
declare const useRect: (nodeRef: React.RefObject<Element | undefined | null>, options?: Options) => DOMRect | null;
export { useRect };
