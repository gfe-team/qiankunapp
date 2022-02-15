import { App } from 'vue';
import VueRouter, { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPermissionGuard, createProgressGuard, createUpgradeGuard } from './guards';

import { basicRoutes, asyncRoutes } from './routes';

const routes: Array<RouteRecordRaw> = [
  ...basicRoutes,
  ...asyncRoutes
];

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/portal/app1' : '/'),
  routes
});

export function setupRouter(app: App<Element>) {

  app.use(router);

  // guards
  createProgressGuard(router);
  createUpgradeGuard(router);
  // createPermissionGuard(router);
}

export default router;
