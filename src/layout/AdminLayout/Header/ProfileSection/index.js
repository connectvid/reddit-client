/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
// import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';
import useConfig from 'hooks/useConfig';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import { toast, ToastContainer } from 'react-toastify';
import BizReplyConfig from 'BizReplyConfig';

const BASE_URL = BizReplyConfig.getNodeUrl();
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { logout, user } = useAuth();
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    // Send Feedback
    const [feedback, setFeedback] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { twitter } = useAuth();
    const sendFeedback = () => {
        // TODO : Change this to MacroDM api
        setIsSending(true);
        axios
            .post(
                `${BASE_URL}feedback`,
                {
                    from: 'macrodm',
                    email: twitter.email,
                    uid: twitter.uid,
                    feedback
                },
                {
                    headers: { Authorization: `Bearer ${ReactSession.get('token')}` }
                }
            )
            .then((res) => {
                console.log('🚀 ~ file: index.js ~ line 84 ~ sendFeedback ~ res', res);
                if (res.data.acknowledged) {
                    toast('Thanks for your feedback.', { autoClose: 2500, type: 'success' });
                } else {
                    toast('Something went wrong.', { autoClose: 2500, type: 'error' });
                }
            })
            .catch((err) => {
                console.error('got an error sending feedback:\n', err);
                toast('Something went wrong.', { autoClose: 2500, type: 'error' });
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={user ? user.image : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />

            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography variant="h4">Good Morning,</Typography>
                                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                        {user?.name}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="subtitle2">Captain 😎</Typography>
                                            </Stack>
                                            {/* <OutlinedInput
                                                sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                                                id="input-search-profile"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                                placeholder="Search profile options"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                                    </InputAdornment>
                                                }
                                                aria-describedby="search-helper-text"
                                                inputProps={{
                                                    'aria-label': 'weight'
                                                }}
                                            /> */}
                                            <Divider />
                                        </Box>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                {/* TODO: ADD TWITTER_USER CARD INSTAD OF UpgradePlanCard */}
                                                {/* <UpgradePlanCard /> */}
                                                <Divider />

                                                {/* TODO: uncomment & get btn for day & night mode */}
                                                {/* <Card
                                                    sx={{
                                                        bgcolor:
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.dark[800]
                                                                : theme.palette.primary.light,
                                                        my: 2
                                                    }}
                                                >
                                                    <CardContent>
                                                        <Grid container spacing={3} direction="column">
                                                            <Grid item>
                                                                <Grid item container alignItems="center" justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1">Start DND Mode</Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Switch
                                                                            color="primary"
                                                                            checked={sdm}
                                                                            onChange={(e) => setSdm(e.target.checked)}
                                                                            name="sdm"
                                                                            size="small"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid item container alignItems="center" justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1">Allow Notifications</Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Switch
                                                                            checked={notification}
                                                                            onChange={(e) => setNotification(e.target.checked)}
                                                                            name="sdm"
                                                                            size="small"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                                <Divider /> */}
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '/settings')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                    </ListItemButton>
                                                    {/* <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 1}
                                                        onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconUser stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Grid container spacing={1} justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="body2">Social Profile</Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Chip
                                                                            label="02"
                                                                            size="small"
                                                                            sx={{
                                                                                bgcolor:
                                                                                    theme.palette.mode === 'dark'
                                                                                        ? theme.palette.dark.dark
                                                                                        : theme.palette.warning.dark,
                                                                                color: theme.palette.background.default
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        />
                                                    </ListItemButton> */}
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                    </ListItemButton>

                                                    <Divider sx={{ my: 2 }} />

                                                    <TextField
                                                        fullWidth
                                                        label="Write feedback1"
                                                        size="small"
                                                        multiline
                                                        minRows={6}
                                                        onChange={(e) => setFeedback(e.target.value)}
                                                    />
                                                    <br />
                                                    <Button
                                                        sx={{ mt: 1 }}
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={sendFeedback}
                                                        disabled={isSending}
                                                        // variant='outlined'
                                                    >
                                                        {isSending ? 'Sending...' : 'Send Feedback'}
                                                    </Button>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>

            {/* Toastify container */}
            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    );
};

export default ProfileSection;
