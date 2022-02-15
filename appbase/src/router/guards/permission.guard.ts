import type { Router } from 'vue-router';

import { useUserStore } from "@/store/user";
import { LOGIN_PATH } from "./consts";
import { whitePathList } from "./white.paths";

export function createPermissionGuard(router: Router) {
    router.beforeEach((to, from, next) => {
        const store = useUserStore();
        // Whitelist can be directly entered
        if (whitePathList.includes(to.path)) {
            next();
            return;
        }
        // token校验
        const token = store.token;
        if (!token) {
            // You can access without permission. You need to set the routing meta.ignoreAuth to true
            if (to.meta?.ignoreAuth) {
                next();
                return;
            }

            // redirect login page
            const redirectData = {
                query: {},
                path: LOGIN_PATH,
                replace: true
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path,
                };
            }
            next(redirectData);
            return;
        }
        next();

    });
    // router.afterEach(async () => {

    //     return true;
    // });
}
