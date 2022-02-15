import { Injectable, Injector } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route
} from '@angular/router';
import { AuthService } from 'src/app/services/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private injector: Injector) { }


  get authService():AuthService {
    return this.injector.get(AuthService);
  }

  get router():Router {
    return this.injector.get(Router);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(route);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.checkLogin(route);
  }

  private checkLogin(route: any): boolean {
    const _isAuth = this.authService.IsAuth;
    if (!_isAuth) {
      this.router.navigate(['passport/login']);
      return false;
    }
    return _isAuth;
  }
}
