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

interface TaskListBase {
  id: number;
  name: string;
  isDefault: boolean;
}
