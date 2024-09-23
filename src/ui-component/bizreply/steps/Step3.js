import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import BRButton from '../BRButton';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Stepper3 from './stepper/Stepper3';
import PlatformSelection from 'ui-component/PlatformSelection';

const Step3 = ({ setStep, selectedPlatforms, setselectedPlatforms, handleSubmit, addProjectLoading, updateProjectLoading }) => {
    const { subscription } = useSelector((state) => state.subscription);
    const handleSelectedPlatform = (platform) => {
        console.log(platform);
        if (!selectedPlatforms.includes(platform)) {
            setselectedPlatforms([...selectedPlatforms, platform]);
        } else {
            setselectedPlatforms(selectedPlatforms.filter((item) => item !== platform));
        }
    };

    const handleNextButton = () => {
        if (selectedPlatforms.length < 1) {
            toast('Please select at least one social', { autoClose: 2500, type: 'warning' });
        } else {
            handleSubmit();
        }
    };

    return (
        <Box>
            <Stepper3 />
            <Box sx={{ px: 5 }}>
                <PlatformSelection
                    {...{
                        platforms: subscription?.platforms,
                        selectedPlatforms,
                        handleSelectedPlatform,
                        cardSx: {
                            minWidth: { xs: '154px', sm: '120px', md: '120px', lg: '120px', xl: '154px' },
                            maxWidth: { xs: '154px', sm: '120px', md: '120px', lg: '120px', xl: '154px' }
                        },
                        platformsSx: {
                            gap: { xs: 3, md: 3, lg: 2, xl: 4 },
                            width: { xs: '100%', sm: '100%', md: '95%', lg: '92.5%', xl: '95%' },
                            mx: 'auto'
                        }
                    }}
                />
                <Typography sx={{ color: '#6E7478', fontWeight: 500, fontSize: '14px', mb: 3, mt: 2 }}>
                    <span style={{ color: '#000', textDecoration: 'underline' }}>Skip and finish the step for now,</span> you’ll be able to
                    connect your socials later.
                </Typography>
            </Box>

            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <BRButton
                    variant="outlined"
                    style={{ width: '210px' }}
                    grandChildSx={{ display: 'block', width: '100%' }}
                    onClick={() => setStep(2)}
                >
                    Back to Previous
                </BRButton>
                <BRButton
                    disabled={addProjectLoading || updateProjectLoading}
                    variant="contained"
                    style={{ width: '180px' }}
                    onClick={handleNextButton}
                >
                    Finish Steps{' '}
                    {addProjectLoading || updateProjectLoading ? (
                        <CircularProgress sx={{ maxHeight: '16px', maxWidth: '16px', ml: 1 }} />
                    ) : (
                        ''
                    )}
                </BRButton>
            </Grid>
            {addProjectLoading || updateProjectLoading ? (
                <Typography sx={{ fontSize: '16px', fontWeight: 400, textAlign: 'right', mt: 1.5 }}>
                    Please wait for a few seconds
                </Typography>
            ) : (
                ''
            )}
        </Box>
    );
};

export default Step3;
