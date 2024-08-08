import { Box, Typography, TextField, Button, Paper, Stack, Link, Divider, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AuthRegisterWithOTP from './AuthRegisterWithOTP';
import AuthRegisterOTPForm from './AuthRegisterOTPForm';
import useAuth from 'hooks/useAuth';
import Logo from 'ui-component/Logo';
import axios from 'utils/axios';

const RegisterWithOTP = () => {
    const theme = useTheme();
    const { isLoggedIn, firebaseRegisterWithOTP, generalError, setGeneralError } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [formTitle, setFormTitle] = useState('Sign up');
    const [OTPValue, setOTPValue] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(true);
    const [signUpUser, setSignUpUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [OTPError, setOTPError] = useState('');

    const [isOTPVerifying, setIsOTPVerifying] = useState(false);

    const [sendingOTP, setSendingOTP] = useState(false);

    const handleOPTSubmit = async (e) => {
        e.preventDefault();

        setGeneralError('');

        if (!OTPValue || OTPValue?.length !== 6) {
            setOTPError(`Somethig went wrong`);
        }

        console.log({ OTP: OTPValue, email: signUpUser.email, signUpUser });

        setIsOTPVerifying(true);

        axios
            .post(`otp/verify-otp`, {
                OTP: OTPValue,
                email: signUpUser.email,
                name: signUpUser.name
            })
            .then(async (data) => {
                if (data?.data?.isSuccess) {
                    await firebaseRegisterWithOTP({
                        email: signUpUser.email,
                        name: signUpUser.name,
                        password: signUpUser.password
                    });

                    setIsOTPVerifying(false);
                }
            })
            .catch((e) => {
                setGeneralError(e.response?.data?.message || e?.message);
                setIsOTPVerifying(false);
            });
    };

    const sendOTPAtEmail = async ({ name, ...rest }) => {
        const userObject = { name, ...rest };

        console.log(userObject);

        setSignUpUser(userObject);

        setGeneralError('');

        setSendingOTP(true);

        axios
            .post(`email/send-otp-email`, {
                name: userObject.name,
                email: userObject.email
            })
            .then(() => {
                setFormTitle('Verify OTP');
                setShowRegisterForm(false);
            })
            .catch((e) => {
                setGeneralError(e.response?.data?.message || e.message || 'Something went wrong');
            })
            .finally(() => {
                setSendingOTP(false);
            });
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
        >
            <Grid item xs={12} sm={8} md={5} lg={4}>
                <Box maxWidth={600} width="100%" style={{ position: 'relative' }}>
                    <Box
                        style={{
                            position: 'absolute',
                            inset: '-8px',
                            background: 'linear-gradient(90deg, #44ff9a, #44b0ff, #8b44ff, #ff6644, #ebff70)',
                            borderRadius: '24px',
                            filter: 'blur(20px)',
                            opacity: 0.3
                        }}
                    />
                    <Box
                        style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: theme.shadows[5],
                            padding: theme.spacing(3, 4)
                        }}
                    >
                        <Grid container justifyContent="space-between" alignItems="center">
                            {/* <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12}>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                {formTitle}
                                            </Typography>
                                            {generalError && (
                                                <Typography color="error" variant="h5">
                                                    {generalError}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        direction={matchDownSM ? 'column-reverse' : 'row'}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid item width="100%" display="flex">
                                            <Box
                                                width="100%"
                                                display="flex"
                                                alignItems="center"
                                                gap="20px"
                                                justifyContent="space-between"
                                                spacing={1}
                                            >
                                                <Typography
                                                    color={theme.palette.secondary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                    Sign Up
                                                </Typography>
                                                <Typography variant="body2" to={isLoggedIn ? '/pages/login/login3' : '/login'}>
                                                    Already have an account?{' '}
                                                    <Link to="/login" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                                                        Join now
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {' '}
                                {/* Full width grid item */}
                                {showRegisterForm ? (
                                    <AuthRegisterWithOTP {...{ sendingOTP, sendOTPAtEmail }} />
                                ) : (
                                    <AuthRegisterOTPForm
                                        {...{
                                            OTPError,
                                            setOTPError,
                                            handleOPTSubmit,
                                            OTPValue,
                                            setOTPValue,
                                            isOTPVerifying,
                                            signUpUser
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default RegisterWithOTP;
