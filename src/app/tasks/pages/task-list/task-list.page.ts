import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskGroup, TaskList } from '../../interfaces/task';

@Component({
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.css']
})
export class TaskListPage implements OnInit {
  taskList?: TaskList;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getTaskGroupDetailedList().subscribe({
      next: taskGroups => {
        const defaultTaskGroup = taskGroups.find(taskGroup => taskGroup.isDefault)!;
        this.selectedTaskGroup = defaultTaskGroup;
        this.getTaskList();
      }
    });
  }

  getTaskList() {
    const defaultTaskList = this.selectedTaskGroup?.taskLists.find(taskList => taskList.isDefault)!;

    this.taskService.getTaskListsDetailed(this.selectedTaskGroup!.id, defaultTaskList.id).subscribe({
      next: taskList => {
        this.taskList = taskList;
      }
    });
  }

  set selectedTaskGroup(value: TaskGroup | undefined) {
    this.taskService.selectedTaskGroup = value;
  }

  get selectedTaskGroup(): TaskGroup | undefined {
    return this.taskService.selectedTaskGroup;
  }
}
