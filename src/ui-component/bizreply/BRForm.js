/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Modal } from '@mui/material';
import crossIcon from '../../assets/images/cross.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addProject, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';

const BRForm = () => {
    const [creatingProject, setCreatingProject] = useState(false);
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const [selectedPlatforms, setselectedPlatforms] = useState([]);
    const [addedKeywords, setAddedKeywords] = useState([]);
    const {
        project: { showProjectCreateModal, projects }
    } = useSelector((state) => state);
    const { getAccessToken, dbUser } = useAuth();
    const [step, setStep] = useState(1);
    const [createdProject, setCreatedProject] = useState(false);
    const [values, setValues] = useState({
        brandName: '',
        domain: '',
        shortDescription: ''
    });
    // const handleChange = (_,target) => {
    //     console.log(target);
    //     // setValues((p) => ({ ...p, [name]: value }));
    // };
    const handleSubmit = async () => {
        let domainValue = values.domain;
        if (!domainValue.startsWith('https://')) {
            domainValue = `https://${domainValue}`;
        }
        const body = {
            brandName: values.brandName,
            domain: domainValue,
            shortDescription: values.shortDescription,
            // userId: dbUser._id,
            platforms: selectedPlatforms,
            suggestedKeywords: addedKeywords,
            keywords: suggestedKeywords
        };

        const token = await getAccessToken();
        // console.log(body);
        setStep(4);
        setCreatingProject(true);

        try {
            await addProject(token, body)();
            setStep(4);
            setCreatingProject(false);
        } catch (e) {
            const message = e.message;
            toast.error(message);
            setCreatingProject(false);
        }
    };

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
                        <Step1 {...{ values, setValues, setStep, createdProject }} />
                    </Box>
                )}
                {step === 2 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step2 {...{ setStep, values, addedKeywords, setAddedKeywords, suggestedKeywords, setSuggestedKeywords }} />
                    </Box>
                )}
                {step === 3 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step3 {...{ setStep, selectedPlatforms, setselectedPlatforms, handleSubmit }} />
                    </Box>
                )}
                {step === 4 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step4 {...{ setStep }} />
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default BRForm;
