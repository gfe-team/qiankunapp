import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagerMessage, SubAppPagerCollect } from './@core/pager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  private pagerSub: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {

    this.pagerSub = SubAppPagerCollect().subscribe((msg: PagerMessage) => {

      if (msg) {
        console.log("app3 接收到主应用消息 : ", msg.data);
      }
    });
  }

  ngOnDestroy() {

    this.pagerSub?.unsubscribe?.();
  }
}
