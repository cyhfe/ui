import { css } from '@emotion/react';
import type { Identifier } from 'dnd-core';
import { Fragment, useRef, useState } from 'react';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useImmer } from 'use-immer';
import { Col, Grid, Row } from '../Grid';
import { ItemTypes } from './ItemTypes';
import { AddItemProps, CardProps, ColumnProps, DragItem, List } from './types';

let LIST_ID = 4;
let ITEM_ID = 6;

const mockData: List[] = [
  {
    id: 1,
    title: 'todo',
    items: [
      { id: 1, content: '1-2aaa' },
      { id: 2, content: '1-2bbb' },
      { id: 3, content: '1-3ccc' },
    ],
  },
  {
    id: 2,
    title: 'in progress',
    items: [{ id: 4, content: '2-4' }],
  },
  {
    id: 3,
    title: 'done',
    items: [{ id: 5, content: '3-5' }],
  },
];

const cardBase = css`
  padding: 0.5rem;
  background: #fff;
  border-radius: 2px;
  display: flex;
  margin-bottom: auto;
`;

const cardShadow = css`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14);
  transition: box-shadow 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

function AddItem({ setData, listId }: AddItemProps) {
  const [item, setItem] = useState('');
  return (
    <div>
      <input
        type="text"
        css={css`
          width: 100%;
        `}
        onChange={(e) => {
          setItem(e.target.value);
        }}
        value={item}
      />
      <button
        type="button"
        onClick={() => {
          if (!item) return;
          setData((draft) => {
            draft.forEach((list) => {
              if (list.id === listId) {
                list.items.push({
                  id: ITEM_ID++,
                  content: item,
                });
              }
            });
          });
          setItem('');
        }}
      >
        new Item
      </button>
    </div>
  );
}

function Card({ children, itemId, listId, moveCard, ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item: DragItem) {
      if (!ref.current) return;
      if (item.itemId === itemId) return;
      moveCard(item, {
        itemId,
        listId,
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return {
        itemId,
        listId,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      css={[cardBase, cardShadow, { opacity: isDragging ? 0 : 1 }]}
      ref={ref}
      {...props}
      data-id={handlerId}
    >
      {children}
    </div>
  );
}

function Column({ lists, moveCard, setData }: ColumnProps) {
  // const [collectedProps, drop] = useDrop(() => ({
  //   accept: ItemTypes.CARD,
  // }));

  return (
    <Fragment>
      {lists.map((list) => {
        return (
          <Col
            key={list.id}
            span={4}
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <div
              css={css`
                background-color: #eceff1;
                padding: 1rem;
              `}
            >
              <h4
                css={css`
                  margin: 0;
                  margin-bottom: 0.5rem;
                `}
              >
                {list.title}
              </h4>
              <div>
                {list.items.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      itemId={item.id}
                      listId={list.id}
                      moveCard={moveCard}
                      css={css`
                        margin-bottom: 12px;
                      `}
                    >
                      {item.content}
                    </Card>
                  );
                })}
              </div>
              <AddItem setData={setData} listId={list.id}></AddItem>
            </div>
          </Col>
        );
      })}
    </Fragment>
  );
}

function swap(lists: List[], drag: DragItem, drop: DragItem) {
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

function Kanban() {
  const [data, setData] = useImmer(mockData);
  const [title, setTitle] = useState('');

  function handleNewList() {
    if (!title) return;
    setData((draft) => {
      draft.push({
        id: LIST_ID++,
        title,
        items: [],
      });
    });
    setTitle('');
  }

  function moveCard(drag: DragItem, drop: DragItem) {
    setData((draft) => {
      swap(draft, drag, drop);
    });
  }

  return (
    <div className="kanban">
      <DndProvider backend={HTML5Backend}>
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="button" onClick={handleNewList}>
            new list
          </button>
        </div>
        <Grid>
          <Row
            css={css`
              gap: 1rem 0;
            `}
          >
            <Column setData={setData} moveCard={moveCard} lists={data} />
          </Row>
        </Grid>
      </DndProvider>
    </div>
  );
}

export default Kanban;
