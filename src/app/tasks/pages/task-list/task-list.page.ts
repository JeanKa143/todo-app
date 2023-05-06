import { Component } from '@angular/core';
import { TaskItem } from '../../interfaces/task';

@Component({
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.css']
})
export class TaskListPage {
  // TODO: Remove this tempArray (test data)
  tempArray: TaskItem[] = [
    {
      isDone: true,
      isImportant: true,
      note: 'This is a note',
      dueDate: new Date(),
      isInMyDay: true
    },
    {
      isDone: false,
      isImportant: false,
      note: null,
      dueDate: new Date(),
      isInMyDay: false
    },
    {
      isDone: true,
      isImportant: true,
      note: 'This is a note',
      dueDate: null,
      isInMyDay: true
    },
    {
      isDone: false,
      isImportant: false,
      note: null,
      dueDate: null,
      isInMyDay: false
    },
    {
      isDone: true,
      isImportant: true,
      note: 'This is a note',
      dueDate: new Date(),
      isInMyDay: true
    }
  ];

  fetchingTasks = true;

  toggleMarkAsDone(task: TaskItem) {
    task.isDone = !task.isDone;
  }

  toggleMarkAsImportant(task: TaskItem) {
    task.isImportant = !task.isImportant;
  }

  checkMouseHover(event: EventTarget | null) {
    if (event === null) return;
    const element = event as HTMLElement;

    if (element.classList.contains('bi-circle')) {
      element.classList.remove('bi-circle');
      element.classList.add('bi-check-circle');
    }
  }

  checkMouseLeave(event: EventTarget | null) {
    if (event === null) return;
    const element = event as HTMLElement;

    if (element.classList.contains('bi-check-circle')) {
      element.classList.remove('bi-check-circle');
      element.classList.add('bi-circle');
    }
  }
}
