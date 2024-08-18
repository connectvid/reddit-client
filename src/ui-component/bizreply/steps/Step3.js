import { Grid, Typography } from '@mui/material';
import BRButton from '../BRButton';
import reddit from 'assets/images/platforms/reddit.png';
import linkedin from 'assets/images/platforms/linkedin.png';
import quora from 'assets/images/platforms/quora.png';
import twitter from 'assets/images/platforms/twitter.png';
import { FaRegSquare } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Stepper3 from './stepper/Stepper3';

const Step3 = ({ setStep, selectedPlatforms, setselectedPlatforms, handleSubmit }) => {
    const platformsSrc = {
        'reddit.com': reddit,
        'linkedin.com': linkedin,
        'quora.com': quora,
        'twitter.com': twitter
    };
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
        <div>
            <Stepper3 />
            <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '16px', mb: 3 }}>
                Select social profile (s) where you want to see posts from.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {subscription?.platforms?.map?.((platform) => (
                    <Typography
                        key={platform}
                        component="div"
                        sx={{
                            cursor: 'pointer',
                            p: 0,
                            maxWidth: '154px',
                            border: `1px solid ${selectedPlatforms.includes(platform) ? '#0C22E5' : '#CCD3D9'}`,
                            minHeight: '75px',
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            position: 'relative'
                        }}
                        onClick={() => handleSelectedPlatform(platform)}
                    >
                        <Typography sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                            {selectedPlatforms.includes(platform) ? (
                                <Typography
                                    component="span"
                                    sx={{
                                        height: '14px',
                                        width: '14px',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)'
                                    }}
                                >
                                    <FaCheck size={10} color="#fff" />
                                </Typography>
                            ) : (
                                <FaRegSquare size={14} color="#667185" />
                            )}
                        </Typography>
                        <img
                            src={platformsSrc[platform]}
                            alt={platform}
                            style={{
                                width: '65%',
                                marginTop: '10px'
                            }}
                        />
                    </Typography>
                )) || ''}
            </Box>

            <Typography sx={{ color: '#6E7478', fontWeight: 500, fontSize: '14px', mb: 3, mt: 2 }}>
                <span style={{ color: '#000', textDecoration: 'underline' }}>Skip and finish the step for now,</span> you’ll be able to
                connect your socials later.
            </Typography>

            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <BRButton
                    variant="outlined"
                    style={{ width: '210px' }}
                    grandChildSx={{ display: 'block', width: '100%' }}
                    onClick={() => setStep(2)}
                >
                    Back to Previous
                </BRButton>
                <BRButton variant="contained" style={{ width: '180px' }} onClick={handleNextButton}>
                    Finish Steps
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step3;
