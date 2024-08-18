/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import BizReplyConfig from 'BizReplyConfig';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'features/constant';

// assets
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
// import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone';
// import AirportShuttleTwoToneIcon from '@mui/icons-material/AirportShuttleTwoTone';
// import DirectionsBoatTwoToneIcon from '@mui/icons-material/DirectionsBoatTwoTone';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { ReactSession } from 'react-client-session';

// import BizReplyConfig from 'BizReplyConfig';
// import useAuth from 'hooks/useAuth';

import useAuth from 'hooks/useAuth';
import PaymentDashboard from './PaymentDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { cleanError, fetchPlans } from 'features/plan/plan';
import { fetchSubscription, cleanError as subsCleanError } from 'features/subscription/subscription';

const BASE_URL = BizReplyConfig.getNodeUrl();
const toCapitalize = (str = '') => {
    const first = str.charAt(0).toUpperCase();
    const rest = str.slice(1);
    return `${first}${rest}`;
};
const Subscription = () => {
    const dispatch = useDispatch();

    const { dbUser } = useAuth();
    const [, setFetchSubscribeData] = useState({
        // status: 'success'
        status: 'loading'
    });
    const { isLoading, plans, error, isError } = useSelector((state) => state.plan);
    const { isLoading: subLoading, subscription, subsErr, isErrorSubs } = useSelector((state) => state.subscription);
    // const fetchPrice = async () => {
    //     const { data: response } = await axios.get(`${BASE_URL}stripe/getPrices`, {
    //         headers: { Authorization: `Bearer ${ReactSession.get('token')}` }
    //     });
    //     console.log(response.prices.data);
    // };
    if (isError) {
        toast(error, { autoClose: 2500, type: 'warning' });
        dispatch(cleanError());
    }
    if (isErrorSubs) {
        toast(subsErr, { autoClose: 2500, type: 'warning' });
        dispatch(cleanError());
    }
    const fetchSubscribeFunc = async () => {
        try {
            const { data } = await axios.post(
                `${BASE_URL}stripe/checkSubscription`,
                {
                    email: dbUser.email
                },
                {
                    headers: { Authorization: `Bearer ${ReactSession.get('token')}` }
                }
            );
            const response = data.data;
            response.status = 'success';
            console.log(response);
            setFetchSubscribeData(response);
        } catch (err) {
            setFetchSubscribeData({ status: 'false' });
        }
    };
    const createSession = async (priceId) => {
        try {
            const { data: response } = await axios.post(
                `${BASE_URL}stripe/createSession`,
                {
                    priceId,
                    email: dbUser.email
                },
                {
                    headers: { Authorization: `Bearer ${ReactSession.get('token')}` }
                }
            );
            window.location.href = response.url;
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

    useEffect(() => {
        // fetchSubscribeFunc();
        // axios.get(`${BASE_URL}plans`).then(({ data }) => {
        // }).catch(err => {
        //     console.log(err)
        // })
        const token = ReactSession.get('token');
        if (token) {
            dispatch(fetchPlans(token));
            dispatch(fetchSubscription({ accessToken: token, email: dbUser.email }));
        }
    }, []);
    return (
        <Box sx={{ height: '100%' }}>
            {(isLoading || subLoading) && (
                <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {(!isLoading || !subLoading) && (
                <>
                    {subscription?.havePlan && subscription?.current_period_end && subscription?.current_period_end > new Date() ? (
                        <PaymentDashboard fetchSubscribeData={subscription} dbUser={dbUser} />
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid container spacing={gridSpacing} sx={{ maxWidth: '700px' }}>
                                <>
                                    {plans?.map?.((plan, index) => {
                                        const darkBorder =
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.background.default
                                                : theme.palette.primary[200] + 75;
                                        return (
                                            <Grid item xs={12} sm={12} md={6} key={index}>
                                                <MainCard
                                                    boxShadow
                                                    sx={{
                                                        pt: 1.75,
                                                        border: plan.active ? '2px solid' : '1px solid',
                                                        borderColor: plan.active ? 'secondary.main' : darkBorder,
                                                        maxWidth: '340px'
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
                                                                <Avatar
                                                                    src={plan.icon ?? 'macroDM.png'}
                                                                    sx={{ bgcolor: 'white', width: 50, height: 50 }}
                                                                />
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
                                                                {(plan?.type && <span>/{toCapitalize(plan.type).slice(0, -2)}</span>) || ''}
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
                                                                {plan.facilities?.map?.((list, i) => (
                                                                    <React.Fragment key={i}>
                                                                        <ListItem sx={!plan.permission.includes(i) ? priceListDisable : {}}>
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
                    )}
                </>
            )}
            {/* Toastify container */}

            <ToastContainer position="bottom-right" autoClose={2000} />
        </Box>
    );
};

export default Subscription;
