import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SingUpPage } from './pages/sing-up/sing-up.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingUpPage],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule]
})
export class AuthModule {}
