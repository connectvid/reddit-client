/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Autocomplete, Box, Button, Modal } from '@mui/material';
import BRInput from 'ui-component/bizreply/BRInput';
import React, { useEffect, useState } from 'react';
import BRButton from 'ui-component/bizreply/BRButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import useAuth from 'hooks/useAuth';
import crossIcon from '../../../../assets/images/cross.svg';
import ImageUpload from './ImageUpload';
import PlatformSelection from './PlatformSelection';
import BRTextArea from 'ui-component/bizreply/BRTextArea';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import ColorPicker from './ColorPicker';
import ReportPreview from './reportPreview/ReportPreview';
import KeywordSelection from './KeywordSelection';
import moment from 'moment';
import { toast } from 'react-toastify';
import { createReportAPI } from 'features/report/reportActions';
import errorMsgHelper from 'utils/errorMsgHelper';

export default function ({ projects = [], project, showCreateModal, setShowCreateModal }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [keywordsData, setKeywordsData] = useState([]);
    const [isCreatingReport, setIsCreatingReport] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 1200) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    }, [window.innerWidth]);
    const { getAccessToken } = useAuth();
    const initVals = {
        companyName: '',
        // companyWebsite: '',
        companyLogo: null,
        agencyName: '',
        // agencyWebsite: '',
        agencyLogo: null,
        dateRange: { from: '', to: '' },
        platforms: [],
        keywords: [],
        projectId: '',
        projectName: '',
        projectDescription: '',
        projectDomain: '',
        reportColor: '#0A0626'
    };
    const options = projects?.map?.(({ _id, brandName }) => ({ _id, brandName })) || [];
    const [values, setValues] = React.useState(initVals);
    const [keysAndPlatforms, setKeysAndPlatforms] = React.useState({ platforms: [], keywords: [] });
    React.useEffect(() => {
        if (values?.projectId) {
            const {
                brandName,
                shortDescription,
                domain,
                _id,
                platforms = [],
                Suggestedkeywords = []
            } = projects.find((item) => item._id === values?.projectId);
            const keyWords = Suggestedkeywords.map((item) => ({ _id: item._id, title: item.title }));
            setKeysAndPlatforms({ platforms, keywords: keyWords });
            setValues((p) => ({
                ...p,
                projectName: brandName,
                projectDescription: shortDescription,
                projectDomain: domain,
                projectId: _id,
                platforms,
                keywords: keyWords.map((item) => item._id)
            }));
            setKeywordsData(keyWords);
        }
    }, [values?.projectId]);

    React.useEffect(() => {
        if (project) {
            const { brandName, shortDescription, domain, _id, platforms = [], Suggestedkeywords = [] } = project;
            const keyWords = Suggestedkeywords.map((item) => ({ _id: item._id, title: item.title }));
            setKeysAndPlatforms({ platforms, keywords: keyWords });
            setValues((p) => ({
                ...p,
                projectName: brandName,
                projectDescription: shortDescription,
                projectDomain: domain,
                projectId: _id,
                platforms,
                keywords: keyWords.map((item) => item._id)
            }));
            setKeywordsData(keyWords);
        }
    }, []);

    const handleChange = ({ target: { name, value = '' } }) => {
        setValues((p) => ({ ...p, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation part starts
        const { dateRange } = values || {};
        const { from, to } = dateRange || {};
        if (!from || !to || !moment.isMoment(from) || !moment.isMoment(to) || !from.isValid() || !to.isValid()) {
            toast('Please select a valid date range.', {
                autoClose: 2500,
                type: 'warning'
            });
            return;
        }
        if (!values.companyName || !values.companyLogo || !values.agencyName || !values.agencyLogo) {
            toast('Please enter company/agency name and logo perperly.', {
                autoClose: 2500,
                type: 'warning'
            });
            return;
        }
        if (values.platforms.length === 0 || values.keywords.length === 0) {
            toast('Please select at least one platform and at least one keyword', {
                autoClose: 2500,
                type: 'warning'
            });
            return;
        }

        if (!values.projectId || !values.projectName || !values.projectDomain) {
            toast('Please select a valid project', {
                autoClose: 2500,
                type: 'warning'
            });
            return;
        }
        if (!values.projectDescription || values.projectDescription.trim().length === 0) {
            toast('Please enter valid description', {
                autoClose: 2500,
                type: 'warning'
            });
            return;
        }
        if (!values.reportColor || !values.reportColor.trim().length === 7) {
            toast('Please enter valid color with Hex code', {
                autoClose: 2500,
                type: 'warning'
            });
            return;
        }

        // console.log(values);
        try {
            setIsCreatingReport(true);
            const token = await getAccessToken();
            const toPlusOneDay = to.clone().add(1, 'days');
            const bodyData = { ...values, dateRange: { from: from.format('YYYY-MM-DD'), to: toPlusOneDay.format('YYYY-MM-DD') } };
            console.log(bodyData);
            createReportAPI({ token, data: bodyData, setShowCreateModal, setIsCreatingReport })();
            // setShowCreateModal(false);
        } catch (e) {
            setIsCreatingReport(false);
            // console.log(e);
            const msg = errorMsgHelper(e);
            console.error(e, msg);
            toast.warn('Faild to create report');
        }
    };

    const handlePlatformSelection = (platform) => {
        setValues((p) => {
            let platforms = p.platforms;
            if (platforms.includes(platform)) {
                platforms = platforms.filter((item) => item !== platform);
            } else {
                platforms = [...platforms, platform];
            }
            return {
                ...p,
                platforms
            };
        });
    };

    const handleKeywordSelection = (keyword) => {
        setValues((p) => {
            let keywords = p.keywords;
            if (keywords.includes(keyword)) {
                keywords = keywords.filter((item) => item !== keyword);
            } else {
                keywords = [...keywords, keyword];
            }
            return {
                ...p,
                keywords
            };
        });
    };

    return (
        <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '12px',
                    width: '80%',
                    minWidth: '300px',
                    color: '#000',
                    height: '90%',
                    overflow: 'scroll'
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
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    <p className="mr-2">Create a new project</p>
                    <img
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => setShowCreateModal(false)}
                        src={crossIcon}
                        alt="icon"
                    />
                </Box>

                <Box
                    sx={{
                        padding: '25px',
                        display: isSmallScreen ? 'block' : 'flex', // Use block for small screens, flex otherwise
                        flexDirection: isSmallScreen ? 'column' : 'row', // Change direction if needed
                        width: '100%',
                        gap: '20px',
                        alighItems: 'stretch'
                    }}
                >
                    <Box style={{ flex: 1, overflow: 'hidden' }}>
                        <Box sx={{ width: '100%', display: 'block', mb: 2 }}>
                            <Box style={{ display: 'flex', gap: '10px' }}>
                                <BRInput
                                    label="Company name"
                                    placeholder="bizreply"
                                    name="companyName"
                                    value={values.companyName}
                                    handleChange={handleChange}
                                    required
                                />
                                <BRInput
                                    label="Agency name"
                                    placeholder="Bizreply"
                                    name="agencyName"
                                    value={values.agencyName}
                                    handleChange={handleChange}
                                    required
                                />
                            </Box>
                            <Box style={{ display: 'flex', gap: '10px' }}>
                                <Box style={{ display: 'flex', gap: '10px', flex: 1 }}>
                                    <ImageUpload name="companyLogo" handleFormInputChange={handleChange} />
                                    <i
                                        style={{
                                            color: '#6E7478',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '4px',
                                            fontSize: '18px'
                                        }}
                                    >
                                        Rec. size: 50*50 px
                                    </i>
                                </Box>
                                <Box style={{ display: 'flex', gap: '10px', flex: 1 }}>
                                    <ImageUpload name="agencyLogo" handleFormInputChange={handleChange} />
                                    <i
                                        style={{
                                            color: '#6E7478',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '4px',
                                            fontSize: '18px'
                                        }}
                                    >
                                        Rec. size: 50*50 px
                                    </i>
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%', display: 'block', mb: 2, mt: 2 }}>
                                <Autocomplete
                                    onChange={(_, data) => {
                                        // setFieldValue('reply_character_limit', data);
                                        if (data) setValues((p) => ({ ...p, projectId: data._id }));
                                        // if (data) setValues((p) => ({ ...p, projectId: data._id }));
                                        // if (data) setValues((p) => ({ ...p, projectId: data._id }));
                                        // if (data) setValues((p) => ({ ...p, projectId: data._id }));
                                        return data;
                                    }}
                                    defaultValue={options.find((item) => item._id === project?._id)}
                                    // onBlur={handleBlur}
                                    disablePortal
                                    // value={values.reply_character_limit || ''}
                                    id="combo-box-demo"
                                    options={options}
                                    getOptionLabel={(item) => item.brandName}
                                    sx={{ width: '100%' }}
                                    disableClearable
                                    renderInput={(params) => (
                                        <BRInput2
                                            placeholder="Choose Project"
                                            label="Choose Project"
                                            fullWidth
                                            required
                                            // name="reply_character_limit"
                                            type="text"
                                            {...params}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>
                        <KeywordSelection
                            {...{
                                options: keysAndPlatforms.keywords,
                                selectedKeywords: values?.keywords,
                                handleKeywordSelection
                            }}
                        />
                        <BRTextArea
                            // style={{ fontFa: '20px' }}
                            rows={4}
                            label="Description"
                            placeholder="Enter description"
                            name="projectDescription"
                            value={values.projectDescription}
                            handleChange={handleChange}
                            required
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    inputFormat="YYYY-MM-DD"
                                    maxDate={new Date()}
                                    renderInput={(props) => <BRInput {...props} label="Date from" />}
                                    value={values?.dateRange?.from}
                                    onChange={(from) => {
                                        setValues((p) => ({ ...p, dateRange: { ...p.dateRange, from } }));
                                    }}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    inputFormat="YYYY-MM-DD"
                                    minDate={values?.dateRange?.from}
                                    maxDate={new Date()}
                                    renderInput={(props) => <BRInput {...props} label="Date to" />}
                                    value={values?.dateRange?.to}
                                    onChange={(to) => {
                                        setValues((p) => ({ ...p, dateRange: { ...p.dateRange, to } }));
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        <PlatformSelection
                            {...{ options: keysAndPlatforms.platforms, selectedPlatforms: values?.platforms, handlePlatformSelection }}
                        />
                        <ColorPicker {...{ values, handleChange }} />
                    </Box>
                    <Box style={{ flex: 1, overflow: 'hidden', height: '100%' }}>
                        <ReportPreview {...{ values, handleSubmit, keywordsData }} />
                    </Box>
                </Box>
                <Box style={{ display: 'flex', padding: '20px', mt: 2, mb: 2, float: 'right', gap: '15px' }}>
                    <Button onClick={() => setShowCreateModal(false)} sx={{ color: '#000', width: '150px', background: '#EAEAEA' }}>
                        Cancel
                    </Button>
                    <BRButton onClick={handleSubmit} sx={{ color: '#fff', width: '150px' }}>
                        Create report
                    </BRButton>
                </Box>
            </Box>
        </Modal>
    );
}
