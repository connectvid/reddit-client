// third-party
// import { FormattedMessage } from 'react-intl';
// assets
import { IconMessage, IconMoonStars, IconCheckupList, IconShare } from '@tabler/icons';

import { PROJECT_PATH, KEYWORD_PATH, MENTION_PATH, REPLY_PATH } from 'config';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: PROJECT_PATH.replace('/', ''),
            title: 'Projects',
            type: 'item',
            url: PROJECT_PATH,
            icon: IconCheckupList,
            breadcrumbs: false
        },
        {
            id: KEYWORD_PATH.replace('/', ''),
            title: 'Keywords',
            type: 'item',
            url: KEYWORD_PATH,
            icon: IconMoonStars,
            breadcrumbs: false
        },
        {
            id: MENTION_PATH.replace('/', ''),
            title: 'Mentions',
            type: 'item',
            url: MENTION_PATH,
            icon: IconShare,
            breadcrumbs: false
        },
        {
            id: REPLY_PATH.replace('/', ''),
            title: 'Replies',
            type: 'item',
            url: REPLY_PATH,
            icon: IconMessage,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
