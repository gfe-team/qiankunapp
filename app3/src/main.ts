import { enableProdMode,NgModuleRef} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Subject } from 'rxjs';
import { setPager } from './app/@core/pager';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import './public-path'; 

if (environment.production) {
  enableProdMode();
}

let app: void | NgModuleRef<AppModule>;

async function render() {
  app = await platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props: Object) {
}

export async function mount(props: any) {

  const pager: Subject<any> = props.pager as Subject<any>;
  setPager(pager);
  
  await render();
}

export async function unmount(props: Object) {
  // @ts-ignore
  await app.destroy();
}
