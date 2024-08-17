import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AuthRegisterWithOTP from './AuthRegisterWithOTP';
import AuthRegisterOTPForm from './AuthRegisterOTPForm';
import useAuth from 'hooks/useAuth';
import BizReplyLogo from './bizreply.png'; // Update the path to the correct location
import axios from 'utils/axios';
import { Link } from 'react-router-dom';

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
            setOTPError(`Something went wrong`);
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
            style={{ minHeight: '100vh', backgroundColor: '#ffffff', position: 'relative' }}
        >
            {/* Container with fixed width of 1440px */}
            <Box style={{ width: '1440px', maxWidth: '100%', padding: theme.spacing(0, 2) }}>
                {/* BizReply Logo Section */}
                <Box
                    style={{
                        position: 'fixed',
                        top: theme.spacing(3),
                        left: theme.spacing(3)
                    }}
                >
                    <img src={BizReplyLogo} alt="BizReply" style={{ height: '50px' }} />
                </Box>

                {/* Register Form Section */}
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={12} sm={8} md={5} lg={4}>
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
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        direction={matchDownSM ? 'column-reverse' : 'row'}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid item width="100%" display="flex" justifyContent="center" alignItems="center">
                                            <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap="20px">
                                                <Typography
                                                    color="black"
                                                    gutterBottom
                                                    // variant={matchDownSM ? 'h3' : 'h2'}
                                                    fontSize="36px" // Set the font size for "Sign Up"
                                                >
                                                    Sign Up
                                                </Typography>
                                                <Typography
                                                    color="black"
                                                    gutterBottom
                                                    // variant={matchDownSM ? 'h6' : 'h5'} // Adjust the variant for better scaling
                                                    fontSize="22px" // Set the font size for "Register & Connect with BizReply"
                                                >
                                                    Register & Connect with BizReply
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
                                    <Grid item container direction="column" alignItems="center" xs={12}>
                                        <Typography
                                            component={Link}
                                            to={isLoggedIn ? '/pages/login/login3' : '/login'}
                                            variant="subtitle1"
                                            sx={{ textDecoration: 'none' }}
                                        >
                                            Already have account?{' '}
                                            <span
                                                style={{
                                                    background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent'
                                                }}
                                            >
                                                Login
                                            </span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default RegisterWithOTP;
