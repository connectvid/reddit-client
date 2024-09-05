import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';
import Stepper2 from 'ui-component/bizreply/steps/stepper/Stepper2';
import AddKeyword from './AddKeyword';
import { toast } from 'react-toastify';
import AddNegativeKeywords from 'ui-component/Keyword/AddNegativeKeywords';

const Step2 = ({
    setStep,
    // values,
    addedKeywords,
    setAddedKeywords,
    suggestedKeywords,
    isEditProject,
    fetchKeywords,
    negativeKeywords,
    handleNegativeKeyword
    // editProject
}) => {
    const handleNextButton = () => {
        if (addedKeywords.length < 1 && isEditProject === false) {
            toast('Please select at least one keyword', { autoClose: 2500, type: 'warning' });
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

            <Box
                sx={{
                    p: '0px 20px'
                }}
            >
                {suggestedKeywords.length > 0 ? (
                    <AddKeyword {...{ suggestedKeywords, addedKeywords, setAddedKeywords }} />
                ) : (
                    <Typography sx={{ textAlign: 'center', mt: 3, mb: 5, fontWeight: 'bold', fontSize: '30px' }}>
                        Generating Keywords...
                    </Typography>
                )}
                <AddNegativeKeywords {...{ negativeKeywords, handleNegativeKeyword }} />
            </Box>
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
                    Next Step
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step2;
