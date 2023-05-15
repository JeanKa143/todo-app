export interface TaskGroup {
  id: number;
  name: string;
  isDefault: boolean;
  taskLists: TaskListBase[];
}

export interface TaskList extends TaskListBase {
  taskItems: TaskItem[];
}

export interface TaskItem {
  id: number;
  taskListId: number;
  description: string;
  note: string | null;
  dueDate: Date | null;
  isImportant: boolean;
  isInMyDay: boolean;
  isDone: boolean;
}

export interface UpdateTaskRequest {
  id: number;
  taskListId: number;
  description: string;
  note: string | null;
  dueDate: Date | null;
  isImportant: boolean;
  isInMyDay: boolean;
}

export interface NewTaskRequest {
  taskListId: number;
  description: string;
  note: string | null;
  dueDate: Date | null;
  isImportant: boolean;
  isInMyDay: boolean;
}

interface TaskListBase {
  id: number;
  name: string;
  isDefault: boolean;
}
