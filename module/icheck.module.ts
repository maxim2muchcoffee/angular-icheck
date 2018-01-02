import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICheckComponent } from './icheck.component';
import { ICheckService } from './icheck.service';
import { ICheckConfigArgs, ICheckConfig } from './icheck-config';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ICheckComponent ],
  exports: [ ICheckComponent ],
  providers: [ ICheckService ]
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
