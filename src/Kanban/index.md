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

```ts
// 交换位置
function swap(lists: List[], drag: CardDragItem, drop: CardDragItem) {
  const isSameList = drag.listId === drop.listId;

  if (isSameList) {
    const list = lists.find((d) => d.id === drag.listId);
    if (list) {
      const i1 = list.items.findIndex((i) => i.id === drag.itemId);
      const i2 = list.items.findIndex((i) => i.id === drop.itemId);
      const temp = list.items[i1];
      list.items[i1] = list.items[i2];
      list.items[i2] = temp;
    }
  } else {
    const list1 = lists.find((d) => d.id === drag.listId);
    const list2 = lists.find((d) => d.id === drop.listId);
    if (list1 && list2) {
      const i1 = list1.items.findIndex((i) => i.id === drag.itemId);
      const i2 = list2.items.findIndex((i) => i.id === drop.itemId);
      const [item1] = list1.items.splice(i1, 1);
      const [item2] = list2.items.splice(i2, 1);
      list2.items.splice(i2, 0, item1);
      list1.items.splice(i1, 0, item2);
    }
  }
}
```
