import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { BtnSpinnerComponent } from './components/btn-spinner/btn-spinner.component';

@NgModule({
  declarations: [HeaderComponent, BtnSpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, BtnSpinnerComponent]
})
export class SharedModule {}
