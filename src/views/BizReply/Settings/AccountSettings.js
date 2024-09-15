/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

import useAuth from 'hooks/useAuth';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BRInput from 'ui-component/bizreply/BRInput';
import pluralize from 'pluralize';
import AddOpenAiKey from './AddOpenAiKey';
import UpdatePassword from './UpdatePassword';
import React from 'react';
import { toast } from 'react-toastify';
import BRButton from 'ui-component/bizreply/BRButton';
import errorMsgHelper from 'utils/errorMsgHelper';
// ==============================|| SETTINGS PAGE ||============================== //

const AccountSettings = () => {
    const navigate = useNavigate();
    const { dbUser, authProviders, updateProfile } = useAuth();
    const [values, setValues] = React.useState({});
    const [updating, setUpdating] = React.useState(false);
    React.useEffect(() => {
        const name = dbUser?.name || dbUser?.displayName;
        if (name) {
            setValues({ name });
        }
    }, []);
    // console.log({ authProviders });
    const { subscription } = useSelector((state) => state.subscription);

    const remainingCredit = subscription?.remainingCredit;

    const handleClick = () => {
        navigate('/subscription');
    };
    const handleUpdateProfile = async (e) => {
        try {
            e.preventDefault();
            setUpdating(true);
            await updateProfile({ ...values });
            toast.success(`Profile has been updated!`);
        } catch (e) {
            console.error(e);
            toast.warn(errorMsgHelper(e));
        } finally {
            setUpdating(false);
        }
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
                        <form onSubmit={handleUpdateProfile}>
                            <BRInput
                                label="Full name"
                                name="name"
                                value={values?.name || ''}
                                handleChange={({ target: { value = '' } }) => {
                                    setValues({ name: value });
                                }}
                                defaultValue={dbUser.name}
                            />
                            <BRInput label="Email address" value={dbUser.email} disabled />
                            <BRButton
                                // disabled={isSubmitting || Object.keys(errors || {}).length}
                                variant="contained"
                                type="submit"
                                sx={{ color: '#fff', width: '180px', height: '50px', background: '#000' }}
                            >
                                Update Profile
                                {(updating && <CircularProgress sx={{ maxHeight: '16px', maxWidth: '16px', ml: 1 }} />) || ''}
                            </BRButton>
                        </form>
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
                                        <Box key={item} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
            {authProviders?.includes?.('password') ? <UpdatePassword /> : ''}
            <AddOpenAiKey />
        </>
    );
};

export default AccountSettings;
