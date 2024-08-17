import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import BRButton from '../BRButton';
import Stepper2 from './stepper/Stepper2';
import AddKeyword from './AddKeyword';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { toast } from 'react-toastify';

const Step2 = ({ setStep, values, addedKeywords, setAddedKeywords, suggestedKeywords, setSuggestedKeywords }) => {
    const { getAccessToken, dbUser } = useAuth();
    const fetchKeywords = async () => {
        const token = await getAccessToken();
        axios
            .post(`keywords/generate-by-ai`, values, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (data) => {
                if (data?.data?.isSuccess) {
                    setSuggestedKeywords(data.data?.items);
                }
            });
    };

    const handleNextButton = () => {
        if (addedKeywords.length < 1) {
            toast('Please select at least one keyword', { autoClose: 2500, type: 'error' });
        } else {
            setStep(3);
        }
    };

    useEffect(() => {
        fetchKeywords();
    }, []);
    return (
        <div>
            <Stepper2 />
            {suggestedKeywords.length > 0 ? (
                <AddKeyword {...{ values, suggestedKeywords, addedKeywords, setAddedKeywords }} />
            ) : (
                <Typography sx={{ textAlign: 'center', mt: 3, mb: 5, fontWeight: 'bold', fontSize: '30px' }}>
                    Generating Keywords...
                </Typography>
            )}

            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <BRButton
                    variant="outlined"
                    style={{ width: '210px' }}
                    grandChildSx={{ display: 'block', width: '100%' }}
                    onClick={() => setStep(1)}
                >
                    Back to Previous
                </BRButton>
                <BRButton variant="contained" style={{ width: '210px' }} onClick={handleNextButton}>
                    Save & Go to Next Step
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step2;
