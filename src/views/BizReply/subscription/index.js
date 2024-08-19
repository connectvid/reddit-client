/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'features/constant';

import useAuth from 'hooks/useAuth';
import PaymentDashboard from './PaymentDashboard';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import Available from '../../../assets/images/svgIcons/available.svg';
import NotAllowed from '../../../assets/images/svgIcons/notAllowed.svg';
import AvailableWhite from '../../../assets/images/svgIcons/availableWhite.svg';
import BRButton from 'ui-component/bizreply/BRButton';
import GradinentText from 'ui-component/GradinentText';
import { useSelector } from 'react-redux';
// import { callOthers } from 'features/project/projectActions';

const plansDev = [
    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Solopreneur Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 49,
        permission: [0, 1, 2, 3, 4, 5, 6, 7],
        plan_id: 1,
        product: 'prod_QcQz1eRj0C3Ibp',
        id: 'price_1PlC7dDku3fWB0uA1Ka6T62i',
        planId: '66b39c624d7b309cb5a7d32f',
        stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
    },
    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Startup Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 99,
        permission: [0, 1, 2, 3, 4, 5, 6, 7],
        plan_id: 2,
        product: 'prod_QcR0SMlSjbppbT',
        id: 'price_1PlC8EDku3fWB0uA9uOByAUW',
        planId: '66b39c624d7b309cb5a7d330',
        stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
    },
    {
        active: true,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Agency Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 249,
        permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        plan_id: 3,
        product: 'prod_QcR0DJDmXAVIOT',
        id: 'price_1PlC8qDku3fWB0uALzWDJx0G',
        planId: '66b39c624d7b309cb5a7d331',
        stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
    }
];

const plans = [
    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Solopreneur Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 49,
        permission: [0, 1, 2, 3, 4, 5, 6, 7],
        plan_id: 1,
        product: 'prod_Qava0JlfF41pNh',
        id: 'price_1Pjjj2Dku3fWB0uA5ZrHPfcy',
        planId: '66b39c624d7b309cb5a7d332',
        stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
    },
    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Startup Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 99,
        permission: [0, 1, 2, 3, 4, 5, 6, 7],
        plan_id: 2,
        id: 'price_1PjjutDku3fWB0uAsDq13Hg8',
        planId: '66b39c624d7b309cb5a7d333',
        product: 'prod_QavmbQShCaPyRj',
        stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
    },
    {
        active: true,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Agency Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 249,
        permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        plan_id: 3,
        id: 'price_1PjjvTDku3fWB0uA7GoaIaVn',
        planId: '66b39c624d7b309cb5a7d334',
        product: 'prod_QavnUqEY4bSjcu',
        stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
    }
];

const planList = [
    [
        '5 Keywords Track',
        '200 AI Replies/Month',
        '30,000 Mentions',
        'Reddit, X & Linkedin',
        '3 Brand Projects',
        '1 Team Member',
        '1 Year History Storage',
        'No API Key Needed',
        'Custom Prompts (Coming)',
        'Multi Language (Coming)'
    ],
    [
        '15 Keywords Track',
        '500 AI Replies/Month',
        '120,000 Mentions',
        'Reddit, X & Linkedin',
        '10 Brand Projects',
        '3 Team Members',
        '2 Year History Storage',
        'No API Key Needed',
        'Custom Prompts (Coming)',
        'Multi Language (Coming)'
    ],
    [
        '50 Keywords Track',
        'Unlimited Replies/Month',
        '300,000 Mentions',
        'Reddit, X, LinkedIn & Quora',
        '30 Brand Projects',
        '10 Team Members',
        '2 Year History Storage',
        'Bring Your GPT API Key',
        'Custom Prompts (Coming)',
        'Multi Language (Coming)'
    ]
];
const selectedPlans = [
    'https://gv-reddit.netlify.app',
    'https://app.bizreply.co' //, 'https://rebizreply.netlify.app'
].includes(window.location.origin)
    ? plans
    : plansDev;

