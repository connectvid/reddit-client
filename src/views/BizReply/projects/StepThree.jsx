import React from 'react';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography, IconButton, StepLabel, Stepper, Step } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const StepThree = () => {
    const navigate = useNavigate();

    const handleCreateAnother = () => {
        // Logic to create another project
        navigate('/new-project'); // Adjust the path as needed
    };

    const handleGoToProjects = () => {
        // Logic to go to projects page
        navigate('/projects'); // Adjust the path as needed
    };

    return (
        <Box sx={{ width: '545px', margin: '0 auto' }}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'rgba(241, 241, 241, 1)',
                    padding: '16px'
                }}
            >
                Create a new project
                <IconButton onClick={() => navigate('/some-path')}>
                    <EmojiEmotionsIcon />
                </IconButton>
            </DialogTitle>

            <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
                <Stepper alternativeLabel activeStep={3}>
                    <Step>
                        <StepLabel>Brand Details</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Set Keywords</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Select Socials</StepLabel>
                    </Step>
                </Stepper>
            </Box>

            <DialogContent sx={{ textAlign: 'center' }}>
                <EmojiEmotionsIcon sx={{ fontSize: 50, color: '#fdd835' }} />
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', fontSize: '18px' }}>
                    Congratulations!
                </Typography>
                <Typography variant="body1">You’ve successfully created a project 🚀</Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
                <Button variant="outlined" onClick={handleCreateAnother} sx={{ width: '184px', height: '45px', borderRadius: '10px' }}>
                    Create Another Project
                </Button>
                <Button
                    variant="contained"
                    onClick={handleGoToProjects}
                    sx={{
                        width: '184px',
                        height: '45px',
                        borderRadius: '10px',
                        background: 'linear-gradient(90deg, #007BFF, #0056b3)',
                        ml: 2
                    }}
                >
                    Go to Projects Page
                </Button>
            </DialogActions>
        </Box>
    );
};

export default StepThree;
