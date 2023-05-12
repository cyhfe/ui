# Kanban

## features

1. card => card 位置互换
2. card => column 放到末尾
3. column => column 列互换

<code src="./demo.tsx"></code>

## 问题

解决嵌套的 target 覆盖问题(greedy)
https://react-dnd.github.io/react-dnd/examples/nesting/drop-targets

## 实现

drag => drop 的过程可以传递数据
这里有 2 种 drag 类型: `CARD | COLUMN`
根据不同类型处理状态更新页面

### card

```ts
const [{ handlerId }, drop] = useDrop<
  CardDragItem,
  void,
  { handlerId: Identifier | null }
>({
  accept: ItemTypes.CARD,
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    };
  },
  drop(item: CardDragItem) {
    if (!ref.current) return;
    if (item.itemId === itemId) return;
    moveCard(item, {
      itemId,
      listId,
      type: ItemTypes.CARD,
    });
  },
});

const [{ isDragging }, drag] = useDrag({
  type: ItemTypes.CARD,
  item: () => {
    return {
      itemId,
      listId,
      type: ItemTypes.CARD,
    };
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
});

drag(drop(ref));
```

### column

```ts
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COLUMN,
    item: () => {
      return {
        listId: list.id,
        type: ItemTypes.COLUMN,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.CARD, ItemTypes.COLUMN],
    drop(item: CardDragItem | ColumnDragItem, monitor) {
      if (item.type === ItemTypes.CARD) {
        const didDrop = monitor.didDrop();
        if (didDrop) return;
        setData((draft) => {
          const dragList = draft.find((l) => l.id === item.listId)?.items;
          const dragIndex = dragList?.findIndex((i) => i.id === item.itemId);
          //@ts-ignore
          const [dragItem] = dragList?.splice(dragIndex, 1);
          const dropList = draft.find((l) => l.id === list.id)?.items;
          dragItem && dropList?.push(dragItem);
        });
      }
      if (item.type === ItemTypes.COLUMN) {
        setData((draft) => {
          const dragListIndex = draft.findIndex((l) => l.id === item.listId);
          const dropListIndex = draft.findIndex((l) => l.id === list.id);
          const temp = draft[dragListIndex];
          draft[dragListIndex] = draft[dropListIndex];
          draft[dropListIndex] = temp;
        });
      }
    },
```

### immer

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

### 数据处理

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
