import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItem } from '../../interfaces/task';

@Component({
  selector: 'app-task-info-menu',
  templateUrl: './task-info-menu.component.html',
  styleUrls: ['./task-info-menu.component.css']
})
export class TaskInfoMenuComponent {
  constructor(private readonly taskService: TaskService) {}

  get selectedTask(): TaskItem | undefined {
    return this.taskService.selectedTask;
  }

  handleHideTaskInfoMenu() {
    this.taskService.selectedTask = undefined;
  }
}
