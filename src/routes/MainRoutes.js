import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { PROJECT_PATH, KEYWORD_PATH, MENTION_PATH, REPLY_PATH } from 'config';

const Projects = Loadable(lazy(() => import('views/TwitterDm/projects')));
const Keywords = Loadable(lazy(() => import('views/TwitterDm/keywords')));
const AddNewKeyword = Loadable(lazy(() => import('views/TwitterDm/keywords/AddNewKeyword')));
const Mentions = Loadable(lazy(() => import('views/TwitterDm/mentions')));
const Reply = Loadable(lazy(() => import('views/TwitterDm/reply')));
const Subscription = Loadable(lazy(() => import('views/TwitterDm/subscription')));
const Settings = Loadable(lazy(() => import('views/TwitterDm/Settings')));
const Expired = Loadable(lazy(() => import('views/TwitterDm/expired')));
const NotFound = Loadable(lazy(() => import('views/pages/maintenance/Error')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: PROJECT_PATH,
            element: <Projects />
        },
        {
            path: `${KEYWORD_PATH}/add`,
            element: <AddNewKeyword />
        },
        {
            path: KEYWORD_PATH,
            element: <Keywords />
        },
        {
            path: MENTION_PATH,
            element: <Mentions />
        },
        {
            path: REPLY_PATH,
            element: <Reply />
        },

        {
            path: '/expired',
            element: <Expired />
        },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/subscription',
            element: <Subscription />
        },

        {
            path: '/*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
