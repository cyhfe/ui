# Kanban

## React DnD

<code src="./demo.tsx"></code>

解决嵌套的 target 覆盖问题
card 有两种模式:

- 一种是拖拽目标到另一 Card 上,交换位置.
- 一种是拖拽到 Column 的空白部分,push 到 Column 末尾

https://react-dnd.github.io/react-dnd/examples/nesting/drop-targets

```ts
// 嵌套数据,经常修改.使用use-immer简化操作.
// use-immer使用代理实现,后续去看看
export interface Item {
  id: number;
  content: string;
}
export interface List {
  id: number;
  title: string;
  items: Item[];
}
```
