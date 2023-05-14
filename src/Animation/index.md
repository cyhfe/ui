<!-- # Animation

## useSpring

state 状态对应不同的 css 属性值
通过 state 的变化实现两个 css 值之间的过渡

`click | autoplay`

<code src="./springValue.tsx"></code>

## useTransition

可以用来实现`enter` ,`leave`的状态过渡.
这是不用框架手写过渡很难解决的一个问题.因为我们通过 setState 卸载组件之后就不存在 DOM 去执行退出过渡了.

`click | autoplay`

<code src="./transition.tsx"></code> -->

## useTail

编排一系列动画,在前一个即将结束时下一个动画开始.
把 duration 调慢点看的更清楚

<code src="./trail.tsx"></code>
