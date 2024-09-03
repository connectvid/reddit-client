/* eslint-disable consistent-return */
import { Box, Button, CircularProgress, Typography } from '@mui/material';
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
import { addPromptAPI } from 'features/prompt/promptActions';
import useAuth from 'hooks/useAuth';

export default function ({
    modalClose,
    initVals = {
        name: '',
        prompt: ''
    }
}) {
    const { getAccessToken } = useAuth();
    const {
        prompt: { createLoading }
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
            addPromptAPI(token, values)();
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
                    <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Create a new Prompt</Typography>
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
                        initialValues={initVals}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .min(3, 'Name must be at least 3 characters')
                                .max(100, 'Name must be at most 100 characters')
                                .required('Name is required'),
                            prompt: Yup.string()
                                .min(10, 'Prompt must be at least 10 characters')
                                .max(500, 'Prompt must be at most 500 characters')
                                .required('Prompt is required')
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            touched,
                            values //, setFieldValue
                        }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <Box sx={{ mb: 2 }}>
                                    <BRInput2
                                        placeholder="Enter Prompt Name"
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
                                <Box sx={{ mb: 2, mt: 3 }}>
                                    <BRInput2
                                        sx={{ height: 'unset' }}
                                        placeholder="Enter prompt"
                                        label="Write something for your prompt"
                                        fullWidth
                                        required
                                        multiline
                                        rows={5}
                                        value={values.prompt || ''}
                                        name="prompt"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                    />
                                    {touched.prompt && errors.prompt && (
                                        <Typography sx={{ color: 'red', mt: 1 }}>{errors.prompt}</Typography>
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
                                        disabled={createLoading || Object.keys(errors || {}).length}
                                        sx={{ width: '156px', background: '#EAEAEA' }}
                                    >
                                        Cancel
                                    </Button>
                                    <BRButton
                                        disabled={createLoading || Object.keys(errors || {}).length}
                                        variant="contained"
                                        sx={{ fontSize: '14px', fontWeight: 500, width: '196px' }}
                                        type="submit"
                                    >
                                        {(createLoading && <CircularProgress sx={{ maxWidth: 16, maxHeight: 16, ml: 1 }} />) || 'Submit'}
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
