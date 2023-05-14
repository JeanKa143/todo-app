import { Component, Input } from '@angular/core';
import { TaskItem, TaskList } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() taskList: TaskList | undefined;

  constructor(private readonly taskService: TaskService) {}

  get tasks(): TaskItem[] | undefined {
    return this.taskList?.taskItems;
  }

  get selectedTaskGroupId(): number {
    return this.taskService.selectedTaskGroup!.id;
  }

  toggleMarkAsDone(task: TaskItem) {
    task.isDone ? this.markTaskAsUndone(task) : this.markTaskAsDone(task);
  }

  toggleMarkAsImportant(task: TaskItem) {
    task.isImportant = !task.isImportant;
  }

  addNewTask(newTaskName: string) {
    const newTask = {
      taskListId: this.taskList!.id,
      description: newTaskName,
      note: null,
      dueDate: null,
      isImportant: false,
      isInMyDay: false
    };

    this.taskService.addNewTask(this.selectedTaskGroupId, this.taskList!.id, newTask).subscribe(task => {
      this.tasks?.push(task);
    });
  }

  markTaskAsDone(task: TaskItem) {
    this.taskService.markTaskAsDone(this.selectedTaskGroupId, this.taskList!.id, task.id).subscribe(() => {
      task.isDone = true;
    });
  }

  markTaskAsUndone(task: TaskItem) {
    this.taskService.markTaskAsUndone(this.selectedTaskGroupId, this.taskList!.id, task.id).subscribe(() => {
      task.isDone = false;
    });
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
