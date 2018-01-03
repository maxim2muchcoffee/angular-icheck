import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICheckComponent } from './icheck.component';
import { ICheckRadioService } from './icheck-radio.service';
import { ICheckConfigArgs, ICheckConfig } from './icheck-config';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ICheckComponent ],
  exports: [ ICheckComponent ],
  providers: [ ICheckRadioService ]
})
export class ICheckModule {

  public static forRoot(config: ICheckConfigArgs): ModuleWithProviders {
    return {
      ngModule: ICheckModule,
      providers: [
        { provide: ICheckConfig, useValue: config }
      ]
    };
  }

}
