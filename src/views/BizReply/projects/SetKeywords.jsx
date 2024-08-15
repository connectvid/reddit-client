import React from 'react';
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    IconButton,
    Box,
    Chip,
    TextField,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BrandIcon from '@mui/icons-material/BusinessCenter';
import KeywordsIcon from '@mui/icons-material/Label';
import SocialsIcon from '@mui/icons-material/Share';
import BRButton from 'ui-component/bizreply/BRButton/index';

const steps = [
    { label: 'Brand Details', icon: <BrandIcon /> },
    { label: 'Set Keywords', icon: <KeywordsIcon /> },
    { label: 'Select Socials', icon: <SocialsIcon /> }
];

const SetKeywords = () => {
    const [selectedKeywords, setSelectedKeywords] = React.useState([]);
    const [keywordInput, setKeywordInput] = React.useState('');

    const suggestedKeywords = ['Outreach', 'Video', 'Marketing', 'Engagement', 'Automation', 'Productivity', 'Management'];

    const handleAddKeyword = () => {
        if (keywordInput && !selectedKeywords.includes(keywordInput)) {
            setSelectedKeywords([...selectedKeywords, keywordInput]);
            setKeywordInput('');
        }
    };

    const handleRemoveKeyword = (keyword) => {
        setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
    };

    return (
        <form>
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    background: 'rgba(241, 241, 241, 1)',
                    padding: '16px'
                }}
            >
                Edit Project
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
                <Stepper alternativeLabel>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={() => step.icon}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <span>{step.label}</span>
                                </Box>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Add Keywords
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'blue', cursor: 'pointer' }}>
                        +Add new keywords
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    {suggestedKeywords.map((keyword, index) => (
                        <Chip
                            key={index}
                            label={`+ ${keyword}`}
                            onClick={() => setSelectedKeywords([...selectedKeywords, keyword])}
                            sx={{
                                margin: '5px',
                                backgroundColor: 'white',
                                color: 'black',
                                borderColor: 'rgba(42, 83, 229, 1)',
                                borderWidth: 1,
                                borderStyle: 'solid'
                            }}
                        />
                    ))}
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Add Keywords
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        placeholder="Enter a keyword"
                        sx={{ flexGrow: 1, mr: 2 }}
                    />
                </Box>
                <BRButton
                    variant="contained"
                    onClick={handleAddKeyword}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'darkgrey'
                        }
                    }}
                >
                    Add keyword
                </BRButton>

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Selected Keywords
                </Typography>
                <Box sx={{ mb: 2 }}>
                    {selectedKeywords.map((keyword, index) => (
                        <Chip
                            key={index}
                            label={keyword}
                            onDelete={() => handleRemoveKeyword(keyword)}
                            sx={{
                                margin: '5px',
                                backgroundColor: 'black',
                                color: 'white'
                            }}
                        />
                    ))}
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-end', gap: '10px' }}>
                <BRButton
                    variant="primary"
                    onClick={() => console.log('Go to previous step')}
                    sx={{
                        backgroundColor: 'grey',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: 'darkgrey'
                        }
                    }}
                >
                    Back to Previous
                </BRButton>

                <BRButton variant="contained" onClick={() => console.log('Go to next step')}>
                    Save & Go to Next Step
                </BRButton>
            </DialogActions>
        </form>
    );
};

export default SetKeywords;
