import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const navItems = menuItem.items.map((item, i) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} showDivider={i + 1 !== menuItem.items?.length} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);

/*
import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import agencyPlanMenuItems from 'menu-items/menu-items.agency.js';
import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const {
        subscription: { subscription }
    } = useSelector((state) => state);
    // console.log(subscription?.credit?.reports, 1234);
    if (subscription?.credit?.reports) {
        return (
            <>
                {agencyPlanMenuItems.items.map((item, i) => {
                    switch (item.type) {
                        case 'group':
                            return <NavGroup key={item.id} item={item} showDivider={i + 1 !== menuItem.items?.length} />;
                        default:
                            return (
                                <Typography key={item.id} variant="h6" color="error" align="center">
                                    Menu Items Error
                                </Typography>
                            );
                    }
                })}
            </>
        );
    }
    return (
        <>
            {menuItem.items.map((item, i) => {
                switch (item.type) {
                    case 'group':
                        return <NavGroup key={item.id} item={item} showDivider={i + 1 !== menuItem.items?.length} />;
                    default:
                        return (
                            <Typography key={item.id} variant="h6" color="error" align="center">
                                Menu Items Error
                            </Typography>
                        );
                }
            })}
        </>
    );

    // const navItems = menuItem.items.map((item, i) => {
    //     switch (item.type) {
    //         case 'group':
    //             return <NavGroup key={item.id} item={item} showDivider={i + 1 !== menuItem.items?.length} />;
    //         default:
    //             return (
    //                 <Typography key={item.id} variant="h6" color="error" align="center">
    //                     Menu Items Error
    //                 </Typography>
    //             );
    //     }
    // });

    // return <>{navItems}</>;
};

export default memo(MenuList);
*/
