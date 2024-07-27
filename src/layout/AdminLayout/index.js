import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import AdminSidebar from './AdminSidebar';
// import Customization from '../Customization';
import navigation from 'menu-items';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'features/constant';
import { openDrawer } from 'features/menu/menuSlice';
import { useDispatch, useSelector } from 'redux';

// assets
import { IconChevronRight } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH } from 'config';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const AdminLayout = () => {
    const { dbLoginUser } = useAuth();
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const { container } = useConfig();

    React.useEffect(() => {
        dispatch(openDrawer(!matchDownMd));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    const header = useMemo(
        () => (
            <Toolbar>
                <Header />
            </Toolbar>
        ),
        []
    );
    // dbUser,
    // 6434 superadmin
    if (!dbLoginUser?.roles?.includes('6434')) return <Navigate to={DASHBOARD_PATH} />;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: drawerOpen ? theme.transitions.create('width') : 'none'
                }}
            >
                {header}
            </AppBar>

            {/* drawer */}
            <AdminSidebar />

            {/* main content */}
            <Main theme={theme} open={drawerOpen}>
                {/* breadcrumb */}
                {container && (
                    <Container maxWidth="lg">
                        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                        <Outlet />
                    </Container>
                )}
                {!container && (
                    <>
                        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                        <Outlet />
                    </>
                )}
            </Main>
            {/* 🛠Modified by FoysalBN */}
            {/* <Customization /> */}
        </Box>
    );
};

export default AdminLayout;
