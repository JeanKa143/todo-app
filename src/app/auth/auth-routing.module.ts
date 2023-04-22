import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingUpPage } from './pages/sing-up/sing-up.page';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'singup', component: SingUpPage }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
