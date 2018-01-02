import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ICheckModule } from '../../module/icheck.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ICheckModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
