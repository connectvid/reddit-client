import BRInput from '../BRInput';
import { Box, Grid, TextareaAutosize, Typography, useTheme } from '@mui/material';
import Stepper1 from './stepper/Stepper1';
import BRButton from '../BRButton';
import { toast } from 'react-toastify';

const Step1 = ({ values, setValues, setStep, isEditProject }) => {
    // console.log(editProject, 'editProject');
    const { typography } = useTheme();
    const handleNextStep = () => {
        if (!values.brandName || !values?.domain || !values?.shortDescription) {
            toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'warning' });
        } else {
            setStep(2);
        }
    };
    return (
        <Box>
            <Stepper1 />
            <BRInput
                label="Brand Name"
                placeholder="Enter brand name"
                name="brandName"
                value={values.brandName}
                handleChange={({ target: { value = '' } }) => {
                    setValues((p) => ({ ...p, brandName: value }));
                }}
            />

            <BRInput
                label="Domain"
                placeholder="ex: https://mailtoon.io"
                name="domain"
                value={values.domain}
                handleChange={({ target: { value = '' } }) => {
                    setValues((p) => ({ ...p, domain: value }));
                }}
                disabled={isEditProject}
            />
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
            >
                Description
            </Typography>
            <TextareaAutosize
                // rowsMin={5}
                // rowsMax={10}
                placeholder="Write a description"
                name="shortDescription"
                value={values.shortDescription}
                onChange={({ target: { value = '' } }) => {
                    setValues((p) => ({ ...p, shortDescription: value }));
                }}
                fullWidth // Full width
                style={{
                    padding: '10px',
                    width: '100%',
                    minHeight: '50px',
                    maxHeight: '100px',
                    border: '2px solid #e5e6e9',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontFamily: typography.body1.fontFamily
                }}
            />
            <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: '400', marginTop: '0px' }}>
                Please write the description in details. 👆
            </Typography>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BRButton variant="contained" style={{ width: '180px' }} onClick={handleNextStep}>
                    Next Step
                </BRButton>
            </Grid>
        </Box>
    );
};

export default Step1;
