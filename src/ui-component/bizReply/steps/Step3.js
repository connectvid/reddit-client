import React from 'react';
import { Grid } from '@mui/material';
import BRButton from '../BRButton';
import AddKeyword from 'views/BizReply/keywords/AddKeyword';
import Stepper3 from './stepper/Stepper3';

const Step3 = ({ setStep }) => {
    console.log('Step3 2');
    return (
        <div>
            <Stepper3 />
            <AddKeyword />
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <BRButton
                    variant="outlined"
                    style={{ width: '210px' }}
                    grandChildSx={{ display: 'block', width: '100%' }}
                    onClick={() => setStep(2)}
                >
                    Back to Previous
                </BRButton>
                <BRButton variant="contained" style={{ width: '180px' }} onClick={() => setStep(4)}>
                    Finish Steps
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step3;
