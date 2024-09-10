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
// import { toast } from 'react-toastify';
import Available from '../../../assets/images/svgIcons/available.svg';
import NotAllowed from '../../../assets/images/svgIcons/notAllowed.svg';
import AvailableWhite from '../../../assets/images/svgIcons/availableWhite.svg';
import BRButton from 'ui-component/bizreply/BRButton';
import GradinentText from 'ui-component/GradinentText';
import socket from 'socket';
import { subsctriptionSetter } from 'features/subscription/subscriptionActions';

// import { callOthers } from 'features/project/projectActions';

// const plansDev = [
//     // {
//     //     active: false,
//     //     icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//     //     title: 'Solopreneur Plan',
//     //     type: 'Month',
//     //     description: 'Lifetime Deal',
//     //     price: 49,
//     //     permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     //     plan_id: 1,
//     //     product: 'prod_QcQz1eRj0C3Ibp',
//     //     id: 'price_1PlC7dDku3fWB0uA1Ka6T62i',
//     //     stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl',
//     //     mongoId: '66b39c624d7b309cb5a7d32f'
//     // },

//     {
//         active: false,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Solopreneur Plan',
//         type: 'Month',
//         description: 'Lifetime Deal',
//         price: 59,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//         plan_id: 1,
//         product: 'pro_01j6926n5vbgstxd73dkde9gq3',
//         id: 'pri_01j6927kh2tgcm45tg0gn662rv',
//         // stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl',
//         mongoId: '66cdd68ba02760d37fe4932c'
//     },

//     {
//         active: false,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Startup Plan',
//         type: 'Month',
//         description: 'Lifetime Deal',
//         price: 99,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//         plan_id: 2,
//         product: 'pro_01j6926n5vbgstxd73dkde9gq3',
//         id: 'pri_01j69jww55h1rdcvem88hcwpkr',
//         // stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww',
//         mongoId: '66cdd68ba02760d37fe4932d'
//     },
//     {
//         active: true,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Agency Plan',
//         type: 'Month',
//         description: 'Lifetime Deal',
//         price: 249,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         plan_id: 3,
//         product: 'pro_01j6926n5vbgstxd73dkde9gq3',
//         id: 'pri_01j69jxvygzs7z303wz22wg4jm',
//         stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146',
//         mongoId: '66cdd68ba02760d37fe4932e'
//     }
// ];

