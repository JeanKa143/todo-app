import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListPage } from './pages/task-list/task-list.page';
import { SharedModule } from '../shared/shared.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskInfoMenuComponent } from './components/task-info-menu/task-info-menu.component';
import { TaskStepComponent } from './components/task-step/task-step.component';

@NgModule({
  declarations: [
    TaskListPage,
    LoadingSpinnerComponent,
    AddTaskComponent,
    TaskListComponent,
    TaskInfoMenuComponent,
    TaskStepComponent
  ],
  imports: [CommonModule, TasksRoutingModule, SharedModule, ReactiveFormsModule]
})
export class TasksModule {}
