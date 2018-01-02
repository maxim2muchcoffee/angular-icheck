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
    ICheckModule.forRoot({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue'
    })
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
