import { NgModule } from '@angular/core';
import { DevComponent } from './dev/dev.component';
import { DevRoutingModule } from './dev.routing';

@NgModule({
  declarations: [DevComponent],
  imports: [
    DevRoutingModule,
  ],
  exports:[

  ],
  entryComponents:[

  ]
})
export class DevModule { }
