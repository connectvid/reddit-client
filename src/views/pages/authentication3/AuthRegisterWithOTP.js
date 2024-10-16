/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, CircularProgress, Divider, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import BRButton from 'ui-component/bizreply/BRButton';
import Google from '../../../assets/images/svgIcons/google.svg';

const AuthRegisterWithOTP = ({ sendingOTP, sendOTPAtEmail }) => {
    const theme = useTheme();
    const [showPassword] = React.useState(false);
    // const [strength, setStrength] = React.useState(0);
    // const [level, setLevel] = React.useState();
    const { firebaseGoogleLoginOrSignup, isLoading } = useAuth();

    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    // const changePassword = (value) => {
    //     const temp = strengthIndicatorNumFunc(value);
    //     setStrength(temp);
    //     setLevel(strengthColor(temp));
    // };

    // useEffect(() => {
    //     changePassword('123456');
    // }, []);

    return (
        <>
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
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        style={{
                            marginTop: theme.spacing(3),
                            padding: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            color: 'black',
                            borderRadius: '10px',
                            border: '1px solid #CCD3D9'
                        }}
                        endIcon={
                            isLoading ? (
                                <CircularProgress disableShrink sx={{ width: '30px !important', height: '30px !important' }} />
                            ) : (
                                <></>
                            )
                        }
                    >
                        <img style={{ width: '25px' }} src={Google} alt="google login" />
                        <span style={{ marginLeft: '15px' }}>Login with Google</span>
                    </Button>
                </AnimateButton>
            </Box>
            <div style={{ margin: '20px 0' }}>
                <Divider>
                    <Typography variant="body1" color="textSecondary">
                        Or Sign Up with Email
                    </Typography>
                </Divider>
            </div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .trim()
                        .min(4)
                        .max(255)
                        .matches(/^[A-Za-z ]*$/, 'Please enter a valid name!')
                        .required('Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string()
                        // .min(8)
                        .max(32)
                        // .matches(passwordRegex, 'Password at least one uppercase letter, one lowercase letter, one number, and one symbol!')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        // .min(8, 'Retype password must be at least 8 characters!')
                        .max(32)
                        // .matches(
                        //     passwordRegex,
                        //     'Retype Password at least one uppercase letter, one lowercase letter, one number, and one symbol!'
                        // )
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Retype Password is required')
                })}
                onSubmit={sendOTPAtEmail}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.name && errors.name)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <Typography variant="h4" align="left" gutterBottom>
                                        Full Name
                                    </Typography>

                                    <TextField
                                        id="outlined-adornment-name-register"
                                        type="text"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                        placeholder="John Smith"
                                        sx={{
                                            height: '48px',
                                            borderRadius: '10px',
                                            color: 'black',
                                            width: '100%',
                                            overflow: 'hidden',
                                            input: { pt: '12px', fontSize: '16px', fontWeight: 400 },
                                            fieldset: { height: '48px', borderRadius: '10px' }
                                        }}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                <Typography variant="h4" align="left" gutterBottom>
                                    Email Address
                                </Typography>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        required
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                        placeholder="johnsmith@gmail.com"
                                        sx={{
                                            height: '48px',
                                            borderRadius: '10px',
                                            color: 'black',
                                            width: '100%',
                                            overflow: 'hidden',
                                            input: { pt: '12px', fontSize: '16px', fontWeight: 400 },
                                            fieldset: { height: '48px', borderRadius: '10px' }
                                        }}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                <Typography variant="h4" align="left" gutterBottom>
                                    Password
                                </Typography>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    {/* <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel> */}
                                    <TextField
                                        id="outlined-adornment-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        // label="Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            // changePassword(e.target.value);
                                        }}
                                        // endAdornment={
                                        //     <InputAdornment position="end">
                                        //         <IconButton
                                        //             aria-label="toggle password visibility"
                                        //             onClick={handleClickShowPassword}
                                        //             onMouseDown={handleMouseDownPassword}
                                        //             edge="end"
                                        //             size="large"
                                        //         >
                                        //             {showPassword ? <Visibility /> : <VisibilityOff />}
                                        //         </IconButton>
                                        //     </InputAdornment>
                                        // }
                                        inputProps={{}}
                                        placeholder="Enter your password"
                                        sx={{
                                            height: '48px',
                                            borderRadius: '10px',
                                            color: 'black',
                                            width: '100%',
                                            overflow: 'hidden',
                                            input: { pt: '12px', fontSize: '16px', fontWeight: 400 },
                                            fieldset: { height: '48px', borderRadius: '10px' }
                                        }}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                <Typography variant="h4" align="left" gutterBottom>
                                    Retype Password
                                </Typography>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    {/* <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel> */}
                                    <TextField
                                        id="outlined-adornment-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        // label="Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            // changePassword(e.target.value);
                                        }}
                                        // endAdornment={
                                        //     <InputAdornment position="end">
                                        //         <IconButton
                                        //             aria-label="toggle password visibility"
                                        //             onClick={handleClickShowPassword}
                                        //             onMouseDown={handleMouseDownPassword}
                                        //             edge="end"
                                        //             size="large"
                                        //         >
                                        //             {showPassword ? <Visibility /> : <VisibilityOff />}
                                        //         </IconButton>
                                        //     </InputAdornment>
                                        // }
                                        placeholder="Retype your password"
                                        sx={{
                                            height: '48px',
                                            borderRadius: '10px',
                                            color: 'black',
                                            width: '100%',
                                            overflow: 'hidden',
                                            input: { pt: '12px', fontSize: '16px', fontWeight: 400 },
                                            fieldset: { height: '48px', borderRadius: '10px' }
                                        }}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.confirmPassword}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <AnimateButton>
                                    <BRButton
                                        type="submit"
                                        disableElevation
                                        disabled={isSubmitting || isLoading || sendingOTP}
                                        fullWidth
                                        sx={{ color: 'white' }} // This sets the text color to white
                                        endIcon={
                                            isLoading || sendingOTP ? (
                                                <CircularProgress
                                                    disableShrink
                                                    sx={{ maxWidth: '13px !important', maxHeight: '13px !important' }}
                                                    style={{ color: 'white' }}
                                                />
                                            ) : (
                                                <></>
                                            )
                                        }
                                    >
                                        Sign up
                                    </BRButton>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthRegisterWithOTP;
