// third-party
// import { FormattedMessage } from 'react-intl';
// assets
import { IconMessage, IconMoonStars, IconCheckupList, IconShare, IconUsers } from '@tabler/icons';

import { PROJECT_PATH, KEYWORD_PATH, MENTION_PATH } from 'config';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'projects',
            title: 'Projects',
            type: 'item',
            url: PROJECT_PATH,
            icon: IconCheckupList,
            breadcrumbs: false
        },
        {
            id: 'keywords',
            title: 'Keywords',
            type: 'item',
            url: KEYWORD_PATH,
            icon: IconMoonStars,
            breadcrumbs: false
        },
        {
            id: 'mentions',
            title: 'Mentions',
            type: 'item',
            url: MENTION_PATH,
            icon: IconShare,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
