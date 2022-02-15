import VersionService from "@/core/version.service";
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
let timer = null;

// 版本更新提示
export function createUpgradeGuard(router: Router) {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

        next();
    });
    router.afterEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {

        if (['production'].includes(process.env.VUE_APP_NODE_ENV)) {

            if (timer) clearTimeout(timer);

            timer = setTimeout(async () => await VersionService.check(), 800);
        }
    });
}
