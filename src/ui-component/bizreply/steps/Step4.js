import Stepper3 from './stepper/Stepper3';
import { Grid, Typography } from '@mui/material';
import BRButton from '../BRButton';
import congratulations from 'assets/images/congratulations.png';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';

const Step4 = () => {
    console.log('Step 4');
    return (
        <div>
            <Stepper3 />
            <img style={{ width: '10%', margin: '30px 45% 10px' }} src={congratulations} alt="congratulations" />
            <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '19px', textAlign: 'center' }}>Congratulations!</Typography>
            <Typography sx={{ color: '#6E7478', fontWeight: 500, fontSize: '16px', textAlign: 'center', mt: 1, mb: 2 }}>
                You’ve successfully created a project 🚀
            </Typography>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                {/* <BRButton
                    variant="outlined"
                    style={{ width: '210px' }}
                    grandChildSx={{ display: 'block', width: '100%' }}
                    onClick={() => setStep(3)}
                >
                    Create Another Project
                </BRButton> */}
                <BRButton variant="contained" style={{ width: '180px' }} onClick={toggleProjectCreateModalCtrl()}>
                    Go to Projects Page
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step4;
