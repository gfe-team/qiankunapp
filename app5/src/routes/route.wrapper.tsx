import { FC, Suspense } from "react";
import { RouteProps } from 'react-router';

const RouteWrapper: FC<RouteProps> = ({ ...props }) => {
    const element = props.element;

    return (

        <Suspense fallback={<>...</>}>
            {element}
        </Suspense>
    )
};

export default RouteWrapper;
