/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

// project imports
import useAuth from 'hooks/useAuth';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BRInput from 'ui-component/bizreply/BRInput';
// ==============================|| SETTINGS PAGE ||============================== //

const Settings = () => {
    const navigate = useNavigate();
    const { dbUser } = useAuth();
    const { subscription } = useSelector((state) => state.subscription);
    //     const { subscription } = useSelector(state => state.subscription);
    // const { remainingCredit } = subscription || {};
    // const { searches, keywords, projects, replies } = remainingCredit || {};

    console.log(dbUser, subscription, 'subscription');

    const handleClick = () => {
        navigate('/subscription');
    };

    return (
        <Box sx={{ minHeight: '100%' }}>
            <Typography sx={{ mb: 3, fontSize: '25px', fontWeight: '700' }}>Settings</Typography>
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
                            <Typography style={{ fontWeight: '700' }}>{subscription.type.toUpperCase()}</Typography>
                        </Box>
                        {/* <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                            <Typography style={{color: '#6E7478'}}>Team member</Typography>
                            <Typography style={{fontWeight: '700'}}>N/A</Typography>
                        </Box> */}
                        <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <Typography style={{ color: '#6E7478' }}>Available Project Credits</Typography>
                            <Typography style={{ fontWeight: '700' }}>{subscription?.remainingCredit?.projects}</Typography>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <Typography style={{ color: '#6E7478' }}>Available Reply Credits</Typography>
                            <Typography style={{ fontWeight: '700' }}>{subscription?.remainingCredit?.replies}</Typography>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <Typography style={{ color: '#6E7478' }}>Available Keyword Credits</Typography>
                            <Typography style={{ fontWeight: '700' }}>{subscription?.remainingCredit?.keywords}</Typography>
                        </Box>
                    </Box>
                    <Button onClick={handleClick} style={{ background: '#000', color: '#fff', marginTop: '20px' }}>
                        Upgrade Plan
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Settings;
