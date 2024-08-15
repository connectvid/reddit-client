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
import { SETTING_PATH, SUBSCRIPTION_PATH } from 'config';

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
    // title: 'Account',
    type: 'group',
    children: [
        {
            id: SUBSCRIPTION_PATH.substring(1),
            title: 'Subscription',
            type: 'item',
            url: SUBSCRIPTION_PATH,
            icon: icons.IconAward,
            breadcrumbs: false
        },
        {
            id: SETTING_PATH.substring(1),
            title: 'Settings',
            type: 'item',
            url: SETTING_PATH,
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default account;
