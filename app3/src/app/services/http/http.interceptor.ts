import { Injectable, Injector } from '@angular/core';
import {
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError, Subject } from 'rxjs';
import { mergeMap, catchError, concatMap, debounceTime } from 'rxjs/operators';
import { TokenService } from '../../@core';
import { NzMessageService } from 'ng-zorro-antd/message';

// 防抖
const debounce = (fn: Function, wait: number) => {
  let timeout: number | null = null;
  return () => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
};

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  private messageStream: Subject<any> = new Subject<any>();

  private TOKEN: string = '';

  get router() {

    return this.injector.get(Router);
  }


  constructor(private injector: Injector) {
    this.messageStream.pipe(
      debounceTime(1200)
    ).subscribe(() => {
      console.log('无权请求');
      const msg_id = this.messageService.error('请求无效,请重新登录 !', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.messageService.remove(msg_id);
        this.router.navigateByUrl('/passport/login');
      }, 500);
    });
  }


  get tokenService() {

    return this.injector.get(TokenService);
  }

  get messageService() {

    return this.injector.get(NzMessageService);
  }


  private httpResponseSuccess = (
    req: HttpRequest<any>,
    event: HttpResponse<any>,
  ): Observable<any> => {

    return of(Object.assign(event, {}));
  }
  private httpResponseError = (
    req: HttpRequest<any>,
    err: HttpErrorResponse,
  ): Observable<any> => {

    const {
      status: respCode
    } = err;

    switch (respCode) {
      case 401:
        this.messageStream.next('401');
        break;
      default:

        break;
    }
    return throwError(Object.assign(err, {}));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {

    // return new HttpHeaders()
    //   .set('style', style.toString())
    //   .set('token', this.__token)
    //   .set('validate', validate);

    this.TOKEN = this.tokenService.read();

    let reqHeader = new HttpHeaders();
    if (!!this.TOKEN) reqHeader = reqHeader.set('Authorization', `Bearer ${this.TOKEN}`);
    const authReq = req.clone({
      headers: reqHeader
    });

    return next.handle(authReq).pipe(
      mergeMap((event: any) => {
        // console.log(req);
        // console.log(event);
        // console.log(this.tokenService);
        // if (configInc.appDebug) console.log('[HTTP] >> interceptor >>：', event);
        // // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        // if (
        //   event instanceof HttpResponse &&
        //   [200, 201, 202, 203, 204, 205, 206].indexOf(event.status) > -1
        // )
        //   return this.httpResponseSuccess(authReq, event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        // if (configInc.appDebugError) console.error('[HTTP] >> interceptor >>：', err);
        return this.httpResponseError(req, err);
      }),
    );
  }
}
