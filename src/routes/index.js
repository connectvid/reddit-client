/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH } from 'config';
import NotFoundRoute from 'views/pages/maintenance/Error';

let routeStr = '/';
export default function ThemeRoutes() {
    const { isLoading, isExpired } = useAuth();
    // if (isTwitterAuth) routeStr = '/unauthenticated';
    if (isExpired) routeStr = '/expired';
    const authCommonRoutes = [
        // { path: '/campaigns/new', element: <Navigate to={routeStr} replace /> },
        // { path: '/campaigns/:id', element: <Navigate to={routeStr} replace /> },
        // { path: '/campaigns', element: <Navigate to={routeStr} replace /> },
        { path: DASHBOARD_PATH, element: <Navigate to={routeStr} replace /> },
        LoginRoutes,
        MainRoutes
        // NotFoundRoute
    ];

    // disabling auth sample reoute!
    const routes = [{ path: '/', element: <Navigate to={DASHBOARD_PATH} replace /> }, LoginRoutes, MainRoutes, NotFoundRoute];
    let allRoutes = [];
    if (isLoading) {
        allRoutes = [LoginRoutes, NotFoundRoute];
    } else if (isExpired) {
        allRoutes = [...authCommonRoutes];
    } else {
        allRoutes = routes;
    }
    return useRoutes(allRoutes);
}
