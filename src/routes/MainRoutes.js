import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { PROJECT_PATH, KEYWORD_PATH, MENTION_PATH } from 'config';

const Projects = Loadable(lazy(() => import('views/TwitterDm/projects')));
const Keywords = Loadable(lazy(() => import('views/TwitterDm/keywords')));
const Mentions = Loadable(lazy(() => import('views/TwitterDm/mentions')));
const Lists = Loadable(lazy(() => import('views/TwitterDm/lists')));
const CampaignSettings = Loadable(lazy(() => import('views/TwitterDm/campaign-settings')));
const MessageTemplates = Loadable(lazy(() => import('views/TwitterDm/message-tempates')));
const Dm = Loadable(lazy(() => import('views/TwitterDm/dm')));
const CampaignDetails = Loadable(lazy(() => import('views/TwitterDm/campaignDetails')));
const CreateNewCampaign = Loadable(lazy(() => import('views/TwitterDm/createNewCampaign')));
const ListDetails = Loadable(lazy(() => import('views/TwitterDm/listDetails')));
const Subscription = Loadable(lazy(() => import('views/TwitterDm/subscription')));
const Audience = Loadable(lazy(() => import('views/TwitterDm/audience')));
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
            path: KEYWORD_PATH,
            element: <Keywords />
        },
        {
            path: MENTION_PATH,
            element: <Mentions />
        },
        {
            path: '/expired',
            element: <Expired />
        },
        {
            path: '/audience',
            element: <Audience />
        },
        {
            path: '/lists',
            element: <Lists />
        },
        {
            path: '/dm',
            element: <Dm />
        },
        {
            path: '/dm/:id',
            element: <CampaignDetails />
        },
        {
            path: '/list/:id',
            element: <ListDetails />
        },
        {
            path: '/create-new-campaign',
            element: <CreateNewCampaign />
        },
        // {
        //     path: '/proxy',
        //     element: <Proxy />
        // },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/subscription',
            element: <Subscription />
        },
        {
            path: '/campaign-settings',
            element: <CampaignSettings />
        },
        {
            path: '/message-templates',
            element: <MessageTemplates />
        },
        {
            path: '/*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
