import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AuthRegisterWithOTP from './AuthRegisterWithOTP';
import AuthRegisterOTPForm from './AuthRegisterOTPForm';
import useAuth from 'hooks/useAuth';
import BizReplyLogo from 'assets/images/logo-black.svg'; // Update the path to the correct location
import axios from 'utils/axios';
import { Link } from 'react-router-dom';

const RegisterWithOTP = () => {
    const theme = useTheme();
    const { isLoggedIn, firebaseRegisterWithOTP, setGeneralError } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    // const [formTitle, setFormTitle] = useState('Sign up');
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
        // console.log(userObject);
        // console.log(userObject);

        setSignUpUser(userObject);

        setGeneralError('');

        setSendingOTP(true);

        axios
            .post(`email/send-otp-email`, {
                name: userObject.name,
                email: userObject.email
            })
            .then(() => {
                // setFormTitle('Verify OTP');
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
        <Grid direction="column" justifyContent="center" alignItems="center" style={{ backgroundColor: '#ffffff' }}>
            {/* BizReply Logo Section */}
            <Box
                style={{
                    padding: '10px',
                    borderBottom: '1px solid #CECECE'
                }}
            >
                <Link to="https://bizreply.co" target="_blank" style={{ textDecoration: 'none' }}>
                    <img src={BizReplyLogo} alt="BizReply" style={{ height: '40px' }} />
                </Link>
            </Box>
            {/* Register Form Section */}
            <Grid container justifyContent="center" alignItems="center" style={{ padding: '100px 0px' }}>
                <Grid item xs={12} sm={8} md={5} lg={4} style={{ width: '667px' }}>
                    <Box
                        style={{
                            padding: theme.spacing(2, 3), // Reduced padding to decrease form height
                            backgroundColor: 'white'
                            // height: '90vh'
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
                                        <Box
                                            width="100%"
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            // gap="6px"
                                            justifyContent="center"
                                            marginTop="-80px"
                                        >
                                            <Typography color="black" gutterBottom variant={matchDownSM ? 'h4' : 'h3'} fontSize="30px">
                                                Sign Up
                                            </Typography>
                                            <Typography
                                                color="black"
                                                gutterBottom
                                                variant={matchDownSM ? 'h4' : 'h5'} // Adjust the variant for better scaling
                                                fontSize="20px" // Set the font size for "Hi, Welcome back 👋",
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
                                <Grid item container direction="column" alignItems="center" xs={12} style={{ marginTop: '20px' }}>
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
        </Grid>
    );
};

export default RegisterWithOTP;
