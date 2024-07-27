import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import AuthRegisterWithOTP from './AuthRegisterWithOTP';
import AuthRegisterOTPForm from './AuthRegisterOTPForm';
import useAuth from 'hooks/useAuth';
// import TwitterDMConfig from 'TwitterDMConfig';
import Logo from 'ui-component/Logo';
import axios from 'utils/axios';

// assets
// ===============================|| AUTH3 - REGISTER ||=============================== //

const RegisterWithOTP = () => {
    const theme = useTheme();
    const { isLoggedIn, firebaseRegisterWithOTP, generalError, setGeneralError, setDbUser } = useAuth();
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
                    await firebaseRegisterWithOTP({ email: signUpUser.email, name: signUpUser.name, password: signUpUser.password });
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
        // setDbUser(userObject);

        setGeneralError('');
        setSendingOTP(true);
        axios
            .post(`email/send-otp-email`, { name: userObject.name, email: userObject.email })
            .then(({ data }) => {
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
        <>
            {/* AuthWrapper1 */}
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        {formTitle}
                                                    </Typography>

                                                    {generalError ? (
                                                        <Typography color="error" variant="h5">
                                                            {generalError}
                                                        </Typography>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5}>
                                        {/* {responseOTP === !true ? ( */}
                                        {showRegisterForm === true ? (
                                            <AuthRegisterWithOTP {...{ sendingOTP, sendOTPAtEmail, setFormTitle }} />
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
                                    {/* <Grid item xs={12}>
                                        <Divider />
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to={isLoggedIn ? '/pages/login/login3' : '/login'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Already have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid> */}
            </Grid>
        </>
    );
};

export default RegisterWithOTP;
