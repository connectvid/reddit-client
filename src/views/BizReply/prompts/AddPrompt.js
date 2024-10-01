/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import { Autocomplete, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import { toast } from 'react-toastify';
import BRButton from 'ui-component/bizreply/BRButton';
import { LiaTimesCircle } from 'react-icons/lia';
import errorMsgHelper from 'utils/errorMsgHelper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addPromptAPI, updatePromptAPI } from 'features/prompt/promptActions';
import useAuth from 'hooks/useAuth';

const characters = [200, 300, 400, 500, 600, 700, 800, 900, 1000];

export default function ({ modalClose, initVals, isUpdate = false }) {
    const { getAccessToken } = useAuth();
    const initialValues = initVals
        ? {
              name: initVals?.name,
              language: initVals?.language,
              tone: initVals?.tone,
              reply_character_limit: initVals?.reply_character_limit,
              description: initVals?.description
              // name: '',
              // language: 'English',
              // tone: 'Formal',
              // reply_character_limit: 300,
              // description: ''
          }
        : {
              name: '',
              language: 'English',
              tone: 'Formal',
              reply_character_limit: 300,
              description: ''
          };
    // console.log({ initVals });
    const {
        prompt: { createLoading, updateLoading }
    } = useSelector((state) => state);

    // const remainingCredit = subscription?.remainingCredit;

    useEffect(() => {
        return () => {
            modalClose?.();
        };
    }, []);

    const handleSubmit = async (
        values // { setSubmitting, resetForm }
    ) => {
        try {
            // setSubmitting(true);
            // await changePassword(values?.password);
            const token = await getAccessToken();
            if (isUpdate) {
                updatePromptAPI(token, initVals._id, values)();
            } else {
                addPromptAPI(token, values)();
            }
            // resetForm();
        } catch (e) {
            console.log(e);
            toast.warn(errorMsgHelper(e));
        }
    };

    return (
        <>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '12px', m: 0, p: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '54px',
                        alignItems: 'center',
                        background: '#F1F1F1',
                        px: '20px',
                        borderRadius: '12px 12px 0 0'
                    }}
                >
                    <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>{isUpdate ? 'Update' : 'Create a new'} Prompt</Typography>
                    <Typography onClick={modalClose} sx={{ cursor: 'pointer' }}>
                        <LiaTimesCircle color="#000" size={24} />
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: '20px'
                    }}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                // .min(3, 'Name must be at least 3 characters')
                                // .max(100, 'Name must be at most 100 characters')
                                .required('Name is required'),
                            // prompt: Yup.string()
                            //     // .min(10, 'Prompt must be at least 10 characters')
                            //     // .max(500, 'Prompt must be at most 500 characters')
                            //     .required('Prompt is required')
                            description: Yup.string()
                                // .min(10, 'Description must be at least 10 characters')
                                // .max(500, 'Description must be at most 500 characters')
                                .required('Description is required')
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <Box
                                    sx={{
                                        mb: 2,
                                        display: 'flex', // justifyContent: 'space-between'
                                        gap: 2
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        <BRInput2
                                            placeholder="Enter your prompt name"
                                            label="Prompt Name"
                                            fullWidth
                                            required
                                            value={values.name || ''}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                        />
                                        {touched.name && errors.name && <Typography sx={{ color: 'red', mt: 1 }}>{errors.name}</Typography>}
                                    </Box>

                                    <Box sx={{ width: '100%' }}>
                                        <Autocomplete
                                            onChange={(_, data) => {
                                                setFieldValue('reply_character_limit', data);
                                                return data;
                                            }}
                                            onBlur={handleBlur}
                                            disablePortal
                                            value={values.reply_character_limit || ''}
                                            id="combo-box-demo"
                                            options={characters}
                                            getOptionLabel={(item) => item}
                                            sx={{ width: '100%' }}
                                            disableClearable
                                            renderInput={(params) => (
                                                <BRInput2
                                                    placeholder="Choose prompt reply_character_limit"
                                                    label="Choose Character Count"
                                                    fullWidth
                                                    required
                                                    name="reply_character_limit"
                                                    type="text"
                                                    {...params}
                                                />
                                            )}
                                        />
                                        {touched.reply_character_limit && errors.reply_character_limit && (
                                            <Typography sx={{ color: 'red', mt: 1 }}>{errors.reply_character_limit}</Typography>
                                        )}
                                    </Box>
                                </Box>

                                {/*  */}
                                <Box
                                    sx={{
                                        mb: 2,
                                        display: 'flex', // justifyContent: 'space-between'
                                        gap: 2
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        <Autocomplete
                                            onChange={(_, data) => {
                                                setFieldValue('language', data);
                                                return data;
                                            }}
                                            onBlur={handleBlur}
                                            // defaultValue={options.find((item) => item.value === dbUser?.openAIModel)}
                                            disablePortal
                                            value={values.language || ''}
                                            id="combo-box-demo"
                                            options={languates}
                                            getOptionLabel={(item) => item}
                                            sx={{ minWidth: 250 }}
                                            disableClearable
                                            renderInput={(params) => (
                                                <BRInput2
                                                    placeholder="Choose prompt language"
                                                    label="Choose Language"
                                                    fullWidth
                                                    required
                                                    name="language"
                                                    type="text"
                                                    {...params}
                                                />
                                            )}
                                            // renderInput={(params) => <TextField {...params} required placeholder="Choose Language" />}
                                        />
                                        {touched.language && errors.language && (
                                            <Typography sx={{ color: 'red', mt: 1 }}>{errors.language}</Typography>
                                        )}
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Autocomplete
                                            onChange={(_, data) => {
                                                setFieldValue('tone', data);
                                                return data;
                                            }}
                                            onBlur={handleBlur}
                                            disablePortal
                                            value={values.tone || ''}
                                            id="combo-box-demo"
                                            options={['Engaging', 'Ask Question', 'Formal', 'Informal', 'Funny', 'For Meeting', 'None']}
                                            getOptionLabel={(item) => item.toString()}
                                            sx={{ minWidth: 250 }}
                                            disableClearable
                                            renderInput={(params) => (
                                                <BRInput2
                                                    placeholder="Choose prompt tone"
                                                    label="Choose Tone"
                                                    fullWidth
                                                    required
                                                    name="tone"
                                                    type="text"
                                                    {...params}
                                                />
                                            )}
                                        />
                                        {touched.tone && errors.tone && <Typography sx={{ color: 'red', mt: 1 }}>{errors.tone}</Typography>}
                                    </Box>
                                </Box>
                                {/* <Box sx={{ mb: 2, display: 'flex', flex: { md: 'row', sm: 'column' } }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Autocomplete
                                            onChange={(_, data) => {
                                                setFieldValue('reply_character_limit', data);
                                                return data;
                                            }}
                                            onBlur={handleBlur}
                                            disablePortal
                                            value={values.reply_character_limit || ''}
                                            id="combo-box-demo"
                                            options={[300, 200]}
                                            getOptionLabel={(item) => item}
                                            sx={{ minWidth: 250 }}
                                            disableClearable
                                            renderInput={(params) => (
                                                <BRInput2
                                                    placeholder="Choose prompt reply_character_limit"
                                                    label="Choose Character Count"
                                                    fullWidth
                                                    required
                                                    name="reply_character_limit"
                                                    type="text"
                                                    {...params}
                                                />
                                            )}
                                        />
                                        {touched.reply_character_limit && errors.reply_character_limit && (
                                            <Typography sx={{ color: 'red', mt: 1 }}>{errors.reply_character_limit}</Typography>
                                        )}
                                    </Box>
                                </Box> */}
                                <Box sx={{ mb: 2, mt: 3 }}>
                                    <Typography sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 700 }}>
                                        Prompt description
                                    </Typography>

                                    <Typography sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 400 }}>
                                        {`Use {Social_Media}, {Brand_Name}, {Brand_Description} & {Brand_Domain} to use for writing persoalized replies`}
                                    </Typography>

                                    <BRInput2
                                        sx={{ height: 'unset' }}
                                        placeholder={`Write your prompt in as detail as possible including information on your brand voice, brand description, etc. You can also input examples of replies you would like to generate. Message us on support if you need any help for prompt writing.

Suggestion: Different platforms get better responses with different kinds of replies, for better results try to write unique ones for each.`}
                                        // label="Prompt description"
                                        fullWidth
                                        required
                                        multiline
                                        rows={9}
                                        value={values.description || ''}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                    />
                                    {touched.description && errors.description && (
                                        <Typography sx={{ color: 'red', mt: 1 }}>{errors.description}</Typography>
                                    )}
                                </Box>
                                {/* <Box sx={{ display: 'flex', gap: '10px', justifyContent: '', p: '20px' }}>
                                    {['{Brand_Name}', '{Brand_Domain}', '{Brand_Description}'].map((item) => (
                                        <Button
                                            key={item}
                                            type="button"
                                            onClick={() => setFieldValue('prompt', `${values.prompt?.trim?.() || ''} ${item}`)}
                                            disabled={createLoading}
                                            sx={{ width: '156px', background: '#EAEAEA' }}
                                        >
                                            {item}
                                        </Button>
                                    ))}
                                </Box> */}

                                <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'end', p: '20px' }}>
                                    <Button
                                        type="button"
                                        onClick={modalClose}
                                        disabled={createLoading || updateLoading || Object.keys(errors || {}).length}
                                        sx={{ width: '156px', background: '#EAEAEA' }}
                                    >
                                        Cancel
                                    </Button>
                                    <BRButton
                                        disabled={createLoading || updateLoading || Object.keys(errors || {}).length}
                                        variant="contained"
                                        sx={{ fontSize: '14px', fontWeight: 500, width: '196px' }}
                                        type="submit"
                                    >
                                        {((createLoading || updateLoading) && (
                                            <CircularProgress sx={{ maxWidth: 16, maxHeight: 16, ml: 1 }} />
                                        )) ||
                                        isUpdate
                                            ? 'Update'
                                            : 'Submit'}
                                    </BRButton>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </>
    );
}

export const languates = [
    'Afrikaans',
    'Albanian',
    'Amharic',
    'Arabic',
    'Armenian',
    'Azerbaijani',
    'Belarusian',
    'Bosnian',
    'Bulgarian',
    'Catalan',
    'Chinese (Simplified and Traditional)',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Estonian',
    'Finnish',
    'French',
    'Galician',
    'German',
    'Greek',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Icelandic',
    'Indonesian',
    'Italian',
    'Japanese',
    'Kannada',
    'Kazakh',
    'Korean',
    'Latvian',
    'Lithuanian',
    'Macedonian',
    'Malay',
    'Marathi',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Persian (Farsi)',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Romanian',
    'Russian',
    'Serbian',
    'Slovak',
    'Slovenian',
    'Spanish',
    'Swahili',
    'Swedish',
    'Tagalog',
    'Tamil',
    'Telugu',
    'Thai',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Vietnamese',
    'Welsh'
];
