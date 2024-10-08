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
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import Available from '../../../assets/images/svgIcons/available.svg';
import NotAllowed from '../../../assets/images/svgIcons/notAllowed.svg';
import AvailableWhite from '../../../assets/images/svgIcons/availableWhite.svg';
import BRButton from 'ui-component/bizreply/BRButton';
import GradinentText from 'ui-component/GradinentText';
// import { callOthers } from 'features/project/projectActions';

// const plansDev = [
//     {
//         active: false,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Solopreneur Plan',
//         type: 'Month',
//         description: 'Monthly Deal',
//         price: 49,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//         plan_id: 1,
//         product: 'prod_QcQz1eRj0C3Ibp',
//         id: 'price_1PlC7dDku3fWB0uA1Ka6T62i',
//         stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
//     },
//     {
//         active: false,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Startup Plan',
//         type: 'Month',
//         description: 'Monthly Deal',
//         price: 99,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//         plan_id: 2,
//         product: 'prod_QcR0SMlSjbppbT',
//         id: 'price_1PlC8EDku3fWB0uA9uOByAUW',
//         stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
//     },
//     {
//         active: true,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Agency Plan',
//         type: 'Month',
//         description: 'Monthly Deal',
//         price: 249,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         plan_id: 3,
//         product: 'prod_QcR0DJDmXAVIOT',
//         id: 'price_1PlC8qDku3fWB0uALzWDJx0G',
//         stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
//     }
// ];

const plans = [
    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Solopreneur Plan',
        type: 'Month',
        description: 'Monthly Deal',
        price: 49,
        permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        plan_id: 1,
        product: 'prod_QgpkQ3Dhjw9IJM',
        id: 'price_1PpS5LDku3fWB0uA4M3Ury7S',
        stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
    },
    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Startup Plan',
        type: 'Month',
        description: 'Monthly Deal',
        price: 99,
        permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        plan_id: 2,
        id: 'price_1PpSAODku3fWB0uAbRqPcp32',
        product: 'prod_QgpqDd5MvTFH6A',
        stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
    },
    {
        active: true,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Agency Plan',
        type: 'Month',
        description: 'Monthly Deal',
        price: 249,
        permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        plan_id: 3,
        id: 'price_1PpSAYDku3fWB0uAGNogzABb',
        product: 'prod_QgpqSL1PCKHByY',
        stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
    }
];

const planList = [
    [
        '5 Keywords Track',
        '200 AI Replies/Month',
        '50,000 Mentions',
        'Reddit, X, Linkedin & Quora',
        '1 Brand Projects',
        '1 Team Member (Coming)',
        '1 Year History Storage',
        'Bring Your Own API Key',
        'Multi-Language',
        'Custom-Prompts (Coming)',
        'Client Report Builder'
    ],
    [
        '25 Keywords Track',
        '500 AI Replies/Month',
        '150,000 Mentions',
        'Reddit, X, Linkedin & Quora',
        '5 Brand Projects',
        '3 Team Members (Coming)',
        '2 Year History Storage',
        'Bring Your Own API Key',
        'Multi-Language',
        'Custom Prompts (Coming)',
        'Client Report Builder'
    ],
    [
        '100 Keywords Track',
        'Unlimited Replies/Month',
        '450,000 Mentions',
        'Reddit, X, LinkedIn & Quora',
        '20 Brand Projects',
        '10 Team Members (Coming)',
        '2 Year History Storage',
        'Bring Your GPT API Key',
        'Multi-Language',
        'Custom-Prompts (Coming)',
        'Client Report Builder (5000 p)'
    ]
];
// const selectedPlans = [
//     'https://gv-reddit.netlify.app',
//     'https://app.bizreply.co',
//     'https://rebizreply.netlify.app',
//     'https://stagedbizreply.netlify.app'
// ].includes(window.location.origin)
//     ? plans
//     : plansDev;

const MonthlyPlans = () => {
    // const { subscription } = useSelector((s) => s.subscription);
    // console.log(subscription, 'subscription');
    const { dbUser, getAccessToken } = useAuth();

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
                    email: dbUser.email,
                    mode: 'subscription'
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const url = response?.url;
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

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mx: 'auto' }}>
            <Grid
                container
                sx={
                    {
                        // maxWidth: '700px'
                    }
                }
            >
                <>
                    {plans?.map?.((plan, index) => {
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
                                        backgroundImage: plan.active ? 'linear-gradient(90deg, #0C22E5 0%, #2A98D5 100%)' : '#fff',
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
                                                        <ListItem style={{ marginTop: '2px' }}>
                                                            {plan.permission.includes(i) ? (
                                                                <img src={plan.active ? AvailableWhite : Available} alt="Available" />
                                                            ) : (
                                                                <img src={NotAllowed} alt="Available" />
                                                            )}
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
                                                    }}
                                                    sx={{
                                                        borderRadius: '50px',
                                                        width: '100%',
                                                        color: '#000',
                                                        background: '#fff'
                                                    }}
                                                >
                                                    Buy Now
                                                </BRButton>
                                            ) : (
                                                <BRButton
                                                    disabled={price_Id}
                                                    onClick={() => {
                                                        createSession(plan.id);
                                                    }}
                                                    sx={{ borderRadius: '50px', width: '100%', color: '#fff' }}
                                                >
                                                    Buy Now
                                                </BRButton>
                                            )}
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                        );
                    })}
                </>
            </Grid>
        </Box>
    );
};

export default MonthlyPlans;
