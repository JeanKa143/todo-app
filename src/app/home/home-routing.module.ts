import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPage } from './pages/landing/landing.page';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: LandingPage }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
