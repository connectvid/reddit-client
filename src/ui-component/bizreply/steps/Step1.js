import BRInput from '../BRInput';
import { Box, Grid, Typography } from '@mui/material';
import Stepper1 from './stepper/Stepper1';
import BRButton from '../BRButton';
// import { toast } from 'react-toastify';
// import { domainRegex } from 'config';
// import { domainCheckerAPI } from 'features/project/projectActions';

const Step1 = ({
    values,
    handleChange, // setStep,
    isEditProject,
    handleBlur,
    errors = {},
    handleNextStep
}) => {
    return (
        <Box>
            <Stepper1 />
            <Box>
                <Box sx={{ width: '100%', mb: 1.5 }}>
                    <BRInput
                        label="Brand Name"
                        placeholder="Enter brand name"
                        name="brandName"
                        value={values?.brandName}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        required
                        sx={{ mb: 0 }}
                    />
                    {errors?.brandName ? <Typography sx={{ color: 'red' }}> {errors?.brandName}</Typography> : ''}
                </Box>
                <Box sx={{ width: '100%', mb: 1.5 }}>
                    <BRInput
                        label="Domain"
                        placeholder="ex: https://mailtoon.io"
                        name="domain"
                        value={values?.domain}
                        handleChange={handleChange}
                        disabled={isEditProject}
                        type="url"
                        onBlur={handleBlur}
                        required
                        sx={{ mb: 0 }}
                    />
                    {errors?.domain ? <Typography sx={{ color: 'red' }}> {errors?.domain}</Typography> : ''}
                </Box>
                <Box sx={{ width: '100%', mb: 1.5 }}>
                    <BRInput
                        minRows={2}
                        // rowsMax={10}
                        multiline
                        label="Description"
                        placeholder="Write a description"
                        name="shortDescription"
                        value={values?.shortDescription}
                        handleChange={handleChange}
                        sx={{ height: '100% !important', fieldset: { height: '100% !important' }, mb: 0 }}
                        onBlur={handleBlur}
                        required
                    />
                    {errors?.shortDescription ? <Typography sx={{ color: 'red' }}> {errors?.shortDescription}</Typography> : ''}
                </Box>
                <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: '400', marginTop: '0px' }}>
                    Please write the description in details. 👆
                </Typography>
            </Box>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BRButton variant="contained" type="button" sx={{ width: '180px' }} onClick={handleNextStep}>
                    Next Step
                </BRButton>
            </Grid>
        </Box>
    );
};

export default Step1;

/* <Typography
    variant="subtitle2"
    sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
>
    Description
</Typography> */

/* <TextareaAutosize
    // rowsMin={5}
    // rowsMax={10}
    placeholder="Write a description"
    name="shortDescription"
    value={values.shortDescription}
    onChange={({ target: { value = '' } }) => {
        handleChange((p) => ({ ...p, shortDescription: value }));
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
    /> */
