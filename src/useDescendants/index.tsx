import React, { useCallback, useLayoutEffect } from 'react';

type SomeElement<T> = T extends Element ? T : HTMLElement;

interface Descendant<ElementType = HTMLElement> {
  element: SomeElement<ElementType> | null;
  index: number;
}

function useForceUpdate() {
  const [, setState] = React.useState(Object.create(null));
  return useCallback(() => {
    setState(Object.create(null));
  }, []);
}

interface DescendantContextValue<DescendantType extends Descendant> {
  descendants: DescendantType[];
  registerDescendant: (descendant: DescendantType) => void;
}

function insertAt<T extends any[]>(
  array: T,
  item: T[number],
  index?: number,
): T {
  if (index === undefined || !(index in array)) {
    return [...array, item] as T;
  }
  return [...array.slice(0, index), item, ...array.slice(index)] as T;
}

function createDescendantContext<DescendantType extends Descendant>(
  name: string,
  initialValue = {},
) {
  const descendants: DescendantType[] = [];

  type T = DescendantContextValue<DescendantType>;

  const Ctx = React.createContext<T>({
    descendants,
    registerDescendant: () => {},
    ...initialValue,
  });

  Ctx.displayName = name;
  return Ctx;
}

function useDescendants<DescendantType extends Descendant>(
  Ctx: React.Context<DescendantContextValue<DescendantType>>,
) {
  return React.useContext(Ctx).descendants;
}

function DescendantProvider<DescendantType extends Descendant>({
  Ctx,
  children,
  items,
  set,
}: {
  Ctx: React.Context<DescendantContextValue<DescendantType>>;
  children: React.ReactNode;
  items: DescendantType[];
  set: React.Dispatch<React.SetStateAction<DescendantType[]>>;
}) {
  const registerDescendant = React.useCallback(
    ({
      element,
      index: explicitIndex,
      ...rest
    }: Omit<DescendantType, 'index'> & { index?: number | undefined }) => {
      if (!element) return;
      set((items) => {
        if (explicitIndex !== undefined && explicitIndex !== -1) {
          return insertAt(
            items,
            { element, index: explicitIndex, ...rest } as DescendantType,
            explicitIndex,
          );
        }

        if (items.length === 0) {
          return [{ ...rest, element, index: 0 } as DescendantType];
        }

        let index = items.findIndex((item) => {
          if (!item.element) return false;
          // element是否在item.element之前
          return Boolean(
            item.element.compareDocumentPosition(element) &
              Node.DOCUMENT_POSITION_PRECEDING,
          );
        });

        let newItems: DescendantType[];

        if (index === -1) {
          newItems = [
            ...items,
            { ...rest, element, index: items.length } as DescendantType,
          ];
        } else {
          newItems = insertAt(
            items,
            { ...rest, element, index } as DescendantType,
            index,
          );
        }

        return newItems;
      });

      return function unRegisterDescendant() {
        if (!element) return;
        set((items) => items.filter((item) => item.element !== element));
      };
    },
    [],
  );

  const value = React.useMemo(() => {
    return {
      descendants: items,
      registerDescendant,
    };
  }, [items, registerDescendant]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useDescendant<DescendantType extends Descendant>(
  descendant: Omit<DescendantType, 'index'>,
  Ctx: React.Context<DescendantContextValue<DescendantType>>,
  indexProp?: number,
) {
  let { registerDescendant, descendants } = React.useContext(Ctx);
  const forceUpdate = useForceUpdate();

  const index =
    indexProp ??
    descendants.findIndex((item) => item.element === descendant.element);

  useLayoutEffect(() => {
    if (!descendant.element) forceUpdate();

    return registerDescendant({
      ...descendant,
      index,
    } as DescendantType);
  }, [
    descendant,
    forceUpdate,
    index,
    registerDescendant,
    ...Object.values(descendant),
  ]);

  return index;
}

function useDescendantsInit<DescendantType extends Descendant>() {
  return React.useState<DescendantType[]>([]);
}

export {
  createDescendantContext,
  useDescendants,
  DescendantProvider,
  useDescendant,
  useDescendantsInit,
};
