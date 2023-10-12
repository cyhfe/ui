# \_Slot

<code src="./demo.tsx">demo</code>

在构建 Web 组件库时，让用户能够自定义要使用的底层元素或组件通常很有用。

比如我们有个`Button`组件.`React Router`有个`Link`组件.
如何组合这两个组件呢?

Slot 作用就是合并 props，props 和事件处理程序可以在两个位置定义 — 在父组件和子组件上。

因此，我们必须定义规则，使合并父 props 和子 props 的过程可预测且直观。

1. if a prop exists on both, the child prop overrides the parent prop
2. if an event handler exists on both, both handlers are called with the child handler being called before the parent handler.
3. if a class or className prop exists on both, both class lists are joined.
4. if a style prop exists on both, they are merged with the child styles overriding the parent styles.
5. DOM node references are provided to both the user and the parent component’s internal handlers, either in the form of React’s callback refs or Svelte’s bind:this.

```ts | pure
import { ComponentPropsWithoutRef } from 'react';
import { Slot } from './index';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

function Button({ asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
}

function Demo() {
  return (
    <div>
      <Button>without asChild</Button>
      <Button asChild>
        <a href="#">
          with asChild
          <span>111</span>
        </a>
      </Button>
    </div>
  );
}

export default Demo;
```

```ts | pure
import {
  HTMLAttributes,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Slot = forwardRef<HTMLElement, SlotProps>((props, ref) => {
  const { children, ...slotProps } = props;
  if (!isValidElement(children)) {
    return null;
  }
  return cloneElement(children, {
    ...mergeProps(slotProps, children.props),
    //@ts-ignore
    ref: ref ? composeRefs(ref, (children as any).ref) : (children as any).ref,
  });
});

export { Slot };
```

## 参考资源

[asChild in React, Svelte, Vue, and Solid for render delegation](https://medium.com/@bryanmylee/aschild-in-react-svelte-vue-and-solid-for-render-delegation-645c73650ced)

[radix-Slot](https://www.radix-ui.com/primitives/docs/utilities/slot#installation)
