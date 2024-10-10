/* eslint-disable no-unreachable */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import { Autocomplete, Box, CircularProgress, Switch, TextField, Typography } from '@mui/material';
import { updatedAdvancedProjectSettingStatus, updateProjectAdvancedSettingAPI, clearingError } from 'features/project/projectActions';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import AiModels from 'ui-component/AiModels';
import BRButton from 'ui-component/bizreply/BRButton';
import PlatformSelection from 'ui-component/PlatformSelection';
import errorMsgHelper from 'utils/errorMsgHelper';

export default function ({
    formContentSx = { width: { lg: '50%', md: '80%', xs: '100%' } },
    submitButtonSx = {},
    wrapperSx = {
        p: 3,
        mt: 4
    },
    title = 'Mention settings',
    platformCardSx = {},
    switchSx = {}
}) {
    const {
        project: { loading, project, projects, updatedAdvancedProjectSetting, updateAdvancedProjectSettingLoading, error },
        subscription: { subscription },
        aiModel: { selectedAiModel, aiModelsGroup, aiModelsString }
    } = useSelector((s) => s);
    const { getAccessToken } = useAuth();
    const [checked, setChecked] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [aIkey, setAIkey] = useState('');
    const [needAddAIkey, setNeedAddAIkey] = useState(false);
    const [actionType, setActionType] = useState(''); // add, update

    // console.log({ needAddAIkey });

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const fetchTimings = [
        // { label: '1 day', value: 1 },
        // // { label: '24  Hours', value: 1 },
        // { label: '2 days', value: 2 },
        // { label: '3 days', value: 3 },
        // { label: '4 days', value: 4 },
        // { label: '5 days', value: 5 },
        // { label: '6 days', value: 6 },
        // { label: '7 days', value: 7 },
        // { label: '15 days', value: 15 },
        // { label: '30 days', value: 30 }
        { label: 'Every day', value: 1 },
        { label: 'Every week', value: 7 },
        { label: 'Every month', value: 30 },
        { label: 'Every year', value: 365 }
    ];

    const postsPerRequests = [20, 30, 40, 50, 100];
    const [values, setValues] = useState({
        country: 'us',
        language: 'en',
        fetchTiming: fetchTimings[0].value,
        postsPerRequest: postsPerRequests[0]
    });

    useEffect(() => {
        if (project) {
            setValues({
                country: project?.country,
                language: project?.language,
                fetchTiming: project?.fetchTiming,
                postsPerRequest: project?.postsPerRequest
            });
            setChecked(project?.autoFetch);
        }
        if (selectedAiModel) {
            setSelectedModel(selectedAiModel);
        }
    }, []);

    useEffect(() => {
        if (error) {
            toast.warn(error);
            clearingError(null)();
        }
    }, [error]);

    useEffect(() => {
        if (selectedModel?.model) {
            const { modelGroupName } = selectedModel;
            if (!aiModelsGroup?.[modelGroupName]) {
                if (needAddAIkey) {
                    return;
                }
                setNeedAddAIkey(true);
                setActionType('add');
            } else if (needAddAIkey) {
                setNeedAddAIkey(false);
            }
        }
    }, [selectedModel?.model]);

    useEffect(() => {
        if (updatedAdvancedProjectSetting) {
            toast.success(`Data has been updated`);
            updatedAdvancedProjectSettingStatus(false)();
            if (needAddAIkey) {
                setNeedAddAIkey(false);
                setAIkey('');
            }
            if (actionType) {
                console.log(`Clean actionType`);
                setActionType('');
            }
        }
    }, [updatedAdvancedProjectSetting]);
    // console.log({ actionType });
    useEffect(() => {
        if (project?.platforms?.length) setSelectedPlatforms(project?.platforms);
        return () => {
            setSelectedPlatforms([]);
        };
    }, [project?.platforms?.length]);

    const updateProjectAdvancedSettings = async () => {
        try {
            if (!projects?.length) {
                toast.warn(`Please create a new project first to setup advance settings!`);
                return;
            }
            if (!project) {
                toast.warn(`Please select a project first to setup advance settings!`);
                return;
            }
            if (needAddAIkey && !aIkey?.trim?.()) {
                toast.warn(`Please enter ${selectedModel?.modelGroupName} API key!`);
                return;
            }
            const token = await getAccessToken();
            const platforms = selectedPlatforms;
            const ai_model = {
                actionType,
                modelId: aiModelsGroup[selectedModel?.modelGroupName],
                aIkey,
                ...selectedModel
            };
            /*=============================================
            =            seting actionType            =
            =============================================*/
            if (
                (!actionType &&
                    aiModelsGroup?.[selectedModel?.modelGroupName] &&
                    ai_model?.model &&
                    !aiModelsString?.includes?.(ai_model?.model)) ||
                (aiModelsString?.includes?.(ai_model?.model) && aIkey && needAddAIkey)
            ) {
                ai_model.actionType = 'update';
            }
            /*=====  End of seting actionType  ======*/
            const body = {
                platforms,
                // projectId: project?._id,
                ...values,
                autoFetch: checked,
                ai_model
            };
            updateProjectAdvancedSettingAPI({ token, data: body, id: project?._id })();
            // console.log(body);
        } catch (e) {
            console.error(e);
            toast.warn(errorMsgHelper(e));
        }
    };

    const handleSelectedPlatform = (platform) => {
        if (!selectedPlatforms.includes(platform)) {
            setSelectedPlatforms((p) => [...p, platform]);
        } else {
            setSelectedPlatforms(selectedPlatforms.filter((item) => item !== platform));
        }
    };

    return (
        <>
            <Box
                sx={{
                    background: '#fff',
                    borderRadius: '10px',
                    ...wrapperSx
                }}
            >
                <Box>
                    {title ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4" style={{ fontWeight: 700, fontSize: '18px' }}>
                                {title}
                            </Typography>
                        </Box>
                    ) : (
                        ''
                    )}
                    {loading ? (
                        <></>
                    ) : (
                        <Box sx={{ minWidth: '300px', mt: 0, ...formContentSx }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: '100%' }}>
                                    <Typography style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '16px' }}>
                                        Choose Country
                                    </Typography>
                                    <Autocomplete
                                        fullWidth
                                        onChange={(_, data) => {
                                            if (data) setValues((p) => ({ ...p, country: data.code }));
                                            return data;
                                        }}
                                        getOptionLabel={(item) => item.name}
                                        defaultValue={countries.find((im) => im.code === project?.country)}
                                        disablePortal
                                        options={countries}
                                        sx={{
                                            mt: 1,
                                            mb: 2
                                        }}
                                        disableClearable
                                        renderInput={(params) => <TextField fullWidth {...params} required placeholder="Choose language" />}
                                    />
                                </Box>

                                <Box sx={{ width: '100%' }}>
                                    <Typography style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '16px' }}>
                                        Choose language
                                    </Typography>
                                    <Autocomplete
                                        fullWidth
                                        onChange={(_, data) => {
                                            if (data) setValues((p) => ({ ...p, language: data.value }));
                                            return data;
                                        }}
                                        defaultValue={languages.find((im) => im.value === project?.language)}
                                        disablePortal
                                        options={languages}
                                        sx={{ mt: 1, mb: 2 }}
                                        disableClearable
                                        renderInput={(params) => <TextField fullWidth {...params} required placeholder="Choose language" />}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>When to fetch posts</Typography>
                                <Autocomplete
                                    id="Whentofetchposts"
                                    disablePortal
                                    onChange={(_, data) => {
                                        if (data) setValues((p) => ({ ...p, fetchTiming: data?.value }));
                                        return data;
                                    }}
                                    defaultValue={fetchTimings?.find?.((im) => im.value === project?.fetchTiming)}
                                    options={fetchTimings}
                                    sx={{ minWidth: 250, mt: 1, mb: 2 }}
                                    disableClearable
                                    renderInput={(params) => <TextField fullWidth {...params} required placeholder="When to fetch posts" />}
                                />
                            </Box>
                            <Box>
                                <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Number of posts to fetch on each request
                                </Typography>
                                <Autocomplete
                                    id="Numberofpoststofetchoneachrequest"
                                    fullWidth
                                    onChange={(_, data) => {
                                        if (data) setValues((p) => ({ ...p, postsPerRequest: data }));
                                        return data;
                                    }}
                                    defaultValue={project?.postsPerRequest}
                                    getOptionLabel={(item) => item}
                                    disablePortal
                                    options={postsPerRequests}
                                    sx={{
                                        mt: 1,
                                        mb: 2
                                    }}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} required placeholder="Number of posts to fetch on each request" />
                                    )}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'start',
                                    ...switchSx
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Auto fetching</Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    Off
                                    <Switch checked={checked} onChange={handleChange} color="secondary" />
                                    On
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
                <PlatformSelection
                    {...{
                        platforms: subscription?.platforms,
                        selectedPlatforms,
                        handleSelectedPlatform,
                        sx: { mt: 2 },
                        cardSx: { ...platformCardSx },
                        platformsSx: { gap: 1 }
                    }}
                />
                <AiModels {...{ selectedModel, setSelectedModel, aIkey, setAIkey, needAddAIkey, setNeedAddAIkey, setActionType }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'right', my: 2, ...submitButtonSx }}>
                <BRButton
                    sx={{ height: '40px', width: '180px' }}
                    disabled={updateAdvancedProjectSettingLoading}
                    variant="contained"
                    onClick={updateProjectAdvancedSettings}
                >
                    {updateAdvancedProjectSettingLoading ? (
                        <CircularProgress sx={{ maxHeight: '20px', maxWidth: '20px', ml: 1 }} />
                    ) : (
                        'Save Changes'
                    )}
                </BRButton>
            </Box>
        </>
    );
}

