import { Injectable, Injector } from '@angular/core';
import { catchError, zip } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private injector: Injector) {
  }

  get httpClient(): HttpClient {
    return this.injector.get(HttpClient);
  }

  get translateService(): TranslateService {

    return this.injector.get(TranslateService);
  }

  load(): Promise<any> {

    return new Promise((resolve, reject) => {


      let app = ([appData, langData]: any = []) => {
        // application data
        // const res: any = appData.app;
        // console.log(appData);
        // console.log(langData);

        this.translateService.setTranslation('zh', langData);
        this.translateService.setDefaultLang('zh');
      }

      // let app = (appData: any = {}) => {
      //   // application data
      //   // const res: any = appData.app;
      //   console.log(appData);
      // }

      let error = () => {
        return app();
      }

      let complete = () => {
        resolve(null);
      }


      this.httpClient.get(`assets/data/app.json`)
        .pipe(
          zip(this.httpClient.get(`assets/i18n/zh.json`)),
          catchError(appData => {
            resolve(null);
            return appData;
          }),
        )
        .subscribe(app, error, complete);

      // this.httpClient.get(`assets/data/app.json`)
      //   .pipe(
      //     catchError(appData => {
      //       resolve(null);
      //       return appData;
      //     }),
      //   )
      //   .subscribe(app, error, complete);


    });
  }

}
