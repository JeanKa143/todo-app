import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SingUpPage } from './pages/sing-up/sing-up.page';
import { LogInPage } from './pages/log-in/log-in.page';

@NgModule({
  declarations: [SingUpPage, LogInPage],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule]
})
export class AuthModule {}