export const languages = [
    { value: 'af', label: 'Afrikaans' },
    { value: 'ak', label: 'Akan' },
    { value: 'sq', label: 'Albanian' },
    { value: 'am', label: 'Amharic' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hy', label: 'Armenian' },
    { value: 'az', label: 'Azerbaijani' },
    { value: 'eu', label: 'Basque' },
    { value: 'be', label: 'Belarusian' },
    { value: 'bem', label: 'Bemba' },
    { value: 'bn', label: 'Bengali' },
    { value: 'bh', label: 'Bihari' },
    { value: 'xx-bork', label: 'Bork, bork, bork!' },
    { value: 'bs', label: 'Bosnian' },
    { value: 'br', label: 'Breton' },
    { value: 'bg', label: 'Bulgarian' },
    { value: 'km', label: 'Cambodian' },
    { value: 'ca', label: 'Catalan' },
    { value: 'chr', label: 'Cherokee' },
    { value: 'ny', label: 'Chichewa' },
    { value: 'zh-cn', label: 'Chinese (Simplified)' },
    { value: 'zh-tw', label: 'Chinese (Traditional)' },
    { value: 'co', label: 'Corsican' },
    { value: 'hr', label: 'Croatian' },
    { value: 'cs', label: 'Czech' },
    { value: 'da', label: 'Danish' },
    { value: 'nl', label: 'Dutch' },
    { value: 'xx-elmer ', label: 'Elmer Fudd' },
    { value: 'en', label: 'English' },
    { value: 'eo', label: 'Esperanto' },
    { value: 'et', label: 'Estonian' },
    { value: 'ee', label: 'Ewe' },
    { value: 'fo', label: 'Faroese' },
    { value: 'tl', label: 'Filipino' },
    { value: 'fi', label: 'Finnish' },
    { value: 'fr', label: 'French' },
    { value: 'fy', label: 'Frisian' },
    { value: 'gaa', label: 'Ga' },
    { value: 'gl', label: 'Galician' },
    { value: 'ka', label: 'Georgian' },
    { value: 'de', label: 'German' },
    { value: 'el', label: 'Greek' },
    { value: 'gn', label: 'Guarani' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'xx-hacker ', label: 'Hacker' },
    { value: 'ht', label: 'Haitian Creole' },
    { value: 'ha', label: 'Hausa' },
    { value: 'haw', label: 'Hawaiian' },
    { value: 'iw', label: 'Hebrew' },
    { value: 'hi', label: 'Hindi' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'is', label: 'Icelandic' },
    { value: 'ig', label: 'Igbo' },
    { value: 'id', label: 'Indonesian' },
    { value: 'ia', label: 'Interlingua' },
    { value: 'ga', label: 'Irish' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'jw', label: 'Javanese' },
    { value: 'kn', label: 'Kannada' },
    { value: 'kk', label: 'Kazakh' },
    { value: 'rw', label: 'Kinyarwanda' },
    { value: 'rn', label: 'Kirundi' },
    { value: 'xx-klingon', label: 'Klingon' },
    { value: 'kg', label: 'Kongo' },
    { value: 'ko', label: 'Korean' },
    { value: 'kri', label: 'Krio (Sierra Leone)' },
    { value: 'ku', label: 'Kurdish' },
    { value: 'ckb', label: 'Kurdish (Soran\xee)' },
    { value: 'ky', label: 'Kyrgyz' },
    { value: 'lo', label: 'Laothian' },
    { value: 'la', label: 'Latin' },
    { value: 'lv', label: 'Latvian' },
    { value: 'ln', label: 'Lingala' },
    { value: 'lt', label: 'Lithuanian' },
    { value: 'loz', label: 'Lozi' },
    { value: 'lg', label: 'Luganda' },
    { value: 'ach', label: 'Luo' },
    { value: 'mk', label: 'Macedonian' },
    { value: 'mg', label: 'Malagasy' },
    { value: 'ms', label: 'Malay' },
    { value: 'ml', label: 'Malayalam' },
    { value: 'mt', label: 'Maltese' },
    { value: 'mi', label: 'Maori' },
    { value: 'mr', label: 'Marathi' },
    { value: 'mfe', label: 'Mauritian Creole' },
    { value: 'mo', label: 'Moldavian' },
    { value: 'mn', label: 'Mongolian' },
    { value: 'sr-ME', label: 'Montenegrin' },
    { value: 'ne', label: 'Nepali' },
    { value: 'pcm', label: 'Nigerian Pidgin' },
    { value: 'nso', label: 'Northern Sotho' },
    { value: 'no', label: 'Norwegian' },
    { value: 'nn', label: 'Norwegian (Nynorsk)' },
    { value: 'oc', label: 'Occitan' },
    { value: 'or', label: 'Oriya' },
    { value: 'om', label: 'Oromo' },
    { value: 'ps', label: 'Pashto' },
    { value: 'fa', label: 'Persian' },
    { value: 'xx-pirate', label: 'Pirate' },
    { value: 'pl', label: 'Polish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'pt-br', label: 'Portuguese (Brazil)' },
    { value: 'pt-pt', label: 'Portuguese (Portugal)' },
    { value: 'pa', label: 'Punjabi' },
    { value: 'qu', label: 'Quechua' },
    { value: 'ro', label: 'Romanian' },
    { value: 'rm', label: 'Romansh' },
    { value: 'nyn', label: 'Runyakitara' },
    { value: 'ru', label: 'Russian' },
    { value: 'gd', label: 'Scots Gaelic' },
    { value: 'sr', label: 'Serbian' },
    { value: 'sh', label: 'Serbo-Croatian' },
    { value: 'st', label: 'Sesotho' },
    { value: 'tn', label: 'Setswana' },
    { value: 'crs', label: 'Seychellois Creole' },
    { value: 'sn', label: 'Shona' },
    { value: 'sd', label: 'Sindhi' },
    { value: 'si', label: 'Sinhalese' },
    { value: 'sk', label: 'Slovak' },
    { value: 'sl', label: 'Slovenian' },
    { value: 'so', label: 'Somali' },
    { value: 'es', label: 'Spanish' },
    { value: 'es-419', label: 'Spanish (Latin American)' },
    { value: 'su', label: 'Sundanese' },
    { value: 'sw', label: 'Swahili' },
    { value: 'sv', label: 'Swedish' },
    { value: 'tg', label: 'Tajik' },
    { value: 'ta', label: 'Tamil' },
    { value: 'tt', label: 'Tatar' },
    { value: 'te', label: 'Telugu' },
    { value: 'th', label: 'Thai' },
    { value: 'ti', label: 'Tigrinya' },
    { value: 'to', label: 'Tonga' },
    { value: 'lua', label: 'Tshiluba' },
    { value: 'tum', label: 'Tumbuka' },
    { value: 'tr', label: 'Turkish' },
    { value: 'tk', label: 'Turkmen' },
    { value: 'tw', label: 'Twi' },
    { value: 'ug', label: 'Uighur' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'ur', label: 'Urdu' },
    { value: 'uz', label: 'Uzbek' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'cy', label: 'Welsh' },
    { value: 'wo', label: 'Wolof' },
    { value: 'xh', label: 'Xhosa' },
    { value: 'yi', label: 'Yiddish' },
    { value: 'yo', label: 'Yoruba' },
    { value: 'zu', label: 'Zulu' }
];

export const countries = [
    { code: 'af', name: '🇦🇫 Afghanistan' },
    { code: 'al', name: '🇦🇱 Albania' },
    { code: 'dz', name: '🇩🇿 Algeria' },
    { code: 'as', name: '🇦🇸 American Samoa' },
    { code: 'ad', name: '🇦🇩 Andorra' },
    { code: 'ao', name: '🇦🇴 Angola' },
    { code: 'ai', name: '🇦🇮 Anguilla' },
    { code: 'aq', name: '🇦🇶 Antarctica' },
    { code: 'ag', name: '🇦🇬 Antigua and Barbuda' },
    { code: 'ar', name: '🇦🇷 Argentina' },
    { code: 'am', name: '🇦🇲 Armenia' },
    { code: 'aw', name: '🇦🇼 Aruba' },
    { code: 'au', name: '🇦🇺 Australia' },
    { code: 'at', name: '🇦🇹 Austria' },
    { code: 'az', name: '🇦🇿 Azerbaijan' },
    { code: 'bs', name: '🇧🇸 Bahamas' },
    { code: 'bh', name: '🇧🇭 Bahrain' },
    { code: 'bd', name: '🇧🇩 Bangladesh' },
    { code: 'bb', name: '🇧🇧 Barbados' },
    { code: 'by', name: '🇧🇾 Belarus' },
    { code: 'be', name: '🇧🇪 Belgium' },
    { code: 'bz', name: '🇧🇿 Belize' },
    { code: 'bj', name: '🇧🇯 Benin' },
    { code: 'bm', name: '🇧🇲 Bermuda' },
    { code: 'bt', name: '🇧🇹 Bhutan' },
    { code: 'bo', name: '🇧🇴 Bolivia' },
    { code: 'ba', name: '🇧🇦 Bosnia and Herzegovina' },
    { code: 'bw', name: '🇧🇼 Botswana' },
    { code: 'bv', name: '🇧🇻 Bouvet Island' },
    { code: 'br', name: '🇧🇷 Brazil' },
    { code: 'io', name: '🇮🇴 British Indian Ocean Territory' },
    { code: 'bn', name: '🇧🇳 Brunei Darussalam' },
    { code: 'bg', name: '🇧🇬 Bulgaria' },
    { code: 'bf', name: '🇧🇫 Burkina Faso' },
    { code: 'bi', name: '🇧🇮 Burundi' },
    { code: 'kh', name: '🇰🇭 Cambodia' },
    { code: 'cm', name: '🇨🇲 Cameroon' },
    { code: 'ca', name: '🇨🇦 Canada' },
    { code: 'cv', name: '🇨🇻 Cape Verde' },
    { code: 'ky', name: '🇰🇾 Cayman Islands' },
    { code: 'cf', name: '🇨🇫 Central African Republic' },
    { code: 'td', name: '🇹🇩 Chad' },
    { code: 'cl', name: '🇨🇱 Chile' },
    { code: 'cn', name: '🇨🇳 China' },
    { code: 'cx', name: '🇨🇽 Christmas Island' },
    { code: 'cc', name: '🇨🇨 Cocos (Keeling) Islands' },
    { code: 'co', name: '🇨🇴 Colombia' },
    { code: 'km', name: '🇰🇲 Comoros' },
    { code: 'cg', name: '🇨🇩 Congo' },
    { code: 'cd', name: '🇨🇬 Congo, the Democratic Republic of the' },
    { code: 'ck', name: '🇨🇰 Cook Islands' },
    { code: 'cr', name: '🇨🇷 Costa Rica' },
    { code: 'ci', name: "🇨🇮 Cote D'ivoire" },
    { code: 'hr', name: '🇭🇷 Croatia' },
    { code: 'cu', name: '🇨🇺 Cuba' },
    { code: 'cy', name: '🇨🇾 Cyprus' },
    { code: 'cz', name: '🇨🇿 Czech Republic' },
    { code: 'dk', name: '🇩🇰 Denmark' },
    { code: 'dj', name: '🇩🇯 Djibouti' },
    { code: 'dm', name: '🇩🇲 Dominica' },
    { code: 'do', name: '🇩🇴 Dominican Republic' },
    { code: 'ec', name: '🇪🇨 Ecuador' },
    { code: 'eg', name: '🇪🇬 Egypt' },
    { code: 'sv', name: '🇸🇻 El Salvador' },
    { code: 'gq', name: '🇬🇶 Equatorial Guinea' },
    { code: 'er', name: '🇪🇷 Eritrea' },
    { code: 'ee', name: '🇪🇪 Estonia' },
    { code: 'et', name: '🇪🇹 Ethiopia' },
    { code: 'fk', name: '🇫🇰 Falkland Islands (Malvinas)' },
    { code: 'fo', name: '🇫🇴 Faroe Islands' },
    { code: 'fj', name: '🇫🇯 Fiji' },
    { code: 'fi', name: '🇫🇮 Finland' },
    { code: 'fr', name: '🇫🇷 France' },
    { code: 'gf', name: '🇬🇫 French Guiana' },
    { code: 'pf', name: '🇵🇫 French Polynesia' },
    { code: 'tf', name: '🇹🇫 French Southern Territories' },
    { code: 'ga', name: '🇬🇦 Gabon' },
    { code: 'gm', name: '🇬🇲 Gambia' },
    { code: 'ge', name: '🇬🇪 Georgia' },
    { code: 'de', name: '🇩🇪 Germany' },
    { code: 'gh', name: '🇬🇭 Ghana' },
    { code: 'gi', name: '🇬🇮 Gibraltar' },
    { code: 'gr', name: '🇬🇷 Greece' },
    { code: 'gl', name: '🇬🇱 Greenland' },
    { code: 'gd', name: '🇬🇩 Grenada' },
    { code: 'gp', name: '🇬🇵 Guadeloupe' },
    { code: 'gu', name: '🇬🇺 Guam' },
    { code: 'gt', name: '🇬🇹 Guatemala' },
    { code: 'gn', name: '🇬🇳 Guinea' },
    { code: 'gw', name: '🇬🇼 Guinea-Bissau' },
    { code: 'gy', name: '🇬🇾 Guyana' },
    { code: 'ht', name: '🇭🇹 Haiti' },
    { code: 'hm', name: '🇭🇲 Heard Island and Mcdonald Islands' },
    { code: 'va', name: '🇻🇦 Holy See (Vatican City State)' },
    { code: 'hn', name: '🇭🇳 Honduras' },
    { code: 'hk', name: '🇭🇰 Hong Kong' },
    { code: 'hu', name: '🇭🇺 Hungary' },
    { code: 'is', name: '🇮🇸 Iceland' },
    { code: 'in', name: '🇮🇳 India' },
    { code: 'id', name: '🇮🇩 Indonesia' },
    { code: 'ir', name: '🇮🇷 Iran, Islamic Republic of' },
    { code: 'iq', name: '🇮🇶 Iraq' },
    { code: 'ie', name: '🇮🇪 Ireland' },
    { code: 'il', name: '🇮🇱 Israel' },
    { code: 'it', name: '🇮🇹 Italy' },
    { code: 'jm', name: '🇯🇲 Jamaica' },
    { code: 'jp', name: '🇯🇵 Japan' },
    { code: 'jo', name: '🇯🇴 Jordan' },
    { code: 'kz', name: '🇰🇿 Kazakhstan' },
    { code: 'ke', name: '🇰🇪 Kenya' },
    { code: 'ki', name: '🇰🇮 Kiribati' },
    { code: 'kp', name: "🇰🇵 Korea, Democratic People's Republic of" },
    { code: 'kr', name: '🇰🇷 Korea, Republic of' },
    { code: 'kw', name: '🇰🇼 Kuwait' },
    { code: 'kg', name: '🇰🇬 Kyrgyzstan' },
    { code: 'la', name: "🇱🇦 Lao People's Democratic Republic" },
    { code: 'lv', name: '🇱🇻 Latvia' },
    { code: 'lb', name: '🇱🇧 Lebanon' },
    { code: 'ls', name: '🇱🇸 Lesotho' },
    { code: 'lr', name: '🇱🇷 Liberia' },
    { code: 'ly', name: '🇱🇾 Libyan Arab Jamahiriya' },
    { code: 'li', name: '🇱🇮 Liechtenstein' },
    { code: 'lt', name: '🇱🇹 Lithuania' },
    { code: 'lu', name: '🇱🇺 Luxembourg' },
    { code: 'mo', name: '🇲🇴 Macao' },
    { code: 'mk', name: '🇲🇰 Macedonia, the Former Yugosalv Republic of' },
    { code: 'mg', name: '🇲🇬 Madagascar' },
    { code: 'mw', name: '🇲🇼 Malawi' },
    { code: 'my', name: '🇲🇾 Malaysia' },
    { code: 'mv', name: '🇲🇻 Maldives' },
    { code: 'ml', name: '🇲🇱 Mali' },
    { code: 'mt', name: '🇲🇹 Malta' },
    { code: 'mh', name: '🇲🇭 Marshall Islands' },
    { code: 'mq', name: '🇲🇶 Martinique' },
    { code: 'mr', name: '🇲🇷 Mauritania' },
    { code: 'mu', name: '🇲🇺 Mauritius' },
    { code: 'yt', name: '🇾🇹 Mayotte' },
    { code: 'mx', name: '🇲🇽 Mexico' },
    { code: 'fm', name: '🇫🇲 Micronesia, Federated States of' },
    { code: 'md', name: '🇲🇩 Moldova, Republic of' },
    { code: 'mc', name: '🇲🇨 Monaco' },
    { code: 'mn', name: '🇲🇳 Mongolia' },
    { code: 'ms', name: '🇲🇸 Montserrat' },
    { code: 'ma', name: '🇲🇦 Morocco' },
    { code: 'mz', name: '🇲🇿 Mozambique' },
    { code: 'mm', name: '🇲🇲 Myanmar' },
    { code: 'na', name: '🇳🇦 Namibia' },
    { code: 'nr', name: '🇳🇷 Nauru' },
    { code: 'np', name: '🇳🇵Nepal' },
    { code: 'nl', name: '🇳🇱 Netherlands' },
    { code: 'an', name: '🇧🇶 Netherlands Antilles' },
    { code: 'nc', name: '🇳🇨 New Caledonia' },
    { code: 'nz', name: '🇳🇿 New Zealand' },
    { code: 'ni', name: '🇳🇮 Nicaragua' },
    { code: 'ne', name: '🇳🇪 Niger' },
    { code: 'ng', name: '🇳🇬 Nigeria' },
    { code: 'nu', name: '🇳🇺 Niue' },
    { code: 'nf', name: '🇳🇫 Norfolk Island' },
    { code: 'mp', name: '🇲🇵 Northern Mariana Islands' },
    { code: 'no', name: '🇳🇴 Norway' },
    { code: 'om', name: '🇴🇲 Oman' },
    { code: 'pk', name: '🇵🇰 Pakistan' },
    { code: 'pw', name: '🇵🇼 Palau' },
    { code: 'ps', name: '🇵🇸 Palestinian Territory, Occupied' },
    { code: 'pa', name: '🇵🇦 Panama' },
    { code: 'pg', name: '🇵🇬 Papua New Guinea' },
    { code: 'py', name: '🇵🇾 Paraguay' },
    { code: 'pe', name: '🇵🇪 Peru' },
    { code: 'ph', name: '🇵🇭 Philippines' },
    { code: 'pn', name: '🇵🇳 Pitcairn' },
    { code: 'pl', name: '🇵🇱 Poland' },
    { code: 'pt', name: '🇵🇹 Portugal' },
    { code: 'pr', name: '🇵🇷 Puerto Rico' },
    { code: 'qa', name: '🇶🇦 Qatar' },
    { code: 're', name: '🇷🇪 Reunion' },
    { code: 'ro', name: '🇷🇴 Romania' },
    { code: 'ru', name: '🇷🇺 Russian Federation' },
    { code: 'rw', name: '🇷🇼 Rwanda' },
    { code: 'sh', name: '🇸🇭 Saint Helena' },
    { code: 'kn', name: '🇰🇳 Saint Kitts and Nevis' },
    { code: 'lc', name: '🇱🇨 Saint Lucia' },
    { code: 'pm', name: '🇵🇲 Saint Pierre and Miquelon' },
    { code: 'vc', name: '🇻🇨 Saint Vincent and the Grenadines' },
    { code: 'ws', name: '🇼🇸 Samoa' },
    { code: 'sm', name: '🇸🇲 San Marino' },
    { code: 'st', name: '🇸🇹 Sao Tome and Principe' },
    { code: 'sa', name: '🇸🇦 Saudi Arabia' },
    { code: 'sn', name: '🇸🇳 Senegal' },
    { code: 'rs', name: '🇷🇸 Serbia and Montenegro' },
    { code: 'sc', name: '🇸🇨 Seychelles' },
    { code: 'sl', name: '🇸🇱 Sierra Leone' },
    { code: 'sg', name: '🇸🇬 Singapore' },
    { code: 'sk', name: '🇸🇰 Slovakia' },
    { code: 'si', name: '🇸🇮 Slovenia' },
    { code: 'sb', name: '🇸🇧 Solomon Islands' },
    { code: 'so', name: '🇸🇴 Somalia' },
    { code: 'za', name: '🇿🇦 South Africa' },
    { code: 'gs', name: '🇬🇸 South Georgia and the South Sandwich Islands' },
    { code: 'es', name: '🇪🇸 Spain' },
    { code: 'lk', name: '🇱🇰 Sri Lanka' },
    { code: 'sd', name: '🇸🇩 Sudan' },
    { code: 'sr', name: '🇸🇷 Suriname' },
    { code: 'sj', name: '🇸🇯 Svalbard and Jan Mayen' },
    { code: 'sz', name: '🇸🇿 Swaziland' },
    { code: 'se', name: '🇸🇪 Sweden' },
    { code: 'ch', name: '🇨🇭 Switzerland' },
    { code: 'sy', name: '🇸🇾 Syrian Arab Republic' },
    { code: 'tw', name: '🇹🇼 Taiwan, Province of China' },
    { code: 'tj', name: '🇹🇯 Tajikistan' },
    { code: 'tz', name: '🇹🇿 Tanzania, United Republic of' },
    { code: 'th', name: '🇹🇭 Thailand' },
    { code: 'tl', name: '🇹🇱 Timor-Leste' },
    { code: 'tg', name: '🇹🇬 Togo' },
    { code: 'tk', name: '🇹🇰 Tokelau' },
    { code: 'to', name: '🇹🇴 Tonga' },
    { code: 'tt', name: '🇹🇹 Trinidad and Tobago' },
    { code: 'tn', name: '🇹🇳 Tunisia' },
    { code: 'tr', name: '🇹🇷 Turkey' },
    { code: 'tm', name: '🇹🇲 Turkmenistan' },
    { code: 'tc', name: '🇹🇨 Turks and Caicos Islands' },
    { code: 'tv', name: '🇹🇻 Tuvalu' },
    { code: 'ug', name: '🇺🇬 Uganda' },
    { code: 'ua', name: '🇺🇦 Ukraine' },
    { code: 'ae', name: '🇦🇪 United Arab Emirates' },
    { code: 'gb', name: '🇬🇧 United Kingdom' },
    { code: 'us', name: '🇺🇸 United States' },
    { code: 'um', name: '🇺🇲 United States Minor Outlying Islands' },
    { code: 'uy', name: '🇺🇾 Uruguay' },
    { code: 'uz', name: '🇺🇿 Uzbekistan' },
    { code: 'vu', name: '🇻🇺 Vanuatu' },
    { code: 've', name: '🇻🇪 Venezuela' },
    { code: 'vn', name: '🇻🇳 Viet Nam' },
    { code: 'vg', name: '🇻🇬 Virgin Islands, British' },
    { code: 'vi', name: '🇻🇮 Virgin Islands, U.S.' },
    { code: 'wf', name: '🇼🇫 Wallis and Futuna' },
    { code: 'eh', name: '🇪🇭 Western Sahara' },
    { code: 'ye', name: '🇾🇪 Yemen' },
    { code: 'zm', name: '🇿🇲 Zambia' },
    { code: 'zw', name: '🇿🇼 Zimbabwe' }
];
