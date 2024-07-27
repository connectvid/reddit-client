// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import { IconUserSearch } from '@tabler/icons';

// constant
const icons = {
    IconUserSearch
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const output = {
    id: 'output',
    // title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconUserSearch,
            breadcrumbs: false
        }
    ]
};

export default output;
