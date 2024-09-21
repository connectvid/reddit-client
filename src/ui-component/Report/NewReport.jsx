import { IconButton } from '@material-ui/core';
import { Autocomplete, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BRInput from 'ui-component/bizreply/BRInput';
import React from 'react';
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

export default function ({ projects = [], project }) {
    const { getAccessToken } = useAuth();
    const initVals = {
        projectName: '',
        projectDescription: '',
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
    const handleKeywordSelection = (keyword) => {
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
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'rgba(241, 241, 241, 1)',
                    padding: '16px'
                }}
            >
                Create a new project
                <IconButton sx={{ border: '2px solid #000' }}>
                    {/* onClick={() => navigate('/some-path')} */}
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ width: '100%', display: 'block', mb: 2 }}>
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
                    <BRInput
                        label="Project Name"
                        placeholder="Enter project name"
                        name="projectName"
                        value={values.projectName}
                        handleChange={handleChange}
                        required
                    />
                    <BRInput
                        label="Project Description"
                        placeholder="Enter project descripion"
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
                    <KeywordSelection
                        {...{ handleKeywordSelection, selectedKeywords: values?.keywords, options: keysAndPlatforms.keywords }}
                    />
                    <BRButton type="submit" sx={{ color: '#fff', display: 'inline-block', mt: 2, width: '150px' }}>
                        Create report
                    </BRButton>
                </form>
            </Box>
        </Box>
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
