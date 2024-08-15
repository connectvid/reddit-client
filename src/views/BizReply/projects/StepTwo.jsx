import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    IconButton,
    Stepper,
    Step,
    StepLabel,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import BrandIcon from '@mui/icons-material/BusinessCenter';
import KeywordsIcon from '@mui/icons-material/Label';
import SocialsIcon from '@mui/icons-material/Share';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import QuoraIcon from '@mui/icons-material/QuestionAnswer';

const steps = [
    { label: 'Brand Details', icon: <BrandIcon /> },
    { label: 'Set Keywords', icon: <KeywordsIcon /> },
    { label: 'Select Socials', icon: <SocialsIcon /> }
];

const StepTwo = () => {
    const [activeStep, setActiveStep] = React.useState(2); // Set to 2 for the Select Socials step
    const [selectedSocials, setSelectedSocials] = React.useState({
        reddit: false,
        linkedin: false,
        twitter: false,
        quora: false
    });

    const navigate = useNavigate();

    const handleSocialChange = (event) => {
        setSelectedSocials({
            ...selectedSocials,
            [event.target.name]: event.target.checked
        });
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = () => {
        // Handle finish logic here, like saving the selected socials
        navigate('/some-path'); // Navigate to another page after finishing
    };

    return (
        <form>
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'rgba(241, 241, 241, 1)',
                    padding: '16px'
                }}
            >
                Create a new project
                <IconButton onClick={() => navigate('/some-path')}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
                <Stepper alternativeLabel activeStep={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={() => step.icon}>
                                <Typography variant="caption">{step.label}</Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <DialogContent>
                <Typography variant="h6">Select social profile(s) where you want to see posts from.</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSocials.reddit}
                                    onChange={handleSocialChange}
                                    name="reddit"
                                    icon={<RedditIcon />}
                                    checkedIcon={<RedditIcon />}
                                />
                            }
                            label="Reddit"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSocials.linkedin}
                                    onChange={handleSocialChange}
                                    name="linkedin"
                                    icon={<LinkedInIcon />}
                                    checkedIcon={<LinkedInIcon />}
                                />
                            }
                            label="LinkedIn"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSocials.twitter}
                                    onChange={handleSocialChange}
                                    name="twitter"
                                    icon={<TwitterIcon />}
                                    checkedIcon={<TwitterIcon />}
                                />
                            }
                            label="Twitter"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSocials.quora}
                                    onChange={handleSocialChange}
                                    name="quora"
                                    icon={<QuoraIcon />}
                                    checkedIcon={<QuoraIcon />}
                                />
                            }
                            label="Quora"
                        />
                    </Grid>
                </Grid>

                <Typography variant="body2" sx={{ mt: 2 }}>
                    <a href="#skip" onClick={handleFinish} style={{ textDecoration: 'none' }}>
                        Skip and finish the step for now
                    </a>
                    , you’ll be able to connect your socials later.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" onClick={handleBack}>
                    Back to Previous
                </Button>
                <Button variant="contained" onClick={handleFinish} sx={{ background: 'linear-gradient(90deg, #007BFF, #0056b3)' }}>
                    Finish Steps
                </Button>
            </DialogActions>
        </form>
    );
};

export default StepTwo;
