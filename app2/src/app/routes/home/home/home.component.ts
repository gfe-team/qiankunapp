import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SubAppPagerIssue } from 'src/app/@core';
import { HttpService } from 'src/app/services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {


  constructor(
    private http: HttpService,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private translate: TranslateService) {


  }

  ngOnInit() {

    // this.http.get('/test/a01c3292-5a2b-40fd-8731-e506a976b0e8').subscribe(t => console.group(t));

    // this.http.get('/message/list?pageIndex=1&pageSize=5').subscribe(t => console.group(t));
  }

  public onIssue() {

    SubAppPagerIssue('i am from app2');
  }

}
