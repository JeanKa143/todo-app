import { Component, OnInit } from '@angular/core';
import { TaskItem, TaskList } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.css']
})
export class TaskListPage implements OnInit {
  fetchingTasks = true;
  taskList: TaskList | undefined;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getTaskGroupDetailedList().subscribe({
      next: taskGroups => {
        let defaultTaskGroup = taskGroups.find(taksGroup => taksGroup.isDefault)!;
        let defaultTaskList = defaultTaskGroup.taskLists.find(taskList => taskList.isDefault)!;
        this.getTaskListsDetailed(defaultTaskGroup.id, defaultTaskList.id);
      }
    });
  }

  getTaskListsDetailed(groupId: number, taskListId: number) {
    this.taskService.getTaskListsDetailed(groupId, taskListId).subscribe({
      next: taskList => {
        this.taskList = taskList;
        this.fetchingTasks = false;
      }
    });
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
