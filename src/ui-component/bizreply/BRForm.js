/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Modal } from '@mui/material';
import crossIcon from '../../assets/images/cross.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const BRForm = ({ values, handleChange }) => {
    const {
        project: { showProjectCreateModal }
    } = useSelector((state) => state);
    const [step, setStep] = useState(1);

    return (
        <Modal open={showProjectCreateModal} onClose={toggleProjectCreateModalCtrl()}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '12px',
                    width: '40%',
                    minWidth: '300px',
                    color: '#000'
                }}
            >
                <Box
                    style={{
                        backgroundColor: '#f1f1f1',
                        borderRadius: '12px 12px 0 0',
                        padding: '0px 30px',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        borderBottom: `2px solid #f0f0f0`,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <p className="mr-2">Create a new project</p>
                    <img
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={toggleProjectCreateModalCtrl()}
                        src={crossIcon}
                        alt="icon"
                    />
                </Box>
                {step === 1 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step1 {...{ values, handleChange, setStep }} />
                    </Box>
                )}
                {step === 2 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step2 {...{ values, handleChange, setStep }} />
                    </Box>
                )}
                {step === 3 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step3 {...{ values, handleChange, setStep }} />
                    </Box>
                )}
                {step === 4 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step4 {...{ values, handleChange, setStep }} />
                    </Box>
                )}

                {/* <TextField
                sx={{
                    mb: 4,
                    height: '48px',
                    borderRadius: '10px',
                    color: 'black',
                    width: '100%'
                }}
                fullWidth
                name="brandName"
                value={values.brandName}
                onChange={handleChange}
                placeholder="Brand name"
                type="text"
                inputProps={{ minLength: 3, maxLength: 40 }}
            /> */}
                {/* <Typography variant="subtitle2" sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                Domain
            </Typography>
            <TextField
                sx={{
                    mb: 4,
                    height: '48px',
                    width: '100%'
                }}
                fullWidth
                name="domain"
                value={values.domain}
                onChange={handleChange}
                placeholder={urlPlaceholder}
                type="text"
                inputProps={{ minLength: 5, maxLength: 253 }}
            />
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                Description
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                    name="shortDescription"
                    fullWidth
                    value={values.shortDescription}
                    multiline
                    rows={4}
                    placeholder="Write a description"
                    onChange={handleChange}
                    inputProps={{ minLength: 5, maxLength: 500 }}
                />
                <Typography variant="caption" sx={{ mt: 1, color: 'black' }}>
                    Please write the description in detail.
                </Typography>
            </FormControl> */}
            </Box>
        </Modal>
    );
};

export default BRForm;