const Subscription = () => {
    const { subscription } = useSelector((s) => s.subscription);
    console.log(subscription, 'subscription');
    const { dbUser, getAccessToken } = useAuth();
    const [
        fetchSubscribeData // setFetchSubscribeData
    ] = React.useState({
        status: 'success'
    });
    const [
        price_Id,
        setPrice_Id // setFetchSubscribeData
    ] = React.useState(null);
    React.useEffect(() => {
        if (!dbUser?.email) return;
        if (window.tolt_referral) {
            window.tolt.signup(dbUser?.email);
        }
    }, [dbUser?.email]);
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
    // const priceListDisable = {
    //     opacity: '0.4',
    //     '& >div> svg': {
    //         fill: theme.palette.secondary.light
    //     }
    // };

    return (
        <Box sx={{ height: '100%' }}>
            <Typography sx={{ mb: 3, fontSize: '25px', fontWeight: '700' }}>Subscription</Typography>
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
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mx: 'auto' }}>
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
                                            return (
                                                <Grid item xs={12} sm={12} md={12} sx={{ mb: { md: 4, sm: 3, xs: 2 } }} lg={4} key={index}>
                                                    {plan.active && (
                                                        <Box>
                                                            <Button
                                                                style={{
                                                                    width: '50%',
                                                                    marginLeft: '25%',
                                                                    marginTop: '-30px',
                                                                    background: '#fff',
                                                                    borderRadius: '50px',
                                                                    padding: '10px 20px'
                                                                }}
                                                            >
                                                                <GradinentText sx={{ fontSize: '18px' }}>Most Popular</GradinentText>
                                                            </Button>
                                                        </Box>
                                                    )}
                                                    <MainCard
                                                        sx={{
                                                            pt: 1.75,
                                                            border: 'none',
                                                            backgroundImage: plan.active
                                                                ? 'linear-gradient(90deg, #0C22E5 0%, #2A98D5 100%)'
                                                                : '#fff',
                                                            color: plan.active ? '#fff' : '#000',
                                                            maxWidth: '90%',
                                                            mx: 'auto'
                                                        }}
                                                        style={{
                                                            marginTop: plan.active ? '-20px' : '0px'
                                                        }}
                                                    >
                                                        <Grid container textAlign="center" spacing={gridSpacing}>
                                                            <Grid item xs={12}>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontSize: '24px',
                                                                        fontWeight: 700,
                                                                        textAlign: 'left',
                                                                        color: plan.active ? '#fff' : '#000'
                                                                    }}
                                                                >
                                                                    {plan.title}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                sx={{
                                                                    // fontSize: '24px',
                                                                    // fontWeight: 700,
                                                                    textAlign: 'left',
                                                                    marginTop: '-22px'
                                                                }}
                                                            >
                                                                <Typography variant="body2" sx={{ color: plan.active ? '#fff' : '#000' }}>
                                                                    ({plan.description})
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography
                                                                    component="div"
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontSize: '2.1875rem',
                                                                        fontWeight: 700,
                                                                        color: plan.active ? '#fff' : '#000',
                                                                        textAlign: 'left',
                                                                        marginTop: '-15px'
                                                                    }}
                                                                >
                                                                    <sup>$</sup>
                                                                    {plan.price}
                                                                </Typography>
                                                            </Grid>
                                                            <Box
                                                                style={{
                                                                    width: '92%',
                                                                    marginLeft: '8%',
                                                                    marginTop: '10px',
                                                                    marginBottom: '-10px',
                                                                    height: '1px',
                                                                    background: plan.active ? '#fff' : '#000'
                                                                }}
                                                            />
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
                                                                        },
                                                                        minHeight: '330px'
                                                                    }}
                                                                    component="ul"
                                                                >
                                                                    {planList[index].map((list, i) => (
                                                                        <React.Fragment key={i}>
                                                                            <ListItem
                                                                                style={{ marginTop: '2px' }}
                                                                                // sx={!plan.permission.includes(i) ? priceListDisable : {}}
                                                                            >
                                                                                {plan.permission.includes(i) ? (
                                                                                    <img
                                                                                        src={plan.active ? AvailableWhite : Available}
                                                                                        alt="Available"
                                                                                    />
                                                                                ) : (
                                                                                    <img src={NotAllowed} alt="Available" />
                                                                                )}
                                                                                {/* <img
                                                                                    src={plan.active ? AvailableWhite : Available}
                                                                                    alt="Available"
                                                                                /> */}
                                                                                <span
                                                                                    style={{
                                                                                        marginLeft: '10px',
                                                                                        color: plan.active ? '#fff' : '#000'
                                                                                    }}
                                                                                >
                                                                                    {list}
                                                                                </span>
                                                                            </ListItem>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </List>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                {plan.active ? (
                                                                    <BRButton
                                                                        disabled={price_Id}
                                                                        onClick={() => {
                                                                            createSession(plan.id);
                                                                            // window.location.href = plan.stripePayLink;
                                                                        }}
                                                                        sx={{
                                                                            borderRadius: '50px',
                                                                            width: '100%',
                                                                            color: '#000',
                                                                            background: '#fff'
                                                                        }}
                                                                    >
                                                                        {plan.planId === subscription?.planId ? 'Subscribed' : 'Buy Now'}
                                                                    </BRButton>
                                                                ) : (
                                                                    <BRButton
                                                                        disabled={price_Id}
                                                                        onClick={() => {
                                                                            createSession(plan.id);
                                                                            // window.location.href = plan.stripePayLink;
                                                                        }}
                                                                        sx={{ borderRadius: '50px', width: '100%', color: '#fff' }}
                                                                    >
                                                                        {plan.planId === subscription?.planId ? 'Subscribed' : 'Buy Now'}
                                                                    </BRButton>
                                                                )}

                                                                {/* <Button
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
                                                                </Button> */}
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
