import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';

import { I18NService } from './@core/i18n/i18n.service';
const I18NSERVICE_PROVIDES = [{ provide: HttpClient, useClass: I18NService, multi: false }];

export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    // ...I18NSERVICE_PROVIDES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
