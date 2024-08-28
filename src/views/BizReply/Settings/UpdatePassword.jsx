import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import BRButton from 'ui-component/bizreply/BRButton';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';
import useAuth from 'hooks/useAuth';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function () {
    const { changePassword } = useAuth();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(true);
            await changePassword(values?.password);
            toast.success(`Password has been changed!`);
            resetForm();
        } catch (e) {
            console.log(e);
            toast.warn(errorMsgHelper(e));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card sx={{ mt: 4 }} id="add-open-ai-key">
            <CardContent>
                <Box>
                    <Typography sx={{ color: '#000', mt: 2, mb: 3, fontSize: '18px', fontWeight: 700 }}>Security</Typography>

                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string().min(8).max(255).required('Password is required'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .min(8)
                                .max(255)
                                .required('Retype Password is required')
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <Box sx={{ width: { md: '60%', sm: '100%' }, mb: 2 }}>
                                    <BRInput2
                                        placeholder="Enter password"
                                        label="Password"
                                        fullWidth
                                        required
                                        value={values.password || ''}
                                        name="password"
                                        // label="Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                    />
                                    {touched.password && errors.password && (
                                        <Typography sx={{ color: 'red', mt: 1 }}>{errors.password}</Typography>
                                    )}
                                </Box>
                                <Box sx={{ width: { md: '60%', sm: '100%' }, mb: 2 }}>
                                    <BRInput2
                                        placeholder="Enter confirm password"
                                        label="Confirm Password"
                                        fullWidth
                                        required
                                        value={values.confirmPassword || ''}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <Typography sx={{ color: 'red', mt: 1 }}>{errors.confirmPassword}</Typography>
                                    )}
                                </Box>
                                <BRButton
                                    disabled={isSubmitting || Object.keys(errors || {}).length}
                                    variant="contained"
                                    type="submit"
                                    sx={{ color: '#fff', width: '180px', height: '50px', background: '#000' }}
                                >
                                    Change password
                                    {(isSubmitting && <CircularProgress sx={{ maxHeight: '16px', maxWidth: '16px', ml: 1 }} />) || ''}
                                </BRButton>
                            </form>
                        )}
                    </Formik>
                </Box>
            </CardContent>
        </Card>
    );
}
