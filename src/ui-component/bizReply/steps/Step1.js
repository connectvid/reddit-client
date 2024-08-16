import React from 'react';
import BRInput from '../BRInput';
import { Grid, TextareaAutosize, Typography } from '@mui/material';
import { TextFields } from '@mui/icons-material';
import Stepper1 from './stepper/Stepper1';
import BRButton from '../BRButton';

const Step1 = ({ values, handleChange, setStep }) => {
    console.log('object');
    return (
        <div>
            <Stepper1 />
            <BRInput label="Brand Name" value={values.brandName} handleChange={handleChange} />
            <BRInput label="Domain" placeholder="ex: mailtoon.io" value={values.brandName} handleChange={handleChange} />
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
            >
                Description
            </Typography>
            <TextareaAutosize
                rowsMin={5}
                placeholder="Write a description"
                value={values.shortDescription}
                onChange={handleChange}
                fullWidth // Full width
                style={{
                    padding: '10px',
                    width: '100%',
                    minHeight: '100px',
                    maxHeight: '500px',
                    border: '2px solid #e5e6e9',
                    borderRadius: '5px'
                }}
            />
            <p style={{ color: 'black', fontSize: '14px', fontWeight: '400', marginTop: '0px' }}>
                Please write the description in details. 👆
            </p>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BRButton variant="contained" style={{ width: '180px' }} onClick={() => setStep(2)}>
                    Next Step
                </BRButton>
            </Grid>
        </div>
    );
};

export default Step1;
