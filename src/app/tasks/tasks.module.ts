import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListPage } from './pages/task-list/task-list.page';
import { SharedModule } from '../shared/shared.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

@NgModule({
  declarations: [TaskListPage, LoadingSpinnerComponent, AddTaskComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule]
})
export class TasksModule {}
