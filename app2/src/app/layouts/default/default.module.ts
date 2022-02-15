import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { LayoutDefaultComponent } from './component';

const COMPONENTS = [
  LayoutDefaultComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [],
  entryComponents: [],
})
export class LayoutDefaultModule {}
