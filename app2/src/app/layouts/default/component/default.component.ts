import { Component } from '@angular/core';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  styleUrls:['./default.style.scss'],
  host: {
    '[class.layout-default]': 'true',
  },
})
export class LayoutDefaultComponent{

}
