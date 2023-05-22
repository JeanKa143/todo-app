import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.css']
})
export class TaskListPage implements OnInit {
  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getTaskGroupDetailedList().subscribe({
      next: taskGroups => {
        const defaultTaskGroup = taskGroups.find(taskGroup => taskGroup.isDefault)!;
        this.taskService.selectedTaskGroup = defaultTaskGroup;
        this.getTaskList();
      }
    });
  }

  getTaskList() {
    const defaultTaskList = this.taskService.selectedTaskGroup?.taskLists.find(taskList => taskList.isDefault)!;
    this.taskService.getTaskListsDetailed(defaultTaskList.id);
  }
}
