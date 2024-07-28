// third-party
// import { FormattedMessage } from 'react-intl';
// assets
import { IconMessage, IconMoonStars, IconBrandInstagram, IconCheckupList, IconShare, IconTemplate, IconUsers } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'projects',
            title: 'Projects',
            type: 'item',
            url: '/projects',
            icon: IconBrandInstagram,
            breadcrumbs: false
        },
        {
            id: 'keywords',
            title: 'Keywords',
            type: 'item',
            url: '/keywords',
            icon: IconBrandInstagram,
            breadcrumbs: false
        },
        {
            id: 'mentions',
            title: 'Mentions',
            type: 'item',
            url: '/mentions',
            icon: IconBrandInstagram,
            breadcrumbs: false
        }
        // {
        //     id: 'audience',
        //     title: 'Audience',
        //     type: 'item',
        //     url: '/audience',
        //     icon: IconUsers,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'lists',
        //     title: 'Lists',
        //     type: 'item',
        //     url: '/lists',
        //     icon: IconCheckupList,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'dm',
        //     title: 'Direct Message',
        //     type: 'item',
        //     url: '/dm',
        //     icon: IconMessage,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'proxy',
        //     title: 'Proxy',
        //     type: 'item',
        //     url: '/proxy',
        //     icon: IconShare,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'campaign-settings',
        //     title: 'Campaign Settings',
        //     type: 'item',
        //     url: '/campaign-settings',
        //     icon: IconMoonStars,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'message-templates',
        //     title: 'Message templates',
        //     type: 'item',
        //     url: '/message-templates',
        //     icon: IconTemplate,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
