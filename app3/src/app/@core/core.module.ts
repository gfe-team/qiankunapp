import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  APP_INITIALIZER,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpAuthInterceptor } from './../services/http/http.interceptor';
import { StartupService } from './start';

// #region Startup Service
export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
// #endregion


@NgModule({
  exports: [],
  providers: [],
})
export class CoreModule {

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    // if (parentModule) {
    //   throw new Error(`[CoreModule] has already been loaded. Import Core modules in the AppModule only.`);
    // }
  }

  // static forRoot(): ModuleWithProviders {
  //   return <ModuleWithProviders>{
  //     ngModule: CoreModule,
  //     providers: [
  //       // ...LANG_PROVIDES,
  //       // ...I18NSERVICE_PROVIDES,
  //       ...APPINIT_PROVIDES,
  //       {
  //         provide: HTTP_INTERCEPTORS,
  //         useClass: HttpAuthInterceptor,
  //         multi: true,
  //       },
  //     ],
  //   };
  // }
}
