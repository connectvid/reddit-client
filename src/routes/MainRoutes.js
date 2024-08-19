import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { PROJECT_PATH, KEYWORD_PATH, MENTION_PATH, REPLY_PATH } from 'config';
import SetKeywords from 'views/BizReply/projects/SetKeywords';

const Projects = Loadable(lazy(() => import('views/BizReply/projects')));
const Keywords = Loadable(lazy(() => import('views/BizReply/keywords')));
const AddNewKeyword = Loadable(lazy(() => import('views/BizReply/keywords/AddNewKeyword')));
const Mentions = Loadable(lazy(() => import('views/BizReply/mentions')));
const Reply = Loadable(lazy(() => import('views/BizReply/reply')));
const Subscription = Loadable(lazy(() => import('views/BizReply/subscription')));
const Settings = Loadable(lazy(() => import('views/BizReply/Settings')));
const Expired = Loadable(lazy(() => import('views/BizReply/expired')));
const NotFound = Loadable(lazy(() => import('views/pages/maintenance/Error')));
const OnBoarding = Loadable(lazy(() => import('views/pages/onBoarding/OnBoarding')));

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
        },
        {
            path: '/setkeywords',
            element: <SetKeywords />
        },
        {
            path: '/onboarding',
            element: <OnBoarding />
        }
    ]
};

export default MainRoutes;
