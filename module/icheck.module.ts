import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICheckComponent } from './icheck.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ICheckComponent ],
  exports: [ ICheckComponent ]
})
export class ICheckModule { }
