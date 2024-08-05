/* eslint-disable consistent-return */
import React, { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'features/constant';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from 'hooks/useAuth';
import PaymentDashboard from './PaymentDashboard';
import axios from 'utils/axios';

const plans = [
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Basic',
        type: 'Month',
        description: 'Get access to all basic TwitterDm features for the whole Month',
        price: 10,
        permission: [0],
        plan_id: 1,
        id: 'price_1PH0nSCx996FZZga2JQ2JFsd',
        product: 'prod_Q7FIRCKlFBNP8C'
    },
    {
        active: true,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Standard',
        type: 'Month',
        description: 'Get access to all standard TwitterDm features for the whole Month',
        price: 25,
        permission: [0],
        plan_id: 2,
        id: 'price_1PH0o2Cx996FZZga07qUoH4B',
        product: 'prod_Q7FIB6UmqooAv0'
    },
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Premium',
        type: 'Month',
        description: 'Get access to all premium TwitterDm Features for the whole Month',
        price: 55,
        permission: [0],
        plan_id: 3,
        id: 'price_1PH0odCx996FZZgaeOzSIThq',
        product: 'prod_Q7FJLJLNf5osCf'
    }
];

const planList = [
    ['100 credits', 'Export Leads to CSV'],
    ['500 credits', 'Export Leads to CSV'],
    ['2000 credits', 'Export Leads to CSV']
];

const Subscription = () => {
    const { dbUser, getAccessToken } = useAuth();
    const [fetchSubscribeData, setFetchSubscribeData] = useState({
        status: 'success'
    });
    const createSession = async (priceId) => {
        console.log('function called');
        if (!priceId) {
            return 0;
        }
        const token = await getAccessToken();
        console.log('creating session');
        try {
            const { data: response } = await axios.post(
                `stripe/createSession`,
                {
                    priceId,
                    email: dbUser.email
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const url = response?.session?.url;
            // console.log(response.session, 123, response, url);
            window.location.href = url;
        } catch (e) {
            toast('something went wrong , please try again or contact us at hey@TwitterDm.io', {
                autoClose: 5000,
                type: 'warning'
            });
        }
    };

    const theme = useTheme();
    const priceListDisable = {
        opacity: '0.4',
        '& >div> svg': {
            fill: theme.palette.secondary.light
        }
    };

    return (
        <Box sx={{ height: '100%', mt: 3 }}>
            {/* {fetchSubscribeData.status === 'loading' && (
                <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )} */}

            {fetchSubscribeData.status === 'success' && (
                <>
                    {fetchSubscribeData?.havePlan &&
                    fetchSubscribeData?.current_period_end &&
                    fetchSubscribeData?.current_period_end > new Date() ? (
                        <PaymentDashboard fetchSubscribeData={fetchSubscribeData} dbUser={dbUser} />
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', mx: 'auto' }}>
                                <Grid
                                    container
                                    // spacing={gridSpacing}
                                    sx={
                                        {
                                            // maxWidth: '700px'
                                        }
                                    }
                                >
                                    <>
                                        {plans.map((plan, index) => {
                                            const darkBorder =
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.default
                                                    : theme.palette.primary[200] + 75;
                                            return (
                                                <Grid item xs={12} sm={12} md={12} sx={{ mb: { md: 4, sm: 3, xs: 2 } }} lg={4} key={index}>
                                                    <MainCard
                                                        sx={{
                                                            pt: 1.75,
                                                            border: plan.active ? '2px solid' : '1px solid',
                                                            borderColor: plan.active ? 'secondary.main' : darkBorder,
                                                            // maxWidth: '340px'
                                                            maxWidth: '90%',
                                                            mx: 'auto'
                                                        }}
                                                    >
                                                        <Grid container textAlign="center" spacing={gridSpacing}>
                                                            <Grid item xs={12}>
                                                                <Box
                                                                    sx={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        borderRadius: '50%',
                                                                        width: 80,
                                                                        height: 80,
                                                                        background:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark[800]
                                                                                : theme.palette.primary.light,
                                                                        color: theme.palette.primary.main,
                                                                        '& > svg': {
                                                                            width: 35,
                                                                            height: 35
                                                                        }
                                                                    }}
                                                                >
                                                                    {plan.icon}
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontSize: '1.5625rem',
                                                                        fontWeight: 500,
                                                                        position: 'relative',
                                                                        mb: 1.875,
                                                                        '&:after': {
                                                                            content: '""',
                                                                            position: 'absolute',
                                                                            bottom: -15,
                                                                            left: 'calc(50% - 25px)',
                                                                            width: 50,
                                                                            height: 4,
                                                                            background: theme.palette.primary.main,
                                                                            borderRadius: '3px'
                                                                        }
                                                                    }}
                                                                >
                                                                    {plan.title}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="body2">{plan.description}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography
                                                                    component="div"
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontSize: '2.1875rem',
                                                                        fontWeight: 700,
                                                                        '& > span': {
                                                                            fontSize: '1.25rem',
                                                                            fontWeight: 500
                                                                        }
                                                                    }}
                                                                >
                                                                    <sup>$</sup>
                                                                    {plan.price}
                                                                    <span>/{plan.type}</span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <List
                                                                    sx={{
                                                                        m: 0,
                                                                        p: 0,
                                                                        '&> li': {
                                                                            px: 0,
                                                                            py: 0.625,
                                                                            '& svg': {
                                                                                fill: theme.palette.success.dark
                                                                            }
                                                                        }
                                                                    }}
                                                                    component="ul"
                                                                >
                                                                    {planList[index].map((list, i) => (
                                                                        <React.Fragment key={i}>
                                                                            <ListItem
                                                                                sx={!plan.permission.includes(i) ? priceListDisable : {}}
                                                                            >
                                                                                <ListItemIcon>
                                                                                    <CheckTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                                                </ListItemIcon>
                                                                                <ListItemText primary={list} />
                                                                            </ListItem>
                                                                            <Divider />
                                                                        </React.Fragment>
                                                                    ))}
                                                                </List>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button variant="outlined" onClick={() => createSession(plan.id)}>
                                                                    Subscribe
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </MainCard>
                                                </Grid>
                                            );
                                        })}
                                    </>
                                </Grid>
                            </Box>
                        </>
                    )}
                </>
            )}
            {/* Toastify container */}

            <ToastContainer position="bottom-right" autoClose={2000} />
        </Box>
    );
};

export default Subscription;
