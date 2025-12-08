import { Column } from './column';
import { User } from './user';

export interface Card {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  column: Column;
  user?: User; // если тебе нужно получать данные о пользователе
  position: number;
  priority: number;
  tags: string[];
  deadline?: Date;
  isCompleted: boolean; // ✅ добавляем
}
