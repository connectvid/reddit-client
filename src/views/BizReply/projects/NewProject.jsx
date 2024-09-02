/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Divider, Modal, Typography } from '@mui/material';
import crossIcon from '../../../assets/images/cross.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addProject, projectCreatedStatus, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import Step1 from 'ui-component/bizreply/steps/Step1';
import Step2 from 'ui-component/bizreply/steps/Step2';
import Step3 from 'ui-component/bizreply/steps/Step3';
import Step4 from 'ui-component/bizreply/steps/Step4';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH, ONBOARDING_PATH } from 'config';

export default function () {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const [selectedPlatforms, setselectedPlatforms] = useState([]);
    const [addedKeywords, setAddedKeywords] = useState([]);
    const {
        project: { showProjectCreateModal, projects, createLoading, projectCreated }
    } = useSelector((state) => state);
    const { getAccessToken } = useAuth();
    const [step, setStep] = useState(1);
    const [createdProject, setCreatedProject] = useState(false);
    const [values, setValues] = useState({
        brandName: '',
        domain: '',
        shortDescription: ''
    });
    useEffect(() => {
        if (projectCreated) {
            setStep(4);
            projectCreatedStatus(false)();
        }
    }, [projectCreated]);
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

        // console.log(body);
        try {
            const token = await getAccessToken();
            addProject(token, body)();
        } catch (e) {
            const message = e.message;
            toast.warning(message);
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: '12px',
                width: '50%',
                minWidth: '300px',
                color: '#000'
            }}
        >
            {pathname === ONBOARDING_PATH ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h3" sx={{ color: '#212121', fontSize: '20px', lineHeight: '24.4px', fontWeight: 700 }}>
                        Your BizReply Account Has Been Created 🔥
                    </Typography>
                    <Typography sx={{ color: '#6E7478', fontSize: '14px', lineHeight: '20px', fontWeight: 400, display: 'block', mt: 2 }}>
                        Let’s create a project to get your account setup and running.
                    </Typography>
                    <Divider sx={{ my: 2.5, borderColor: '#CCD3D9' }} />
                    <Typography variant="h4" sx={{ color: '#212121', fontSize: '18px', lineHeight: '22px', fontWeight: 700 }}>
                        Create a Project
                    </Typography>
                </Box>
            ) : (
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
            )}

            {step === 1 && (
                <Box style={{ padding: '20px 30px', marginTop: '-10px' }}>
                    <Step1 {...{ values, setValues, setStep, createdProject }} />
                </Box>
            )}
            {step === 2 && (
                <Box style={{ padding: '20px 30px', marginTop: '-10px' }}>
                    <Step2 {...{ setStep, values, addedKeywords, setAddedKeywords, suggestedKeywords, setSuggestedKeywords }} />
                </Box>
            )}
            {step === 3 && (
                <Box style={{ padding: '20px 30px', marginTop: '-10px' }}>
                    <Step3 {...{ setStep, selectedPlatforms, setselectedPlatforms, handleSubmit, createLoading }} />
                </Box>
            )}
            {step === 4 && (
                <Box style={{ padding: '20px 30px', marginTop: '-10px' }}>
                    <Step4 {...{ setStep }} />
                </Box>
            )}
            {(pathname === ONBOARDING_PATH && (
                <Typography
                    sx={{
                        textAlign: 'center',
                        my: 3,
                        color: '#6E7478',
                        fontSize: '14px',
                        fontWeight: 500,
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        toggleProjectCreateModalCtrl()();
                        navigate(DASHBOARD_PATH, { replace: true });
                    }}
                >
                    Skip now
                </Typography>
            )) ||
                ''}
        </Box>
    );
}
