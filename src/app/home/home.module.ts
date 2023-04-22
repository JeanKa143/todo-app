import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPage } from './pages/landing/landing.page';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [LandingPage],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