const plans = [
    // {
    //     active: false,
    //     icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
    //     title: 'Solopreneur Plan',
    //     type: 'Month',
    //     description: 'Lifetime Deal',
    //     price: 49,
    //     permission: [0, 1, 2, 3, 4, 5, 6, 7],
    //     plan_id: 1,
    //     product: 'prod_Qava0JlfF41pNh',
    //     id: 'price_1Pjjj2Dku3fWB0uA5ZrHPfcy',
    //     stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
    // },
    // {
    //     active: false,
    //     icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
    //     title: 'Solopreneur Plan',
    //     type: 'Month',
    //     description: 'Lifetime Deal',
    //     price: 59,
    //     permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    //     plan_id: 1,
    //     product: 'prod_QjktFjfVWNkYqP',
    //     // product: 'prod_QhConTXq8njd1g',
    //     mongoId: '66cc87eed303b9dbdfa353c4',
    //     id: 'price_1PsHO3Cx996FZZgaFYdWI2RZ',
    //     // id: 'price_1PpoOgDku3fWB0uAud7MP6JR',
    //     stripePayLink: 'https://buy.stripe.com/dR6174ai11oE1xK009'
    // },
    // {
    //     active: false,
    //     icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
    //     title: 'Startup Plan',
    //     type: 'Month',
    //     description: 'Lifetime Deal',
    //     price: 99,
    //     permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    //     plan_id: 2,
    //     mongoId: '66b39c624d7b309cb5a7d333',
    //     id: 'price_1PsHOSCx996FZZgaYmEr5On0',
    //     product: 'prod_QjkuCR5EaXgZ60',
    //     // id: 'price_1PjjutDku3fWB0uAsDq13Hg8',
    //     // product: 'prod_QavmbQShCaPyRj',
    //     stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
    // },
    // {
    //     active: true,
    //     icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
    //     title: 'Agency Plan',
    //     type: 'Month',
    //     description: 'Lifetime Deal',
    //     price: 249,
    //     permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //     plan_id: 3,
    //     mongoId: '66b39c624d7b309cb5a7d334',
    //     id: 'price_1PsHPXCx996FZZgaocbHP0tJ',
    //     product: 'prod_Qjkv9hFmdrihfj',
    //     // id: 'price_1PjjvTDku3fWB0uA7GoaIaVn',
    //     // product: 'prod_QavnUqEY4bSjcu',
    //     stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
    // }
    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Solopreneur Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 59,
        permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        plan_id: 1,
        product: 'pro_01j6926n5vbgstxd73dkde9gq3',
        id: 'pri_01j6927kh2tgcm45tg0gn662rv',
        // stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl',
        mongoId: '66cdd68ba02760d37fe4932c'
    },

    {
        active: false,
        icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Startup Plan',
        type: 'Month',
        description: 'Lifetime Deal',
        price: 99,
        permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        plan_id: 2,
        product: 'pro_01j6926n5vbgstxd73dkde9gq3',
        id: 'pri_01j69jww55h1rdcvem88hcwpkr',
        // stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww',
        mongoId: '66cdd68ba02760d37fe4932d'
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
        product: 'pro_01j6926n5vbgstxd73dkde9gq3',
        id: 'pri_01j69jxvygzs7z303wz22wg4jm',
        stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146',
        mongoId: '66cdd68ba02760d37fe4932e'
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

const LifetimePlans = ({ subscription }) => {
    const { dbUser, setDbUser } = useAuth();

    const [
        price_Id
        // setPrice_Id // setFetchSubscribeData
    ] = React.useState(null);
    React.useEffect(() => {
        if (!dbUser?.email) return;
        if (window.tolt_referral) {
            window.tolt.signup(dbUser?.email);
        }
    }, [dbUser?.email]);

    // SOCKET
    React.useEffect(() => {
        function subsUpdate({ message: { subscription: item } }) {
            subsctriptionSetter({ item })();
            setDbUser((p) => ({ ...p, needOpenAiKey: 'Yes' }));
        }
        const encoding = `subscription:${dbUser._id}`;

        console.log(`Socket is connected`);

        socket.on(encoding, subsUpdate);

        return () => {
            socket.disconnect();
        };
    }, []);
    // const createSession = async (priceId) => {
    //     if (!priceId) {
    //         return 0;
    //     }
    //     setPrice_Id(priceId);
    //     const token = await getAccessToken();
    //     console.log('creating session');
    //     try {
    //         const { data: response } = await axios.post(
    //             `subscriptions/stripe/payment-with-auth`,
    //             {
    //                 priceId,
    //                 email: dbUser.email,
    //                 mode: 'payment'
    //             },
    //             {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             }
    //         );
    //         const url = response?.url;
    //         window.location.href = url;
    //     } catch (e) {
    //         toast('something went wrong , please try again or contact us at hey@TwitterDm.io', {
    //             autoClose: 5000,
    //             type: 'warning'
    //         });
    //     } finally {
    //         setPrice_Id(null);
    //     }
    // };

    // ;

    const createSession = (priceId) => {
        // window.Paddle.Checkout.open({
        //     product: plan_id,
        //     email: dbUser.email,
        //     passthrough: dbUser,
        //     // successCallback: checkoutComplete,
        //     closeCallback: checkoutClosed
        // });
        const paddleSubsObj = {
            settings: {
                theme: 'light'
            },
            items: [
                {
                    priceId,
                    quantity: 1
                }
            ],
            customData: {
                userId: dbUser._id,
                uid: dbUser.uid,
                name: dbUser.name,
                email: dbUser.email,
                tolt_referral: window.tolt_referral
            },
            customer: {
                email: dbUser.email,
                name: dbUser.name
                // id:dbUser.paddleId
                // address: {
                //     countryCode: 'US'
                // }
            },
            closeCallback: () => {
                console.log('close');
            }
        };
        console.log(paddleSubsObj);
        window.Paddle.Checkout.open(paddleSubsObj);
        socket.connect();

        console.log(`Socket is connected`);
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
                                                    {plan.mongoId === subscription?.planId ? 'Subscribed' : 'Buy Now'}
                                                </BRButton>
                                            ) : (
                                                <BRButton
                                                    disabled={price_Id}
                                                    onClick={() => {
                                                        createSession(plan.id);
                                                    }}
                                                    sx={{ borderRadius: '50px', width: '100%', color: '#fff' }}
                                                >
                                                    {plan.mongoId === subscription?.planId ? 'Subscribed' : 'Buy Now'}
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

export default LifetimePlans;
