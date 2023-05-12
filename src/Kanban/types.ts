import { Updater } from 'use-immer';

export interface DragItem {
  itemId: number;
  listId: number;
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
  moveCard: (drag: DragItem, drop: DragItem) => void;
}

export interface ColumnProps {
  lists: List[];
  moveCard: (drag: DragItem, drop: DragItem) => void;
  setData: Updater<List[]>;
}
