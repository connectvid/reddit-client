import Stepper3 from './stepper/Stepper3';
import { Grid } from '@mui/material';
import BRButton from '../BRButton';

const Step3 = ({ setStep }) => {
    console.log('Step 2');
    return (
        <div>
            <Stepper3 />
            <p>thire screen</p>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <BRButton variant="outlined" style={{ width: '210px' }} onClick={() => setStep(2)}>
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
