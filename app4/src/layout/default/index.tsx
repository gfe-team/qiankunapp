import { FC, Suspense } from 'react';
import { Outlet } from 'react-router';

export const DefaultRouteView: FC = () => {
    return (
        <Suspense
            fallback={<>...</>}
        >
            <h1>default layout</h1>
            <Outlet />
        </Suspense>
    );
};

export default DefaultRouteView;
