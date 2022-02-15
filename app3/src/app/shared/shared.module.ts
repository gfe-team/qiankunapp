import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Directives } from './directives/index.array';
import { RouterModule } from '@angular/router';
import { LimitToPipe } from './pipes';

import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { AssetUrlPipe } from './pipes/assets.pipe';


const MODULES: Array<any> = [
  CommonModule,
  FormsModule,
  RouterModule,
  ...SHARED_ZORRO_MODULES
];
const PiPes = [
  LimitToPipe,
  AssetUrlPipe
];
const COMPONENTS: Array<any> = [];
const DIRECTIVES: Array<any> = [...Directives];
const PIPES: Array<any> = [...PiPes];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {

  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [
  //     ]
  //   };
  // }
}
