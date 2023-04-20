import React from 'react';
declare type SomeElement<T> = T extends Element ? T : HTMLElement;
export interface Descendant<ElementType = HTMLElement> {
    element: SomeElement<ElementType> | null;
    index: number;
}
interface DescendantContextValue<DescendantType extends Descendant> {
    descendants: DescendantType[];
    registerDescendant: (descendant: DescendantType) => void;
}
declare function createDescendantContext<DescendantType extends Descendant>(name: string, initialValue?: {}): React.Context<DescendantContextValue<DescendantType>>;
declare function useDescendants<DescendantType extends Descendant>(Ctx: React.Context<DescendantContextValue<DescendantType>>): DescendantType[];
declare function DescendantProvider<DescendantType extends Descendant>({ Ctx, children, items, set, }: {
    Ctx: React.Context<DescendantContextValue<DescendantType>>;
    children: React.ReactNode;
    items: DescendantType[];
    set: React.Dispatch<React.SetStateAction<DescendantType[]>>;
}): import("@emotion/react/jsx-runtime").JSX.Element;
declare function useDescendant<DescendantType extends Descendant>(descendant: Omit<DescendantType, 'index'>, Ctx: React.Context<DescendantContextValue<DescendantType>>, indexProp?: number): number;
declare function useDescendantsInit<DescendantType extends Descendant>(): [DescendantType[], React.Dispatch<React.SetStateAction<DescendantType[]>>];
export { createDescendantContext, useDescendants, DescendantProvider, useDescendant, useDescendantsInit, };
//# sourceMappingURL=index.d.ts.map