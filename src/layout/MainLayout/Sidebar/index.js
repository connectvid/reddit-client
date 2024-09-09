/* eslint-disable no-underscore-dangle */
import { memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';

import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'features/constant';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'features/menu/menuSlice';
import RemainingCredits from 'views/BizReply/subscription/RemainingCredits';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const { drawerType } = useConfig();
    // const logo = useMemo(
    //     () => (
    //         <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
    //             <LogoSection />
    //         </Box>
    //     ),
    //     []
    // );

    const drawerContent = (
        <>
            <Box>
                <LogoSection />
                <MenuList />
            </Box>
            <RemainingCredits />
        </>
    );

    const drawerSX = {
        paddingLeft: drawerOpen ? '16px' : 0,
        paddingRight: drawerOpen ? '16px' : 0,
        marginTop: drawerOpen ? 16 : '42px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    const drawer = useMemo(
        () => (
            <Box bgcolor={theme.palette.background.sidebar}>
                {matchDownMd ? (
                    <>{/* <Box sx={drawerSX}>{drawerContent}</Box> */}</>
                ) : (
                    <PerfectScrollbar
                        component="div"
                        style={{
                            // height: '110vh',
                            height: !matchUpMd ? 'calc(100vh - 16px)' : 'calc(100vh - 16px)',
                            // height: !matchUpMd ? 'calc(100vh)' : 'calc(100vh)',
                            ...drawerSX
                        }}
                    >
                        {drawerContent}
                    </PerfectScrollbar>
                )}
            </Box>
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
                    {/* {matchDownMd && logo} */}

                    {drawer}
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {/* <Box sx={{ height: `60px` }} /> */}
                    {drawer}
                </MiniDrawerStyled>
            )}
        </Box>
    );
};

export default memo(Sidebar);
