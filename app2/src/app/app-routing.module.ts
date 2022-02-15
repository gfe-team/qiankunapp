import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const __qiankun__ = (<any>window).__POWERED_BY_QIANKUN__;

const routes: Routes = [
  { path: '', loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule), data: { title: 'Home' } },
  { path: 'dev', loadChildren: () => import('./routes/dev/dev.module').then(m => m.DevModule), data: { title: 'DEV' } },
  // { path: '**', redirectTo: RoutesConfig.routes.error404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: !__qiankun__ })],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: __qiankun__ ? '/portal/app2' : '/' }]
})
export class AppRoutingModule { }
