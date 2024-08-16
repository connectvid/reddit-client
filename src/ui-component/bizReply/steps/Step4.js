import React from 'react';
import Stepper3 from './stepper/Stepper3';
import { Grid } from '@mui/material';
import BRButton from '../BRButton';

const Step4 = ({ setStep }) => {
    console.log('Step 2');
    return (
        <div>
            <Stepper3 />
            <p>fourth screen</p>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <BRButton variant="outlined" style={{ width: '210px' }} onClick={() => setStep(2)}>
                    Create Another Project
                </BRButton>
                <BRButton variant="contained" style={{ width: '180px' }} onClick={() => setStep(3)}>
                    Go to Projects Page
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step4;
