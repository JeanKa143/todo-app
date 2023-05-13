import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { TaskList, TaskGroup, TaskItem, NewTaskRequest } from '../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl: string;

  selectedTaskGroup?: TaskGroup;

  constructor(private readonly http: HttpClient, private readonly tokenStorageService: TokenStorageService) {
    const userId = this.tokenStorageService.getTokenData()?.userId;
    this.apiUrl = `${environment.apiUrl}users/${userId}/task-list-groups`;
  }

  getTaskGroupDetailedList(): Observable<TaskGroup[]> {
    return this.http.get<TaskGroup[]>(`${this.apiUrl}/detailed`);
  }

  getTaskListsDetailed(groupId: number, taskListId: number): Observable<TaskList> {
    return this.http.get<TaskList>(`${this.apiUrl}/${groupId}/task-lists/${taskListId}/detailed`);
  }

  getTasks(groupId: number, taskListId: number): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.apiUrl}/${groupId}/task-lists/${taskListId}/tasks`);
  }

  addNewTask(groupId: number, taskListId: number, newTask: NewTaskRequest): Observable<TaskItem> {
    return this.http.post<TaskItem>(`${this.apiUrl}/${groupId}/task-lists/${taskListId}/tasks`, newTask);
  }
}
