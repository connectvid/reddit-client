/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import BRButton from 'ui-component/bizreply/BRButton/index';

const AuthRegisterWithOTP = ({ sendingOTP, sendOTPAtEmail, ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { firebaseGoogleLoginOrSignup, isLoading } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Box onClick={firebaseGoogleLoginOrSignup} sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button
                        style={{ color: 'black', padding: '20px' }}
                        disableElevation
                        disabled={isLoading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        startIcon={<GoogleIcon />} // Add the Google icon here
                        endIcon={
                            isLoading ? (
                                <CircularProgress disableShrink sx={{ width: '30px !important', height: '30px !important' }} />
                            ) : (
                                <></>
                            )
                        }
                    >
                        Signup with Google
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
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    name: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .min(4)
                        .max(255)
                        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                        .required('Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={sendOTPAtEmail}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" align="left" gutterBottom>
                                    Full Name
                                </Typography>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.name && errors.name)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-name-register">Full Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-name-register"
                                        type="text"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h4" align="left" gutterBottom>
                                    Email Address
                                </Typography>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        required
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h4" align="left" gutterBottom>
                                    Password
                                </Typography>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
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
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            {strength !== 0 && (
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    style={{ backgroundColor: level?.color }}
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <BRButton
                                            disableElevation
                                            disabled={isSubmitting || isLoading || sendingOTP}
                                            fullWidth
                                            sx={{ color: 'white' }} // This sets the text color to white
                                        >
                                            {isLoading || sendingOTP ? 'Sign up...' : 'Sign up'}
                                        </BRButton>
                                    </AnimateButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            {/* <Box onClick={firebaseGoogleLoginOrSignup} sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button
                        style={{ color: 'black', padding: '20px' }}
                        disableElevation
                        disabled={isLoading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        startIcon={<GoogleIcon />} // Add the Google icon here
                        endIcon={
                            isLoading ? (
                                <CircularProgress disableShrink sx={{ width: '30px !important', height: '30px !important' }} />
                            ) : (
                                <></>
                            )
                        }
                    >
                        Signup with Google
                    </Button>
                </AnimateButton>
            </Box> */}
        </>
    );
};

export default AuthRegisterWithOTP;
