import { css } from '@emotion/react';
import { useState } from 'react';
import { Col, Grid, Row } from '../Grid';

import { Updater, useImmer } from 'use-immer';

interface Item {
  id: number;
  content: string;
}

interface List {
  id: number;
  title: string;
  items: Item[];
}

let listId = 4;
let itemId = 6;

const mockData: List[] = [
  {
    id: 1,
    title: 'todo',
    items: [
      { id: 1, content: 'tsetsa' },
      { id: 2, content: 'tse123dstsa' },
      { id: 3, content: 'fda' },
    ],
  },
  {
    id: 2,
    title: 'in progress',
    items: [{ id: 4, content: 'tsetsa' }],
  },
  {
    id: 3,
    title: 'done',
    items: [{ id: 5, content: 'tsetsa' }],
  },
];

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
}

const cardBase = css`
  padding: 0.5rem;
  background: #fff;
  border-radius: 2px;
  display: flex;
  margin-bottom: auto;
`;

const cardShadow = css`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

function Card({ children, ...props }: CardProps) {
  return (
    <div css={[cardBase, cardShadow]} {...props}>
      {children}
    </div>
  );
}

interface AddItemProps {
  setData: Updater<List[]>;
  listId: number;
}

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
                  id: itemId++,
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

function Kanban() {
  const [data, setData] = useImmer(mockData);
  const [title, setTitle] = useState('');

  function handleNewList() {
    if (!title) return;
    setData((draft) => {
      draft.push({
        id: listId++,
        title,
        items: [],
      });
    });
    setTitle('');
  }
  return (
    <div className="kanban">
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
          {data.map((list) => {
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
                        <div key={item.id}>
                          <Card
                            css={css`
                              margin-bottom: 12px;
                            `}
                          >
                            {item.content}
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                  <AddItem setData={setData} listId={list.id}></AddItem>
                </div>
              </Col>
            );
          })}
        </Row>
      </Grid>
    </div>
  );
}

export default Kanban;
