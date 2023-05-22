import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { TaskList, TaskGroup, TaskItem, NewTaskRequest, UpdateTaskRequest } from '../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl: string;

  selectedTaskGroup?: TaskGroup;
  selectedTaskList?: TaskList;

  constructor(private readonly http: HttpClient, private readonly tokenStorageService: TokenStorageService) {
    const userId = this.tokenStorageService.getTokenData()?.userId;
    this.apiUrl = `${environment.apiUrl}users/${userId}/task-list-groups`;
  }

  getTaskGroupDetailedList(): Observable<TaskGroup[]> {
    return this.http.get<TaskGroup[]>(`${this.apiUrl}/detailed`);
  }

  getTaskListsDetailed(taskListId: number): void {
    this.http
      .get<TaskList>(`${this.apiUrl}/${this.selectedTaskGroup?.id}/task-lists/${taskListId}/detailed`)
      .subscribe(res => (this.selectedTaskList = res));
  }

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(
      `${this.apiUrl}/${this.selectedTaskGroup?.id}/task-lists/${this.selectedTaskList?.id}/tasks`
    );
  }

  addNewTask(newTask: NewTaskRequest): Observable<TaskItem> {
    return this.http.post<TaskItem>(
      `${this.apiUrl}/${this.selectedTaskGroup?.id}/task-lists/${this.selectedTaskList?.id}/tasks`,
      newTask
    );
  }

  updateTask(updatedTask: UpdateTaskRequest) {
    return this.http.put(
      `${this.apiUrl}/${this.selectedTaskGroup?.id}/task-lists/${this.selectedTaskList?.id}/tasks/${updatedTask.id}`,
      updatedTask
    );
  }

  toggleMarkTaskAsImportant(task: TaskItem): void {
    const updatedTask = Object.assign({}, task) as UpdateTaskRequest;
    updatedTask.isImportant = !updatedTask.isImportant;
    this.updateTask(updatedTask).subscribe(() => (task.isImportant = !task.isImportant));
  }

  toggleMarkTaskAsDone(task: TaskItem): void {
    const route = task.isDone ? 'mark-as-not-done' : 'mark-as-done';
    this.http
      .put(
        `${this.apiUrl}/${this.selectedTaskGroup?.id}/task-lists/${this.selectedTaskList?.id}/tasks/${task.id}/${route}`,
        null
      )
      .subscribe(() => (task.isDone = !task.isDone));
  }
}
