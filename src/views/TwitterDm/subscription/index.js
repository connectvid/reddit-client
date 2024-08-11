/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
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
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'features/constant';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import useAuth from 'hooks/useAuth';
import PaymentDashboard from './PaymentDashboard';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
// import { callOthers } from 'features/project/projectActions';

const plansDev = [
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'One-Time',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 49,
        permission: [0, 1, 2, 3, 4, 5, 6],
        plan_id: 1,
        product: 'prod_QcQz1eRj0C3Ibp',
        id: 'price_1PlC7dDku3fWB0uA1Ka6T62i',
        stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
    },
    {
        active: true,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'One-Time',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 99,
        permission: [0, 1, 2, 3, 4, 5, 6],
        plan_id: 2,
        product: 'prod_QcR0SMlSjbppbT',
        id: 'price_1PlC8EDku3fWB0uA9uOByAUW',
        stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
    },
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'One-Time',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 249,
        permission: [0, 1, 2, 3, 4, 5, 6, 7],
        plan_id: 3,
        product: 'prod_QcR0DJDmXAVIOT',
        id: 'price_1PlC8qDku3fWB0uALzWDJx0G',
        stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
    }
];

const plans = [
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'One-Time',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 49,
        permission: [0, 1, 2, 3, 4, 5, 6],
        plan_id: 1,
        product: 'prod_Qava0JlfF41pNh',
        id: 'price_1Pjjj2Dku3fWB0uA5ZrHPfcy',
        stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
    },
    {
        active: true,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'One-Time',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 99,
        permission: [0, 1, 2, 3, 4, 5, 6],
        plan_id: 2,
        id: 'price_1PjjutDku3fWB0uAsDq13Hg8',
        product: 'prod_QavmbQShCaPyRj',
        stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
    },
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'One-Time',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 249,
        permission: [0, 1, 2, 3, 4, 5, 6, 7],
        plan_id: 3,
        id: 'price_1PjjvTDku3fWB0uA7GoaIaVn',
        product: 'prod_QavnUqEY4bSjcu',
        stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
    }
];

const planList = [
    [
        '5 Keywords Track',
        '50 AI Replies/Month',
        '3 Projects',
        'Reddit, X & Linkedin',
        'Analytics (Coming)',
        'Integrations (Coming)',
        'Prority Support (Coming)'
    ],
    [
        '20 Keywords Track',
        '200 AI Replies/Month',
        '10 Projects',
        'Reddit, X & Linkedin',
        'Analytics (Coming)',
        'Integrations (Coming)',
        'Prority Support (Coming)'
    ],
    [
        '200 Keywords Track',
        'Unlimited AI Replies/Month',
        '50 Projects',
        'Reddit, X & Linkedin',
        'Analytics (Coming)',
        'Integrations (Coming)',
        'Prority Support (Coming)',
        'Bring Your GPT API Key'
    ]
];
const selectedPlans = ['https://gv-reddit.netlify.app', 'https://app.bizreply.co'].includes(window.location.origin) ? plans : plansDev;

const Subscription = () => {
    const { dbUser, getAccessToken } = useAuth();
    const [
        fetchSubscribeData // setFetchSubscribeData
    ] = useState({
        status: 'success'
    });
    const [
        price_Id,
        setPrice_Id // setFetchSubscribeData
    ] = useState(null);
    const createSession = async (priceId) => {
        if (!priceId) {
            return 0;
        }
        setPrice_Id(priceId);
        const token = await getAccessToken();
        console.log('creating session');
        try {
            const { data: response } = await axios.post(
                `subscriptions/stripe/payment-with-auth`,
                {
                    priceId,
                    email: dbUser.email
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const url = response?.url;
            // console.log(response.session, 123, response, url);
            window.location.href = url;
        } catch (e) {
            toast('something went wrong , please try again or contact us at hey@TwitterDm.io', {
                autoClose: 5000,
                type: 'warning'
            });
        } finally {
            setPrice_Id(null);
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
            {/* <button onClick={() => callOthers({ types: ['replies'], values: { replies: -1 } })()}>Call Me</button> */}

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
                                        {selectedPlans.map((plan, index) => {
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
                                                                    ${plan.price} {plan.title}
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
                                                                    {/* <span>/{plan.type}</span> */}
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
                                                                <Button
                                                                    variant="outlined"
                                                                    disabled={price_Id}
                                                                    onClick={() => {
                                                                        createSession(plan.id);
                                                                        // window.location.href = plan.stripePayLink;
                                                                    }}
                                                                >
                                                                    Buy
                                                                    {price_Id === plan.id ? (
                                                                        <CircularProgress sx={{ maxWidth: 16, maxHeight: 16, ml: 1 }} />
                                                                    ) : (
                                                                        ''
                                                                    )}
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
        </Box>
    );
};

export default Subscription;
