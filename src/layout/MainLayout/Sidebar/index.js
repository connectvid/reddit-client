/* eslint-disable no-underscore-dangle */
import { memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Drawer, Stack, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';

import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'features/constant';

// import { useDispatch, useSelector } from 'features';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'features/menu/menuSlice';
import useAuth from 'hooks/useAuth';

// import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
// import Header from './Header';
// import Sidebar from './Sidebar';
// // import Customization from '../Customization';
// import navigation from 'menu-items';
//
// import { useDispatch, useSelector } from 'react-redux';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
    const { dbUser } = useAuth();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const { drawerType } = useConfig();

    const logo = useMemo(
        () => (
            <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                <LogoSection />
            </Box>
        ),
        []
    );

    const drawerContent = (
        <>
            <MenuList />
        </>
    );

    const drawerSX = {
        paddingLeft: drawerOpen ? '16px' : 0,
        paddingRight: drawerOpen ? '16px' : 0,
        marginTop: drawerOpen ? 20 : '42px'
    };

    const drawer = useMemo(
        () => (
            <>
                {matchDownMd ? (
                    <>
                        <Box sx={drawerSX}>{drawerContent}</Box>
                    </>
                ) : (
                    <PerfectScrollbar
                        component="div"
                        style={{
                            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                            ...drawerSX
                        }}
                    >
                        {drawerContent}
                        {/* {(dbUser?._id && drawerOpen && (
                            <Stack direction="row" justifyContent="center" sx={{ mb: 2, width: '100%' }}>
                                <Chip
                                    label={<>{dbUser.credit} : Credit(s) left</>}
                                    chipcolor="primary"
                                    sx={{
                                        width: '100%',
                                        fontSize: 12,
                                        height: '50px',
                                        'span.MuiChip-label': {
                                            display: 'flex',
                                            alignItems: 'center !important'
                                        }
                                    }}
                                />
                            </Stack>
                        )) ||
                            ''} */}
                    </PerfectScrollbar>
                )}
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchUpMd, drawerOpen, drawerType]
    );

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            {matchDownMd || (drawerType === LAYOUT_CONST.MINI_DRAWER && drawerOpen) ? (
                <Drawer
                    variant={matchUpMd ? 'persistent' : 'temporary'}
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => dispatch(openDrawer(!drawerOpen))}
                    sx={{
                        '& .MuiDrawer-paper': {
                            mt: matchDownMd ? 0 : 11,
                            zIndex: 1099,
                            width: drawerWidth,
                            background: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            borderRight: 'none'
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color="inherit"
                >
                    {matchDownMd && logo}

                    {drawer}
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {/* {logo} */}
                    <Box sx={{ height: `60px` }} />
                    {drawer}
                </MiniDrawerStyled>
            )}
        </Box>
    );
};

export default memo(Sidebar);
