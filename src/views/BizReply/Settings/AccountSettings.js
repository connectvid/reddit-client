/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

import useAuth from 'hooks/useAuth';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BRInput from 'ui-component/bizreply/BRInput';
import pluralize from 'pluralize';
import AddOpenAiKey from './AddOpenAiKey';
import UpdatePassword from './UpdatePassword';
// ==============================|| SETTINGS PAGE ||============================== //
import React from 'react';

const AccountSettings = () => {
    const navigate = useNavigate();
    const { dbUser } = useAuth();
    const { subscription } = useSelector((state) => state.subscription);

    const remainingCredit = subscription?.remainingCredit;

    const handleClick = () => {
        navigate('/subscription');
    };
    return (
        <>
            <Box
                sx={{
                    background: '#fff',
                    p: 3,
                    mt: 4,
                    borderRadius: '10px'
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4">Personal Information</Typography>
                    </Box>
                    <Box style={{ width: '50%', minWidth: '300px', marginTop: '20px' }}>
                        <BRInput label="Full name" value={dbUser.name} disabled />
                        <BRInput label="Email address" value={dbUser.email} disabled />
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    background: '#fff',
                    p: 3,
                    mt: 4,
                    borderRadius: '10px'
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4">Plan</Typography>
                    </Box>
                    <Box style={{ width: '30%', minWidth: '300px', marginTop: '20px' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography style={{ color: '#6E7478' }}>Plan type</Typography>
                            <Typography style={{ fontWeight: '700' }}>{subscription?.type?.toUpperCase?.()}</Typography>
                        </Box>
                        {(remainingCredit &&
                            // eslint-disable-next-line array-callback-return
                            Object.keys(remainingCredit).map((item) => {
                                if (['projects', 'replies', 'keywords', 'mentions'].includes(item)) {
                                    const itemC = remainingCredit[item];
                                    return (
                                        <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                            <Typography style={{ color: '#6E7478', textTransform: 'capitalize' }}>
                                                Available {pluralize.singular(item)} Credits
                                            </Typography>
                                            <Typography style={{ fontWeight: '700' }}>
                                                {itemC === 'Unlimited' ? itemC : itemC < 0 ? 0 : itemC}
                                            </Typography>
                                        </Box>
                                    );
                                }
                            })) ||
                            ''}

                    </Box>
                    <Button onClick={handleClick} style={{ background: '#000', color: '#fff', marginTop: '20px' }}>
                        Upgrade Plan
                    </Button>
                </Box>
            </Box>
            <UpdatePassword />
            <AddOpenAiKey />
        </>
    );
};

export default AccountSettings;