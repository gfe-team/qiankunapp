import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  exports:[

  ],
  entryComponents:[

  ]
})
export class HomeModule { }
