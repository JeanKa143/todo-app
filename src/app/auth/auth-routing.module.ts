import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingUpPage } from './pages/sing-up/sing-up.page';
import { LogInPage } from './pages/log-in/log-in.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'singup', component: SingUpPage },
      { path: 'login', component: LogInPage },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
