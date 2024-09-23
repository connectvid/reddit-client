import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import {
    PROJECT_PATH,
    KEYWORD_PATH,
    MENTION_PATH,
    REPLY_PATH,
    SETTING_PATH,
    SUBSCRIPTION_PATH,
    EXPIRED_PATH,
    ONBOARDING_PATH,
    REPORTS_PATH,
    PROMPT_PATH
} from 'config';
import SetKeywords from 'views/BizReply/projects/SetKeywords';

const Projects = Loadable(lazy(() => import('views/BizReply/projects')));
const Keywords = Loadable(lazy(() => import('views/BizReply/keywords')));
const Prompts = Loadable(lazy(() => import('views/BizReply/prompts')));
// const AddNewKeyword = Loadable(lazy(() => import('views/BizReply/keywords/AddNewKeyword')));
const Mentions = Loadable(lazy(() => import('views/BizReply/mentions')));
const Reply = Loadable(lazy(() => import('views/BizReply/reply')));
const Subscription = Loadable(lazy(() => import('views/BizReply/subscription')));
// const PaddleSubscription = Loadable(lazy(() => import('views/BizReply/subscription/paddleInc')));
const Settings = Loadable(lazy(() => import('views/BizReply/Settings')));
const Expired = Loadable(lazy(() => import('views/BizReply/expired')));
const NotFound = Loadable(lazy(() => import('views/pages/maintenance/Error')));
const OnBoarding = Loadable(lazy(() => import('views/pages/onBoarding/OnBoarding')));
const Report = Loadable(lazy(() => import('views/BizReply/Report')));

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
        // {
        //     path: `${KEYWORD_PATH}/add`,
        //     element: <AddNewKeyword />
        // },
        {
            path: KEYWORD_PATH,
            element: <Keywords />
        },
        {
            path: PROMPT_PATH,
            element: <Prompts />
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
            path: EXPIRED_PATH,
            element: <Expired />
        },
        {
            path: SETTING_PATH,
            element: <Settings />
        },
        {
            path: SUBSCRIPTION_PATH,
            element: <Subscription />
        },
        // {
        //     path: `${SUBSCRIPTION_PATH}/paddle`,
        //     element: <PaddleSubscription />
        // },
        {
            path: '/setkeywords',
            element: <SetKeywords />
        },
        {
            path: ONBOARDING_PATH,
            element: <OnBoarding />
        },
        {
            path: REPORTS_PATH,
            element: <Report />
        },
        {
            path: '/*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
