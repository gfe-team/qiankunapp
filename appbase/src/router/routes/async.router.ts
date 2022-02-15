
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/home.vue'

export const basicRoutes: Array<RouteRecordRaw> = [
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: () => import(/* webpackChunkName: "login" */ '@/views/passport/login')
    // },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/about.vue')
    },
    // {
    //     path: '/empty',
    //     name: 'Empty',
    //     component: () => import(/* webpackChunkName: "empty" */ '@/views/empty')
    // }
];