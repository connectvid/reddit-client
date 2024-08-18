/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import Google from '../../../assets/images/svgIcons/google.svg';
// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import { RememberMe } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import BRButton from 'ui-component/bizreply/BRButton';
import BRInput from 'ui-component/bizreply/BRInput';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ loginProp, ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const { firebaseEmailPasswordSignIn, isLoading, firebaseGoogleLoginOrSignup } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { isLoggedIn, dbUser } = useAuth();

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true);
                        await firebaseEmailPasswordSignIn(values);
                        setSubmitting(false);
                    } catch (err) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <form noValidate onSubmit={handleSubmit} {...others} style={{ width: '100%', textAlign: 'center', margin: '0 auto 0' }}>
                        <Box
                            onClick={firebaseGoogleLoginOrSignup}
                            // sx={{ mt: 2 }}
                            style={{ width: '100%', textAlign: 'center', margin: '0 auto 0' }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isLoading}
                                    fullWidth
                                    variant="outlined"
                                    // startIcon={<GoogleIcon />}
                                    style={{
                                        marginTop: theme.spacing(3),
                                        padding: '10px',
                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                        color: 'black'
                                    }}
                                >
                                    <img style={{ width: '25px' }} src={Google} alt="google login" />
                                    <span style={{ marginLeft: '15px' }}>Login with Google</span>
                                </Button>
                            </AnimateButton>
                        </Box>
                        <div style={{ margin: '20px 0' }}>
                            <Divider>
                                <Typography variant="body1" color="textSecondary">
                                    Or Login with Email
                                </Typography>
                            </Divider>
                        </div>
                        <FormControl
                            style={{ width: '100%', textAlign: 'center', margin: '0 auto 0', marginTop: '0px' }}
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...theme.typography.customInput, width: '400px' }}
                        >
                            <Typography variant="h4" align="left" gutterBottom>
                                Email
                            </Typography>

                            <TextField
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // label="Email Address"
                                inputProps={{}}
                                placeholder="johnsmith@gmail.com"
                                sx={{
                                    mb: 1,
                                    height: '50px',
                                    borderRadius: '10px',
                                    color: 'black',
                                    width: '100%',
                                    overflow: 'hidden',
                                    input: { pt: '10px', fontSize: '16px', fontWeight: 400 },
                                    fieldset: { height: '50px', borderRadius: '10px' }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            style={{ width: '100%', textAlign: 'center', margin: '0 auto 0', marginTop: '10px' }}
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput, width: '400px' }}
                        >
                            <Typography variant="h4" align="left" gutterBottom>
                                Password
                            </Typography>
                            {/* <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel> */}
                            <OutlinedInput
                                sx={{
                                    mb: 1,
                                    height: '50px',
                                    borderRadius: '10px',
                                    color: 'black',
                                    width: '100%',
                                    overflow: 'hidden',
                                    input: { pt: '10px', fontSize: '16px', fontWeight: 400 },
                                    fieldset: { height: '50px', borderRadius: '10px' }
                                }}
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                    // marginTop: 1
                                }}
                            >
                                <FormControlLabel
                                    control={<Checkbox checked={RememberMe} onChange={Checkbox} color="primary" />}
                                    label="Remember me"
                                />
                                <Typography
                                    style={{ color: 'rgba(42, 152, 213, 1)' }}
                                    component={Link}
                                    to={isLoggedIn ? '/pages/register/ForgotPassword3' : '/forgot-password'}
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none', marginTop: '5px' }}
                                >
                                    Forgot password?
                                </Typography>
                            </Box>
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} />
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton style={{ width: '100%', textAlign: 'center', margin: '0 auto 0' }}>
                                <BRButton
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        color: 'white' // Set text color to white
                                    }}
                                    disableElevation
                                    disabled={isSubmitting || isLoading}
                                    type="submit"
                                    endIcon={
                                        isLoading ? (
                                            <CircularProgress
                                                disableShrink
                                                sx={{ width: '30px !important', height: '30px !important' }}
                                                style={{ color: 'white' }}
                                            />
                                        ) : (
                                            <></>
                                        )
                                    }
                                >
                                    {isLoading ? 'Log in...' : 'Log in'}
                                </BRButton>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

FirebaseLogin.propTypes = {
    loginProp: PropTypes.number
};

export default FirebaseLogin;
