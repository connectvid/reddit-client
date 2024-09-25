/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { IconButton } from '@material-ui/core';
import { Autocomplete, Box, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BRInput from 'ui-component/bizreply/BRInput';
import React, { useRef, useState } from 'react';
import errorMsgHelper from 'utils/errorMsgHelper';
import BRButton from 'ui-component/bizreply/BRButton';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import { FaCheck } from 'react-icons/fa6';
import SocialIcons from 'views/BizReply/SocialIcons';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import useAuth from 'hooks/useAuth';
import { createReportAPI } from 'features/report/reportActions';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import crossIcon from '../../assets/images/cross.svg';
import uploadIcon from '../../assets/images/svgIcons/upload.svg';
import GradinentText from 'ui-component/GradinentText';

export default function ({ projects = [], project }) {
    const [image, setImage] = useState(null);
    const { getAccessToken } = useAuth();
    const initVals = {
        companyName: '',
        companyWebsite: '',
        dateRange: { from: new Date(), to: new Date() },
        keywords: [],
        platforms: [],
        clientLogo: null,
        agencyLogo: null,
        projectId: ''
    };
    const options = projects?.map?.(({ _id, brandName }) => ({ _id, brandName })) || [];
    const [values, setValues] = React.useState(initVals);
    const [keysAndPlatforms, setKeysAndPlatforms] = React.useState({ platforms: [], keywords: [] });
    // const [valueBasic, setValueBasic] = React.useState(new Date());
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
                domain,
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
                domain,
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
        try {
            const token = await getAccessToken();
            createReportAPI({ token, data: values })();
        } catch (e) {
            const msg = errorMsgHelper(e);
            console.error(e);
            toast.warn(msg);
        }
    };
    // const [image, setImage] = useState(null);
    const inputRef = useRef(null); // Reference for the file input

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const processFiles = (files) => {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the image URL to state
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };

    const handleClick = () => {
        inputRef.current.click(); // Trigger click on the hidden input
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

        // console.log(platform, values?.platforms);
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
                        // onClick={onClostModal}
                        src={crossIcon}
                        alt="icon"
                    />
                </Box>

                <Box style={{ padding: '25px' }}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ width: '100%', display: 'block', mb: 2 }}>
                            <Box style={{ display: 'flex', gap: '10px' }}>
                                <BRInput
                                    label="You company name"
                                    placeholder="mailtoon"
                                    name="companyName"
                                    value={values.companyName}
                                    handleChange={handleChange}
                                    required
                                />
                                <BRInput
                                    label="Company Website"
                                    placeholder="mailtoon.io"
                                    name="companyWebsite"
                                    value={values.companyWebsite}
                                    handleChange={handleChange}
                                    required
                                />
                            </Box>

                            <Typography sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 700 }}>
                                Upload your company logo
                            </Typography>
                            <Box
                                sx={{
                                    border: '2px dashed #2583D8',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    backgroundColor: '#F1F5FD',
                                    width: '100%',
                                    maxWidth: '600px',
                                    margin: '0 auto'
                                }}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    ref={inputRef}
                                    style={{ display: 'none' }} // Hide the input
                                    accept="image/*" // Accept only image files
                                    onChange={handleImageChange}
                                />
                                <Box
                                    color="primary"
                                    aria-label="upload logo"
                                    component="span"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        color: '#2196f3'
                                    }}
                                >
                                    {/* <CloudUploadIcon sx={{ fontSize: 50 }} /> */}
                                    <img src={uploadIcon} alt="crosstab" />
                                    <GradinentText variant="body1">Upload logo</GradinentText>
                                </Box>
                            </Box>
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
                                        placeholder="Choose Project for report"
                                        label="Choose Project for report"
                                        fullWidth
                                        required
                                        // name="reply_character_limit"
                                        type="text"
                                        {...params}
                                    />
                                )}
                            />
                        </Box>

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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{}}>
                                <Typography>Agency Logo</Typography>
                                <Typography>
                                    <input
                                        type="file"
                                        placeholder="Agency Logo"
                                        name="agencyLogo"
                                        accept="image/*"
                                        onChange={async ({ target: { files } }) => {
                                            try {
                                                const token = await getAccessToken();
                                                const formData = new FormData();
                                                formData.append('file', files[0]);
                                                const {
                                                    data: {
                                                        item: { secure_url }
                                                    }
                                                } = await axios.post('reports/file-upload', formData, {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                                });
                                                handleChange({ target: { name: 'agencyLogo', value: secure_url } });
                                                // console.log(respData);
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }}
                                    />
                                    {values?.agencyLogo ? (
                                        <img src={values?.agencyLogo} style={{ height: '50px', width: '50px' }} alt="Agency Logo" />
                                    ) : (
                                        ''
                                    )}
                                </Typography>
                            </Box>{' '}
                            <Box sx={{}}>
                                <Typography>Agency Logo</Typography>
                                <Typography>
                                    <input
                                        type="file"
                                        placeholder="Client Logo"
                                        name="clientLogo"
                                        accept="image/*"
                                        onChange={async ({ target: { files } }) => {
                                            try {
                                                const token = await getAccessToken();
                                                const formData = new FormData();
                                                formData.append('file', files[0]);
                                                const {
                                                    data: {
                                                        item: { secure_url }
                                                    }
                                                } = await axios.post('reports/file-upload', formData, {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                                });
                                                handleChange({ target: { name: 'clientLogo', value: secure_url } });
                                                // console.log(respData);
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }}
                                    />
                                    {values?.clientLogo ? (
                                        <img src={values?.clientLogo} style={{ height: '50px', width: '50px' }} alt="Client Logo" />
                                    ) : (
                                        ''
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                        <PlatformSelection
                            {...{ options: keysAndPlatforms.platforms, selectedPlatforms: values?.platforms, handlePlatformSelection }}
                        />
                        <BRButton type="submit" sx={{ color: '#fff', display: 'inline-block', mt: 2, width: '150px' }}>
                            Create report
                        </BRButton>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
}

const PlatformSelection = ({ options = [], selectedPlatforms, handlePlatformSelection }) => {
    return (
        <Box sx={{}}>
            <Typography>Social media</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                {options.map((platform) => {
                    return (
                        <Typography
                            key={platform}
                            component="div"
                            sx={{
                                cursor: 'pointer',
                                p: 0,
                                width: '70px',
                                border: `1px solid ${selectedPlatforms?.includes(platform) ? '#0C22E5' : '#CCD3D9'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                position: 'relative',
                                height: '64px'
                            }}
                            onClick={() => {
                                handlePlatformSelection?.(platform);
                            }}
                        >
                            <Typography sx={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                                {selectedPlatforms?.includes(platform) ? (
                                    <Typography
                                        component="span"
                                        sx={{
                                            height: '14px',
                                            width: '14px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)'
                                        }}
                                    >
                                        <FaCheck size={10} color="#fff" />
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{
                                            border: '1px solid #667185',
                                            background: '#fff',
                                            height: '14px',
                                            width: '14px',
                                            borderRadius: '3px'
                                        }}
                                    />
                                )}
                            </Typography>
                            <SocialIcons platform={platform} />
                        </Typography>
                    );
                })}
            </Box>
        </Box>
    );
};

const KeywordSelection = ({ options = [], selectedKeywords, handleKeywordSelection }) => {
    return (
        <Box sx={{}}>
            <Typography>Keywords</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                {options.map((keyword) => {
                    return (
                        <Typography
                            key={keyword.title}
                            component="div"
                            sx={{
                                cursor: 'pointer',
                                p: 0,
                                minWidth: '70px',
                                border: `1px solid ${selectedKeywords?.includes(keyword) ? '#0C22E5' : '#CCD3D9'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                position: 'relative',
                                height: '45px'
                            }}
                            onClick={() => {
                                handleKeywordSelection?.(keyword._id);
                            }}
                        >
                            <Typography sx={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                                {selectedKeywords?.includes(keyword?._id) ? (
                                    <Typography
                                        component="span"
                                        sx={{
                                            height: '14px',
                                            width: '14px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)'
                                        }}
                                    >
                                        <FaCheck size={10} color="#fff" />
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{
                                            border: '1px solid #667185',
                                            background: '#fff',
                                            height: '14px',
                                            width: '14px',
                                            borderRadius: '3px'
                                        }}
                                    />
                                )}
                            </Typography>
                            <Typography component="span" sx={{ mx: 2 }}>
                                {keyword.title}
                            </Typography>
                        </Typography>
                    );
                })}
            </Box>
        </Box>
    );
};
