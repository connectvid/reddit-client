import { IconSettings } from '@tabler/icons';
import { SETTING_PATH, SUBSCRIPTION_PATH } from 'config';
import { TbReceiptDollar } from 'react-icons/tb';

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
            icon: TbReceiptDollar,
            breadcrumbs: false
        },
        {
            id: SETTING_PATH.substring(1),
            title: 'Settings',
            type: 'item',
            url: SETTING_PATH,
            icon: IconSettings,
            breadcrumbs: false
        }
    ]
};

export default account;
