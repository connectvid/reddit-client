/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const theme = useTheme();

    const { drawerOpen } = useSelector((state) => state.menu);
    // menu list collapse & items
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                style={{
                    position: item.title === 'Account' ? 'absolute' : 'relative',
                    bottom: item.title === 'Account' ? '0px' : null
                }}
                subheader={
                    item.title && (
                        <Typography
                            variant="caption"
                            sx={{ ...theme.typography.menuCaption }}
                            // style={{ marginTop: `${item.title}=== 'Account'  ? '40px' : '0px'` }}
                            // style={{ marginTop: item.title === 'Account' ? '210px' : '0px' }}
                            display="block"
                            gutterBottom
                        >
                            {(drawerOpen && item.title) || ''}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}

                <Divider sx={{ my: 1.25 }} />
            </List>

            {/* group divider */}
            {/* <Divider sx={{ mt: 0.25, mb: 1.25 }} /> */}
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
