import Stepper2 from './stepper/Stepper2';
import { Grid } from '@mui/material';
import BRButton from '../BRButton';
import AddKeyword from 'views/BizReply/keywords/AddKeyword';

const Step2 = ({ setStep }) => {
    console.log('Step 2');
    return (
        <div>
            <Stepper2 />
            <AddKeyword />
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <BRButton variant="outlined" style={{ width: '210px' }} onClick={() => setStep(1)}>
                    Back to Previous
                </BRButton>
                <BRButton variant="contained" style={{ width: '210px' }} onClick={() => setStep(3)}>
                    Save & Go to Next Step
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step2;
