import BRInput from '../BRInput';
import { Box, Grid, Typography } from '@mui/material';
import Stepper1 from './stepper/Stepper1';
import BRButton from '../BRButton';
import { toast } from 'react-toastify';
import { domainRegex } from 'config';
// import { domainCheckerAPI } from 'features/project/projectActions';

const Step1 = ({ values, handleChange, setStep, isEditProject }) => {
    const handleNextStep = async () => {
        const { brandName, domain, shortDescription } = values;
        if (!brandName?.trim?.() || !domain?.trim?.() || !shortDescription?.trim?.()) {
            toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'warning' });
        } else if (!domainRegex.test(domain)) {
            toast.warn('Please Enter a domain!');
        }

        // else if (!isEditProject) {
        //     try {
        //         await domainCheckerAPI({ data: { domain } });
        //         setStep(2);
        //     } catch (e) {
        //         toast.warn('Please Enter a domain!');
        //     }
        // }
        else {
            setStep(2);
        }
    };

    return (
        <Box>
            <Stepper1 />
            <Box>
                <BRInput
                    label="Brand Name"
                    placeholder="Enter brand name"
                    name="brandName"
                    value={values?.brandName}
                    handleChange={handleChange}
                />

                <BRInput
                    label="Domain"
                    placeholder="ex: https://mailtoon.io"
                    name="domain"
                    value={values?.domain}
                    handleChange={handleChange}
                    disabled={isEditProject}
                    type="url"
                />

                <BRInput
                    minRows={2}
                    // rowsMax={10}
                    multiline
                    label="Description"
                    placeholder="Write a description"
                    name="shortDescription"
                    value={values?.shortDescription}
                    handleChange={handleChange}
                    sx={{ height: '100% !important', fieldset: { height: '100% !important' } }}
                    // wrapperSx={{ height: '100% !important' }}
                />

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
