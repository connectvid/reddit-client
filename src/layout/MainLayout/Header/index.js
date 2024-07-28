/* eslint-disable react/no-children-prop */
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'features/menu/menuSlice';

// assets
import { IconArrowLeft } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import { useLocation } from 'react-router-dom';

// import { CopyAll } from '@mui/icons-material';

const Header = () => {
    const { pathname } = useLocation();
    const { dbUser } = useAuth();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const { loading, projects } = useSelector((state) => state.project);
    // let btnTxt = '';
    // if (pathname?.includes?.(DASHBOARD_PATH)) {
    //     btnTxt = URL_TO_TITLE[DASHBOARD_PATH];
    // } else if (pathname?.includes?.(SUBSCRIPTION_PATH)) {
    //     btnTxt = URL_TO_TITLE[SUBSCRIPTION_PATH];
    // } else if (pathname?.includes?.(SETTING_PATH)) {
    //     btnTxt = URL_TO_TITLE[SETTING_PATH];
    // }
    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection width={180} />
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                        '&:hover': {
                            background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                        }
                    }}
                    onClick={() => dispatch(openDrawer(!drawerOpen))}
                    color="inherit"
                >
                    {/* <IconMenu2 stroke={1.5} size="1.3rem" /> */}
                    <IconArrowLeft style={{ transform: `rotate(${drawerOpen ? `` : '18'}0deg)` }} />
                </Avatar>
            </Box>
            <Box
                sx={{
                    // width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                {projects?.map?.(({ _id, brandName }) => (
                    <Box key={_id} component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                        {brandName}
                    </Box>
                ))}
            </Box>

            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Box sx={{ marginRight: 1, flexGrow: 1, pl: 2 }} />
            {/* <Box sx={{ marginRight: 1, display: { sm: 'none', md: 'block', lg: 'block' }, flexGrow: 1, pl: 2 }}>
                <Button variant="outlined" style={{ background: DEFAULT_BUTTON_COLOR_CODE, color: '#fff' }}>
                    {btnTxt}
                </Button>
            </Box> */}
            {/* <Box sx={{ marginRight: 1, display: { sm: 'none', md: 'block', lg: 'block' } }}>
                <ExtensionLink sx={{ fontSize: { md: 17, lg: 24 } }} />
            </Box> */}
            {/* <Box
                sx={{
                    marginRight: 1,
                    bgcolor: '#E3F2FD',
                    padding: '2px 15px 2px 0',
                    borderRadius: 5,
                    display: { sm: 'flex', xs: 'none' },
                    position: 'relative'
                }}
            >
                <Typography component="div" sx={{ display: 'flex', alignItems: 'center', padding: '7px 0px 7px 19px' }}>
                    {extensionCode}
                    <CopyToClipboard
                        style={{ margin: 0 }}
                        text={extensionCode}
                        onCopy={() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1200);
                        }}
                    >
                        <Button sx={{ margin: 0, padding: 0, minWidth: '30px' }}>
                            <IconCopy />
                        </Button>
                    </CopyToClipboard>
                </Typography>
                {(copied && (
                    <Typography
                        sx={{
                            position: 'absolute',
                            margin: '0 auto',
                            bottom: -30,
                            background: 'rgba(0,0,0,0.7)',
                            color: '#fff',
                            padding: '5px 12px',
                            right: 0,
                            borderRadius: '3px'
                        }}
                    >
                        Coppied Code!
                    </Typography>
                )) ||
                    ''}
            </Box> */}
            {/* <Box sx={{ marginRight: 1 }}>
                <Button
                    variant="contained"
                    // eslint-disable-next-line no-unneeded-ternary
                    startIcon={<IconBrandTwitter />}
                    onClick={() => {
                        // if (twitter?.isAuthenticated || dbUser?.status === 'Active') return;
                        twitterAuthentication();
                    }}
                >
                    {twitter?.isAuthenticated || dbUser?.status === 'Active' ? 'Authenticated' : 'Authentication'}
                </Button>
            </Box> */}

            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

export default Header;
