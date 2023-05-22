import { Component, ElementRef } from '@angular/core';
import { TaskItem, TaskList } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  constructor(private readonly taskService: TaskService, private readonly compElementRef: ElementRef) {}

  get tasks(): TaskItem[] | undefined {
    return this.taskService.selectedTaskList?.taskItems;
  }

  get selectedTaskList(): TaskList | undefined {
    return this.taskService.selectedTaskList;
  }

  toggleMarkAsDone(task: TaskItem) {
    this.taskService.toggleMarkTaskAsDone(task);
  }

  toggleMarkAsImportant(task: TaskItem) {
    this.taskService.toggleMarkTaskAsImportant(task);
  }

  addNewTask(newTaskName: string) {
    const newTask = {
      taskListId: this.selectedTaskList!.id,
      description: newTaskName,
      note: null,
      dueDate: null,
      isImportant: false,
      isInMyDay: false
    };

    this.taskService.addNewTask(newTask).subscribe(task => {
      this.tasks?.push(task);
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    this.compElementRef.nativeElement.scroll({
      top: this.compElementRef.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
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

  handleTaskClick(event: EventTarget | null, task: TaskItem) {
    if (event === null) return;
    const element = event as HTMLElement;
    const elementTagName = element.tagName.toLowerCase();

    if (elementTagName === 'i' || elementTagName === 'button') return;
    this.taskService.selectedTask = task;
  }
}
