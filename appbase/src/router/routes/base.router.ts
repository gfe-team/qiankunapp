
import { RouteRecordRaw } from 'vue-router';
import Portal from '@/views/portal';

export const asyncRoutes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     redirect: "/login",
    //     name: 'Home',
    //     component: Home
    // },
    // // {
    // //     name: 'dev',
    // //     path: '/dev',
    // //     component: () => import(/* webpackChunkName: "dev" */ '@/views/dev'),
    // // },
    // {
    //     path: '/portal',
    //     name: 'Portal',
    //     component: () => import(/* webpackChunkName: "login" */ '@/views/Portal')
    // },
    {
        path: '/portal',
        name: 'PortalLayout',
        component: () => import(/* webpackChunkName: "portal-layout" */ '@/layouts/empty/empty.layout'),
        children: [
            {
                path: '',
                name: 'portal',
                component: Portal
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'portal',
                component: Portal
            }
        ]
    },
    {
        name: '404',
        path: '/404.html',
        component: () => import(/* webpackChunkName: "notfound" */ '../../components/404/index'),
    },
    // {
    //     path: '/:patchMatch(.*)',
    //     redirect: {
    //         name: "404"
    //     }
    // }
];