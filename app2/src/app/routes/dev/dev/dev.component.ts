import { Component, OnInit, HostListener, Output, EventEmitter, SimpleChanges, Input, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, NgZone } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevComponent implements OnInit {


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

}
