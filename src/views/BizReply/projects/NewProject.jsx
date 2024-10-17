/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    addProjectAPI,
    editProjectSelect,
    isEditProjectStatus,
    projectCreatedStatus,
    projectUpdatedStatus,
    toggleProjectCreateModalCtrl,
    updateProjectAPI
} from 'features/project/projectActions';
import Step1 from 'ui-component/bizreply/steps/Step1';
import Step2 from 'ui-component/bizreply/steps/Step2';
import Step3 from 'ui-component/bizreply/steps/Step3';
import Step4 from 'ui-component/bizreply/steps/Step4';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH, ONBOARDING_PATH, domainRegex } from 'config';
import axios from 'utils/axios';
import { FaRegTimesCircle } from 'react-icons/fa';
import checkNegativeKeywordInKeywords from 'utils/checkNegativeKeywordInKeywords';

const validationChecker = (touch, vls, touchSkip = false) => {
    const { brandName = '', domain = '', shortDescription = '' } = vls;
    const errors = {};
    if (touch?.brandName || touchSkip) {
        if (!brandName.trim()) {
            errors.brandName = 'Brand name is mandatory!';
        } else if (brandName.length < 3) {
            errors.brandName = 'Brand name must be at least 3 characters!';
        } else if (brandName.length > 100) {
            errors.brandName = 'Brand name must be at most 100 characters!';
        } else if (errors.brandName) {
            delete errors.brandName;
        }
    }

    if (touch?.domain || touchSkip) {
        if (!domain.trim()) {
            errors.domain = 'Domain is mandatory!';
        } else if (!domainRegex.test(domain)) {
            errors.domain = 'Invalid domain';
        } else if (errors.domain) {
            delete errors.domain;
        }
    }

    if (touch?.shortDescription || touchSkip) {
        if (!shortDescription.trim()) {
            errors.shortDescription = 'Description is mandatory!';
        } else if (shortDescription.length < 15) {
            errors.shortDescription = 'Description must be at least 15 characters!';
        } else if (shortDescription.length > 2000) {
            errors.shortDescription = 'Description must be at most 2000 characters!';
        } else if (errors.shortDescription) {
            delete errors.shortDescription;
        }
    }
    return errors;
};
export default function () {
    const initVals = {
        brandName: '',
        domain: '',
        shortDescription: ''
    };
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const [addedKeywords, setAddedKeywords] = useState([]);
    const [selectedPlatforms, setselectedPlatforms] = useState([]);
    const [negativeKeywords, setNegativeKeywords] = useState([]);
    const [values, setValues] = useState(initVals);
    const [touch, setTouch] = useState({});
    const [errors, setErrors] = useState({});

    const {
        project: { addProjectLoading, updateProjectLoading, projectCreated, projectUpdated, isEditProject, editProject }
    } = useSelector((state) => state);
    const { getAccessToken } = useAuth();
    const [step, setStep] = useState(1);

    const { brandName = '', domain = '', shortDescription = '' } = values;

    // console.log(values, 'values', touch);

    const handleNextStep = async () => {
        const errs = validationChecker(touch, values, true);
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setStep(2);
        // if (!brandName?.trim?.() || !domain?.trim?.() || !shortDescription?.trim?.()) {
        //     toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'warning' });
        // } else if (!domainRegex.test(domain)) {
        //     toast.warn('Please Enter a domain!');
        // }
        // // else if (!isEditProject) {
        // //     try {
        // //         await domainCheckerAPI({ data: { domain } });
        // //         setStep(2);
        // //     } catch (e) {
        // //         toast.warn('Please Enter a domain!');
        // //     }
        // // }
        // else {
        //     setStep(2);
        // }
    };

    const onBlur = ({ target: { name } }) => {
        const t = { ...touch, [name]: true };
        setTouch(t);
        // setErrors(validationChecker(t));
        console.log(t);
    };

    useEffect(() => {
        setErrors(validationChecker(touch, values));
    }, [brandName, domain, shortDescription]);

    const handleNegativeKeyword = (keyword) => {
        if (negativeKeywords.includes(keyword)) {
            setNegativeKeywords((p) => p.filter((item) => item !== keyword));
        } else {
            const check = checkNegativeKeywordInKeywords({ keywords: addedKeywords, negativeKeyword: keyword });
            if (check.matchedExistingKeyword.length) {
                toast.warn(`The requested negative keyword exists in keywords!`);
                return;
            }
            setNegativeKeywords((p) => [...p, keyword]);
        }
    };

    const handleNegativeKeywordExistChecker = (keyword) => {
        const check = checkNegativeKeywordInKeywords({ keywords: addedKeywords, negativeKeyword: keyword });
        return check.matchedExistingKeyword.length;
    };

    // const func = (name, value) => setValues((p) => ({ ...p, [name]: value }));

    const handleChange = ({ target: { name, value = '' } }) => {
        setValues((p) => ({ ...p, [name]: value }));
    };

    useEffect(() => {
        if (projectCreated) {
            setStep(4);
            projectCreatedStatus(false)();
        }

        if (projectUpdated) {
            setStep(4);
            projectUpdatedStatus(false)();
        }

        if (projectCreated || projectUpdated) {
            setStep(4);
            if (projectCreated) {
                projectCreatedStatus(false)();
            }
            if (projectUpdated) {
                projectUpdatedStatus(false)();
            }
            setSuggestedKeywords([]);
            setAddedKeywords([]);
            setselectedPlatforms([]);
            setNegativeKeywords([]);
            setValues(initVals);
            isEditProjectStatus(false)();
            editProjectSelect(null)();
        }
    }, [projectCreated, projectUpdated]);

    useEffect(() => {
        if (editProject) {
            const { brandName, domain, shortDescription, platforms, negativeKeywords } = editProject;
            setValues({ brandName, domain, shortDescription });
            setselectedPlatforms(platforms);
            setNegativeKeywords(negativeKeywords);
        }
    }, []);

    const fetchKeywords = async () => {
        const token = await getAccessToken();
        axios
            .post(`keywords/generate-by-ai`, values, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (data) => {
                if (data?.data?.isSuccess) {
                    setSuggestedKeywords(data.data?.items);
                }
            });
    };

    const handleSubmit = async () => {
        let domainValue = values.domain;
        if (!domainValue.startsWith('https://')) {
            domainValue = `https://${domainValue}`;
        }
        const body = {
            brandName: values.brandName.trim(),
            domain: domainValue.trim(),
            shortDescription: values.shortDescription.trim(),
            platforms: selectedPlatforms,
            suggestedKeywords: addedKeywords,
            keywords: suggestedKeywords,
            negativeKeywords
        };

        // console.log(body);
        try {
            const token = await getAccessToken();
            if (isEditProject) {
                updateProjectAPI(token, editProject?._id, body)();
                return;
            }
            addProjectAPI(token, body)();
        } catch (e) {
            const message = e.message;
            toast.warning(message);
        }
    };
    const onClose = () => {
        setSuggestedKeywords([]);
        setAddedKeywords([]);
        setselectedPlatforms([]);
        setNegativeKeywords([]);
        setValues(initVals);
        isEditProjectStatus(false)();
        editProjectSelect(null)();
        toggleProjectCreateModalCtrl()();
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
                color: '#000',
                overflowY: 'scroll !important',
                maxHeight: '100vh'
            }}
        >
            {pathname === ONBOARDING_PATH ? (
                <Box sx={{ textAlign: 'center', py: 1.5 }}>
                    <Typography variant="h3" sx={{ color: '#212121', fontSize: '20px', lineHeight: '24.4px', fontWeight: 700 }}>
                        Your BizReply Account Has Been Created 🔥
                    </Typography>
                    <Typography sx={{ color: '#6E7478', fontSize: '14px', lineHeight: '20px', fontWeight: 400, display: 'block', mt: 0.5 }}>
                        Let’s create a project to get your account setup and running.
                    </Typography>
                    <Divider sx={{ my: 1.5, borderColor: '#CCD3D9' }} />
                    <Typography variant="h4" sx={{ color: '#212121', fontSize: '18px', lineHeight: '22px', fontWeight: 700 }}>
                        Create a Project
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        backgroundColor: '#f1f1f1',
                        borderRadius: '12px 12px 0 0',
                        px: 3,
                        py: 2,

                        borderBottom: `2px solid #f0f0f0`,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>{isEditProject ? 'Edit' : 'Create a new'} project</Typography>
                    <Typography
                        sx={{
                            cursor: 'pointer'
                        }}
                        onClick={onClose}
                    >
                        <FaRegTimesCircle size={20} color="#000" />
                    </Typography>
                </Box>
            )}

            {step === 1 && (
                <Box style={{ padding: '20px 30px', marginTop: '-10px' }}>
                    <Step1 {...{ values, handleChange, setStep, editProject, isEditProject, handleBlur: onBlur, errors, handleNextStep }} />
                </Box>
            )}
            {step === 2 && (
                <Box style={{ padding: '20px 30px', marginTop: '-10px' }}>
                    <Step2
                        {...{
                            setStep,
                            values,
                            addedKeywords,
                            setAddedKeywords,
                            suggestedKeywords,
                            setSuggestedKeywords,
                            isEditProject,
                            editProject,
                            fetchKeywords,
                            negativeKeywords,
                            handleNegativeKeyword,
                            handleNegativeKeywordExistChecker
                        }}
                    />
                </Box>
            )}
            {step === 3 && (
                <Box style={{ padding: '20px 30px', marginTop: '-10px' }}>
                    <Step3
                        {...{ setStep, selectedPlatforms, setselectedPlatforms, handleSubmit, addProjectLoading, updateProjectLoading }}
                    />
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
                        mb: 1.5,
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
