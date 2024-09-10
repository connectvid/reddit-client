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
import { useSelector } from 'react-redux';

const Subscription = () => {
    const [selected, setSelected] = React.useState('lifetime');
    const { subscription } = useSelector((s) => s.subscription);
    // console.log(subscription, 'subscription');
    const {
        dbUser // getAccessToken
    } = useAuth();
    const [
        fetchSubscribeData // setFetchSubscribeData
    ] = React.useState({
        status: 'success'
    });
    React.useEffect(() => {
        if (!dbUser?.email) return;
        if (window.tolt_referral) {
            window.tolt.signup(dbUser?.email);
        }
    }, [dbUser?.email]);

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
                                {selected === 'lifetime' && <LifetimePlans {...{ subscription }} />}
                                {selected === 'monthly' && <MonthlyPlans {...{ subscription }} />}
                                {selected === 'yearly' && <YearlyPlans {...{ subscription }} />}
                            </Box>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};

export default Subscription;
