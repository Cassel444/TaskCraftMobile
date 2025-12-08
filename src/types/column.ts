import { Board } from './board';
import { Card } from './card';

export interface Column {
  id: string;
  title: string;

  boardId: string;
  createdAt: Date; // <- изменяем на Date
  updatedAt: Date; // <- изменяем на Date
  position: number;
  board: Board;
  tasks: Card[];
}
