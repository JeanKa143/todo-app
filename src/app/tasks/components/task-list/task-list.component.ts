import { Component, Input } from '@angular/core';
import { TaskItem, TaskList } from '../../interfaces/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() taskList: TaskList | undefined;

  get tasks(): TaskItem[] | undefined {
    return this.taskList?.taskItems;
  }

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
