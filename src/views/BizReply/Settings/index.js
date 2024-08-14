/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Avatar, Button, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import useAuth from 'hooks/useAuth';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { SUBSCRIPTION_PATH } from 'config';
// ==============================|| SETTINGS PAGE ||============================== //

const Settings = () => {
    const navigate = useNavigate();
    const { twitter, dbUser, isExpired } = useAuth();
    const { subscription } = useSelector((state) => state.subscription);
    const repliesCredits = subscription?.remainingCredit;
    console.log({ subscription });
    // replies
    // const [plan, setPlan] = useState({
    //     title: '',
    //     description: ''
    // });
    // const [subscribeInfo, setSubscribeInfo] = useState();
    const plan = {
        title: `You are on ${subscription?.type}`,
        description: ''
    };
    // if (dbUser?.selectedPlan === 'trial') {
    //     plan = {
    //         // title: `You are ${subscription?.type}!`,
    //         expiry: subscription?.expire ? new Date(subscription?.expire) > Date.now() : `Trial has been expired!`
    //     };
    // } else {
    //     plan = {
    //         // title: `You are choosing ${subscription?.type} plan!`,
    //         expiry: subscription?.expire ? new Date(subscription?.expire) > Date.now() : `${subscription?.type} `
    //     };
    // }

    const theme = useTheme();

    return (
        <MainCard sx={{ minHeight: '100%' }}>
            {/* <BRButton fullWidth variant="contained">
                ClickMe
            </BRButton> */}
            <Typography variant="h3">Settings</Typography>
            <Box
                sx={{
                    background: '#F1F5FB',
                    p: 3,
                    mt: 4,
                    borderRadius: '10px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}
                >
                    <Avatar src={twitter?.photoUrl || dbUser?.profileIMG} variant="rounded" sx={{ height: 54, width: 54 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4">{dbUser.name}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ mt: 3, mb: 2 }} />

                <Typography sx={{ color: '#B7BFC8' }}>Email:</Typography>
                <Typography variant="h4" sx={{ fontWeight: 500 }} color={theme.palette.grey[700]}>
                    {dbUser.email}
                </Typography>
            </Box>
            <Typography color={theme.palette.grey[500]} sx={{ mt: 5, mb: 2 }}>
                Subscription :
            </Typography>

            <Box
                sx={{
                    background: '#F1F5FB',
                    p: 3,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    borderRadius: 2,
                    width: '100%'
                }}
            >
                {/* selectedPlan,  */}
                <Avatar src="logo-only.png" variant="rounded" sx={{ height: 53, width: 53, background: 'white', p: '5px' }} />
                <Box>
                    <Typography
                        sx={{
                            color: theme.palette.grey[600],
                            fontWeight: 500
                        }}
                    >
                        {/* {isExpired === true || (dbUser?.endDate && new Date(dbUser.endDate) < Date.now())
                            ? 'Subscription/Trial Expired.'
                            : plan?.title} */}
                        {plan?.title}
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.grey[900]
                        }}
                    >
                        <string>Expiry:</string> {subscription?.expire ? moment(subscription?.expire).format('YYYY-MM-DD, HH:ss') : ''}
                    </Typography>
                </Box>
                {subscription?.expire && moment(subscription?.expire).valueOf > Date.now() ? (
                    ``
                ) : (
                    <Typography
                        sx={{
                            color: theme.palette.grey[400],
                            marginLeft: 'auto',
                            marginRight: '0'
                        }}
                    >
                        <Button onClick={() => navigate(SUBSCRIPTION_PATH)} variant="outlined">
                            Subscribe Now
                        </Button>
                    </Typography>
                )}
            </Box>
        </MainCard>
    );
};

export default Settings;
