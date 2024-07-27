// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import {
    IconUserSearch,
    IconVaccineBottle,
    IconTestPipe,
    IconBook2,
    IconTemplate,
    Icon3dCubeSphere,
    IconSettings,
    IconInbox,
    IconDashboard,
    IconDatabaseExport,
    IconAward,
    IconReportAnalytics,
    IconDeviceAnalytics,
    IconList,
    IconAlien,
    IconHeart,
    IconMessage2
} from '@tabler/icons';

// constant
const icons = {
    IconUserSearch,
    IconTestPipe,
    IconBook2,
    IconTemplate,
    Icon3dCubeSphere,
    IconSettings,
    IconInbox,
    IconDashboard,
    IconDatabaseExport,
    IconAward,
    IconReportAnalytics,
    IconDeviceAnalytics,
    IconAlien,
    IconHeart,
    IconList,
    IconVaccineBottle,
    IconMessage2
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const account = {
    id: 'account',
    title: 'Account',
    type: 'group',
    children: [
        {
            id: 'subscription',
            title: 'Subscription',
            type: 'item',
            url: '/subscription',
            icon: icons.IconAward,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: 'Profile Settings',
            type: 'item',
            url: '/settings',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default account;
