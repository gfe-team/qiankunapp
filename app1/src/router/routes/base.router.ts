
import Home from '@/views/Home.vue';
import { RouteRecordRaw } from 'vue-router';
// import { emptyLayout } from './layout.router';
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