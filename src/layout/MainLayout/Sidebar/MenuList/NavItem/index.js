import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'react-redux';
import { activeItem, openDrawer } from 'features/menu/menuSlice';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    // const { search } = useLocation();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const { grey } = theme.palette;
    const { borderRadius } = useConfig();
    const dispatch = useDispatch();
    const { openItem } = useSelector((state) => state.menu);

    const Icon = item?.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" style={{ stroke: openItem.findIndex((id) => id === item?.id) > -1 ? grey[50] : grey[500] }} />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }
    // const dp = search?.includes?.(`dp=`) ? search : '';
    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
        // component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${item.url}${search}`} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch(activeItem([id]));
        if (matchesSM) dispatch(openDrawer(false));
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(activeItem([item.id]));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                // backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                background:
                    openItem?.findIndex((id) => id === item.id) > -1 ? 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
                // ,...(openItem?.findIndex((id) => id === item.id) > -1
                //     ? { background: 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)', color: '#fff' }
                //     : {})
            }}
            selected={openItem?.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36, color: '#6E7478' }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={openItem?.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} sx={{ color: '#fff' }}>
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
