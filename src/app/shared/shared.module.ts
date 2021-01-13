import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './divider/divider.component';

// Angualer material component APIs
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [DividerComponent],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports: [ DividerComponent]
})
export class SharedModule { }
