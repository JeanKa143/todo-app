import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListPage } from './pages/task-list/task-list.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskListPage],
  imports: [CommonModule, TasksRoutingModule, SharedModule]
})
export class TasksModule {}
