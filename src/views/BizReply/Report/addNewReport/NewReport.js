/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Autocomplete, Box, Modal, Typography } from '@mui/material';
import BRInput from 'ui-component/bizreply/BRInput';
import React, { useEffect, useRef, useState } from 'react';
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

export default function ({ projects = [], project }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        console.log(window.innerWidth);
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
        dateRange: { from: new Date(), to: new Date() },
        platforms: [],
        keywords: [],
        projectId: '',
        projectName: '',
        projectDomain: ''
    };
    const options = projects?.map?.(({ _id, brandName }) => ({ _id, brandName })) || [];
    const [values, setValues] = React.useState(initVals);
    const [keysAndPlatforms, setKeysAndPlatforms] = React.useState({ platforms: [], keywords: [] });
    console.log(values);
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
        }
    }, []);

    const handleChange = ({ target: { name, value = '' } }) => {
        setValues((p) => ({ ...p, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        // try {
        //     const token = await getAccessToken();
        //     createReportAPI({ token, data: values })();
        // } catch (e) {
        //     const msg = errorMsgHelper(e);
        //     console.error(e);
        //     toast.warn(msg);
        // }
    };

    const handlePlatformSelection = (platform) => {
        setValues((p) => {
            const copy = JSON.parse(JSON.stringify(p));
            const platforms = copy.platforms;
            if (platforms.includes(platform)) {
                copy.platforms = platforms.filter((item) => item !== platform);
            } else {
                copy.platforms = [...platforms, platform];
            }
            return copy;
        });
    };

    const handleKeywordSelection = (keyword) => {
        console.log(keyword);
        setValues((p) => {
            const copy = JSON.parse(JSON.stringify(p));
            const keywords = copy.keywords;
            if (keywords.includes(keyword)) {
                copy.keywords = keywords.filter((item) => item !== keyword);
            } else {
                copy.keywords = [...keywords, keyword];
            }
            return copy;
        });
    };

    return (
        <Modal open>
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
                        // onClick={onClostModal}
                        src={crossIcon}
                        alt="icon"
                    />
                </Box>

                <Box
                    sx={{
                        padding: '25px',
                        display: isSmallScreen ? 'block' : 'flex', // Use block for small screens, flex otherwise
                        flexDirection: isSmallScreen ? 'column' : 'row', // Change direction if needed
                        width: '100%'
                    }}
                >
                    <Box style={{ flex: 1 }} onSubmit={handleSubmit}>
                        <Box sx={{ width: '100%', display: 'block', mb: 2 }}>
                            <Box style={{ display: 'flex', gap: '10px' }}>
                                <BRInput
                                    label="You company name"
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
                                    <ImageUpload handleFormInputChange={handleChange} />
                                    <i style={{ color: '#6E7478', justifyContent: 'center', alignItems: 'center' }}>Rec. size: 24*24 px</i>
                                </Box>
                                <Box style={{ display: 'flex', gap: '10px', flex: 1 }}>
                                    <ImageUpload handleFormInputChange={handleChange} />
                                    <i style={{ color: '#6E7478', justifyContent: 'center', alignItems: 'center' }}>Rec. size: 24*24 px</i>
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%', display: 'block', mb: 2, mt: 2 }}>
                                <Autocomplete
                                    onChange={(_, data) => {
                                        // setFieldValue('reply_character_limit', data);
                                        if (data) setValues((p) => ({ ...p, projectId: data._id }));
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
                            {...{ options: keysAndPlatforms.keywords, selectedKeywords: values?.keywords, handleKeywordSelection }}
                        />
                        <BRTextArea
                            // style={{ height: '20px' }}
                            rows={4}
                            label="Description"
                            placeholder="Enter description"
                            name="description"
                            value={values.description}
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
                        <ColorPicker />
                        <BRButton type="submit" sx={{ color: '#fff', display: 'inline-block', mt: 2, width: '150px' }}>
                            Create report
                        </BRButton>
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <ReportPreview />
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
