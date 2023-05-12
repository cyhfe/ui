import { Updater } from 'use-immer';

export const enum ItemTypes {
  CARD = 'card',
  COLUMN = 'column',
}
export interface ColumnDragItem {
  listId: number;
  type: ItemTypes.COLUMN;
}

export interface CardDragItem {
  itemId: number;
  listId: number;
  type: ItemTypes.CARD;
}

export interface Item {
  id: number;
  content: string;
}
export interface List {
  id: number;
  title: string;
  items: Item[];
}

export interface AddItemProps {
  setData: Updater<List[]>;
  listId: number;
}

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  itemId: number;
  listId: number;
  moveCard: (drag: CardDragItem, drop: CardDragItem) => void;
}

export interface ColumnProps {
  list: List;
  moveCard: (drag: CardDragItem, drop: CardDragItem) => void;
  setData: Updater<List[]>;
}
