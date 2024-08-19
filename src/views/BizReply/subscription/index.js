/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
import React from 'react';
// material-ui
import { Box, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import PaymentDashboard from './PaymentDashboard';
// import axios from 'utils/axios';
// import { toast } from 'react-toastify';
import SubscriptionToggleButton from './SubscriptionToggleButton';
import LifetimePlans from './LifetimePlans';
import MonthlyPlans from './MonthlyPlans';
import YearlyPlans from './YearlyPlans';
// import { callOthers } from 'features/project/projectActions';

// const plansDev = [
//     {
//         active: false,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Solopreneur Plan',
//         type: 'Month',
//         description: 'Lifetime Deal',
//         price: 49,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7],
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
//         description: 'Lifetime Deal',
//         price: 99,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7],
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
//         description: 'Lifetime Deal',
//         price: 249,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         plan_id: 3,
//         product: 'prod_QcR0DJDmXAVIOT',
//         id: 'price_1PlC8qDku3fWB0uALzWDJx0G',
//         stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
//     }
// ];

// const plans = [
//     {
//         active: false,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Solopreneur Plan',
//         type: 'Month',
//         description: 'Lifetime Deal',
//         price: 49,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7],
//         plan_id: 1,
//         product: 'prod_Qava0JlfF41pNh',
//         id: 'price_1Pjjj2Dku3fWB0uA5ZrHPfcy',
//         stripePayLink: 'https://buy.stripe.com/7sI3fc0Hr8R690c5kl'
//     },
//     {
//         active: false,
//         icon: <Avatar src="logo-only.svg" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
//         title: 'Startup Plan',
//         type: 'Month',
//         description: 'Lifetime Deal',
//         price: 99,
//         permission: [0, 1, 2, 3, 4, 5, 6, 7],
//         plan_id: 2,
//         id: 'price_1PjjutDku3fWB0uAsDq13Hg8',
//         product: 'prod_QavmbQShCaPyRj',
//         stripePayLink: 'https://buy.stripe.com/cN2aHE2Pz1oEcco8ww'
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
//         id: 'price_1PjjvTDku3fWB0uA7GoaIaVn',
//         product: 'prod_QavnUqEY4bSjcu',
//         stripePayLink: 'https://buy.stripe.com/eVaaHE4XH8R6foA146'
//     }
// ];

// const planList = [
//     [
//         '5 Keywords Track',
//         '200 AI Replies/Month',
//         '30,000 Mentions',
//         'Reddit, X & Linkedin',
//         '3 Brand Projects',
//         '1 Team Member',
//         '1 Year History Storage',
//         'No API Key Needed',
//         'Custom Prompts (Coming)',
//         'Multi Language (Coming)'
//     ],
//     [
//         '15 Keywords Track',
//         '500 AI Replies/Month',
//         '120,000 Mentions',
//         'Reddit, X & Linkedin',
//         '10 Brand Projects',
//         '3 Team Members',
//         '2 Year History Storage',
//         'No API Key Needed',
//         'Custom Prompts (Coming)',
//         'Multi Language (Coming)'
//     ],
//     [
//         '50 Keywords Track',
//         'Unlimited Replies/Month',
//         '300,000 Mentions',
//         'Reddit, X, LinkedIn & Quora',
//         '30 Brand Projects',
//         '10 Team Members',
//         '2 Year History Storage',
//         'Bring Your GPT API Key',
//         'Custom Prompts (Coming)',
//         'Multi Language (Coming)'
//     ]
// ];
// const selectedPlans = [
//     'https://gv-reddit.netlify.app',
//     'https://app.bizreply.co',
//     'https://rebizreply.netlify.app',
//     'https://stagedbizreply.netlify.app'
// ].includes(window.location.origin)
//     ? plans
//     : plansDev;

const Subscription = () => {
    const [selected, setSelected] = React.useState('lifetime');
    // const { subscription } = useSelector((s) => s.subscription);
    // console.log(subscription, 'subscription');
    const {
        dbUser // getAccessToken
    } = useAuth();
    const [
        fetchSubscribeData // setFetchSubscribeData
    ] = React.useState({
        status: 'success'
    });
    // const [
    //     price_Id,
    //     setPrice_Id // setFetchSubscribeData
    // ] = React.useState(null);
    React.useEffect(() => {
        if (!dbUser?.email) return;
        if (window.tolt_referral) {
            window.tolt.signup(dbUser?.email);
        }
    }, [dbUser?.email]);
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
    //                 email: dbUser.email
    //             },
    //             {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             }
    //         );
    //         const url = response?.url;
    //         // console.log(response.session, 123, response, url);
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

    // const theme = useTheme();
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
                            <Box style={{ width: '40%', minWidth: '450px', margin: '10px auto 20px' }}>
                                <SubscriptionToggleButton selected={selected} setSelected={setSelected} />
                            </Box>

                            <Box>
                                {selected === 'lifetime' && <LifetimePlans />}
                                {selected === 'monthly' && <MonthlyPlans />}
                                {selected === 'yearly' && <YearlyPlans />}
                            </Box>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};

export default Subscription;
