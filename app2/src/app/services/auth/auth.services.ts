import { Injectable, Injector } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { TokenService } from '../../@core';
import { HttpService } from './../http/http.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../@core/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuth: boolean = false;

  constructor(private injector: Injector) {

  }

  get tokenService(): TokenService {

    return this.injector.get(TokenService);
  }
  get userService():UserService{

    return this.injector.get(UserService);
  }
  get http(): HttpService {

    return this.injector.get(HttpService);
  }

  get router(): Router {
    return this.injector.get(Router);
  }

  login(loginData: any): Observable<any> {

    let data: HttpParams = new HttpParams();
    Object.keys(loginData).map(k => {
      data = data.set(k, loginData[k]);
    });

    return this.http
      .post(
        '/token',
        data,
        new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      )
      .pipe(
        switchMap((data: any) => {
          const {
            status,
            access_token,
            expires_in,
            token_type,
            loginInfo
           } = data;

          // 登录成功
          if (!!loginInfo && this.userService.write(loginInfo)) {
            // 存储用户信息
          }
          if (!!access_token && this.tokenService.write(access_token)) {
            // this.loginSuccess(data);
            // console.log('login success');
            // this.router.navigate(['home']);
          } else {
            return throwError({
              error: {
                message: '数据不完整，请注意网络安全！',
              },
            });
          }
          return of(data);
        }),
      );
  }


  logout(): void {

    this.tokenService.destory();
    this.userService.destory();
  }


  get IsAuth(): boolean {
    this._isAuth = (this.tokenService.read() || '').length > 10;

    return this._isAuth;
  }

  get IsOnline():boolean{

    return this.IsAuth;
  }

}
