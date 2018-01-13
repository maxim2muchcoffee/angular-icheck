import { NgModule, ModuleWithProviders, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICheckComponent } from './components/icheck.component';
import { ICheckRadioService } from './services/icheck-radio.service';
import { ICheckConfigArgs, ICheckConfig } from './icheck.config';

const ICheckOptions = new InjectionToken<ICheckConfigArgs>('config');

export function factoryICheckConfig(config: ICheckConfigArgs) {
  return new ICheckConfig(config);
}

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ICheckComponent ],
  exports: [ ICheckComponent ],
  providers: [ ICheckRadioService ]
})
export class ICheckModule {

  static forRoot(config: ICheckConfigArgs = {}): ModuleWithProviders {
    return {
      ngModule: ICheckModule,
      providers: [
        { provide: ICheckOptions, useValue: config },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: config },
        { provide: ICheckConfig, useFactory: factoryICheckConfig, deps: [ ICheckOptions ] }
      ]
    };
  }

}
