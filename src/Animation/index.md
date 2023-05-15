# Animation

目前组件大多只实现了逻辑部分.
还需要完善样式和动画.
动画选择了 React Spring 来实现.

## 已完成的动画

- [x] [toast](toast)

## useSpring

state 状态对应不同的 css 属性值
通过 state 的变化实现两个 css 值之间的过渡

`click | autoplay`

<code src="./springValue.tsx"></code>

## useTransition

可以用来实现`enter` ,`leave`的状态过渡.
这是不用框架手写过渡很难解决的一个问题.因为我们通过 setState 卸载组件之后就不存在 DOM 去执行退出过渡了.

`click | autoplay`

<code src="./transition.tsx"></code>

## useTrail

编排一系列动画,在前一个即将结束时下一个动画开始.
把 duration 调慢点看的更清楚

<code src="./trail.tsx"></code>

## useChain + useTrail

[https://github.com/pmndrs/react-spring/blob/main/packages/core/src/hooks/useChain.ts#LL39C42-L39C42](https://github.com/pmndrs/react-spring/blob/main/packages/core/src/hooks/useChain.ts#LL39C42-L39C42)

useChain 做的是设置延迟

```ts
// 使用
useChain([xApi, yApi, boxApi], [0, 1, 2], 1500);

// 源码
let delay = timeFrame * timeSteps[i];
```

svg 的 scale ,只能在 style 里设置.

```ts
animated.rect
key={i}
style={{
  transformOrigin: `${5 + block[i][0]}px ${
    5 + block[i][1]
  }px`,
  scale,
}}
x={block[i][0]}
y={block[i][1]}
width={10}
height={10}
fill="white"
```

<code src="./springs.tsx"></code>
