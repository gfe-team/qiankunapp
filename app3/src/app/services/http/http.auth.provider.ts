import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './http.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthInterceptor,
    multi: true
  }
];
