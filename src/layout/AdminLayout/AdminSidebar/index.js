/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { openDrawer } from 'features/menu/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { drawerWidth } from 'features/constant';
// import ScheduleModal from './ScheduleModal';
// import useTweets from 'hooks/useTweets';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ window }) => {
    // const { isModalOpen, setIsModalOpen } = useTweets();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    // 🛠Modified by FoysalBN
    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const logo = useMemo(
        () => (
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
        ),
        []
    );

    const drawer = useMemo(
        () => (
            <PerfectScrollbar
                component="div"
                style={{
                    height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    postition: 'relative'
                }}
            >
                <MenuList />
                {/* <MenuCard /> */}
                {/* <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
                    <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
                </Stack> */}
            </PerfectScrollbar>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchUpMd]
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={() => dispatch(openDrawer(!drawerOpen))}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawerOpen && logo}
                {drawerOpen && drawer}
            </Drawer>

            {/* 🛠Modified by FoysalBN */}
            {/* <Button
                variant="contained"
                color="secondary"
                startIcon={<BorderColorIcon />}
                sx={{
                    position: 'fixed',
                    bottom: '1em',
                    right: '1em',
                    zIndex: '100'
                }}
                onClick={() => setIsModalOpen(true)}
            >
                Schedule Tweet
            </Button>
            <ScheduleModal /> */}
        </Box>
    );
};

Sidebar.propTypes = {
    window: PropTypes.object
};

export default memo(Sidebar);
