import { FC, lazy, Suspense, useEffect, useMemo } from 'react';
import type { RouteObject } from 'react-router';
import RouteWrapper from './route.wrapper';

const HomePage = lazy(() => import('../views/home'));
const DevPage = lazy(() => import('../views/dev'));
const NotFoundPage = lazy(() => import('../views/error/404'));
const DefaultLayout = lazy(() => import('../layout/default'));
const AboutPage = lazy(() => import('../views/about'));


const routes: RouteObject[] = [
    {
        path: '/',
        element: <RouteWrapper element={<HomePage />} />
    },
    {
        path: '/dev',
        element: <RouteWrapper element={<DevPage />} />
    },
    {
        path: '/default',
        element: <RouteWrapper element={<DefaultLayout />} />,
        children:[
            {
                path: 'about',
                element: <RouteWrapper element={<AboutPage />} />
            }
        ]
    },
    {
        path: '/*',
        element: <RouteWrapper element={<NotFoundPage />} />
    }
];



export default routes;