import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { singleSpaPropsSubject } from '../single-spa/single-spa-props';
import { PagerMessage, setPager, SubAppPagerCollect } from './@core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  private pagerSub: Subscription = new Subscription();

  constructor() {


  }

  ngOnInit() {

    // 子应用注册呼机
    singleSpaPropsSubject.pipe(
      tap(() => console.log('app2 registe pager by singleSpaPropsSubject'))
    ).subscribe((props: any) => {

      const pager: Subject<any> = props.pager as Subject<any>;
      setPager(pager);
    });

    // 全局消息订阅
    this.pagerSub = SubAppPagerCollect().subscribe((msg: PagerMessage) => {

      if (msg) {
        console.log("app2 接收到主应用消息 : ", msg.data);
      }
    });

  }


  ngOnDestroy() {

    this.pagerSub?.unsubscribe?.();
  }

}
