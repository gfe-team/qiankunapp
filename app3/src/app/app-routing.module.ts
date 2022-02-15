import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule), data: { title: 'Home' } },
  { path: 'dev', loadChildren: () => import('./routes/dev/dev.module').then(m => m.DevModule), data: { title: 'DEV' } },
  // { path: '**', redirectTo: RoutesConfig.routes.error404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // @ts-ignore
  providers: [{ provide: APP_BASE_HREF, useValue: (window as any).__POWERED_BY_QIANKUN__ ? '/portal/app3' : '/' }]
})
export class AppRoutingModule { }
