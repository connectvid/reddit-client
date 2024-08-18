import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, FormControl, Grid, InputLabel, OutlinedInput, Typography, useMediaQuery } from '@mui/material';

// project imports
import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { toast } from 'react-toastify';
// ============================|| AUTH3 - FORGOT PASSWORD ||============================ //

const ForgotPassword = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [email, setEmail] = useState('');
    // const [err, setErr] = useState('');
    const [values] = useState('');
    const [sendMail, setSendMail] = useState(false);

    const handleClick = async () => {
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            setSendMail(true);
            toast(`Email send successfully!`, {
                type: 'success',
                autoClose: 2500
            });
        } catch (e) {
            let msg = `Something going Wrong?`;
            if (e.message === 'Firebase: Error (auth/user-not-found).') {
                msg = `User doesn't exists!`;
            }
            toast(msg, {
                type: 'warning',
                autoClose: 2500
            });
        }
    };

    return (
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item sx={{ mb: 3 }}>
                                <Link to="#">
                                    <Logo />
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                            Forgot password?
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption" fontSize="16px" textAlign="center">
                                            Enter your email address below and we&apos;ll send you a reset password email.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center', maxWidth: '400px' }}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        label="Email Address"
                                        inputProps={{}}
                                    />
                                </FormControl>
                                <AnimateButton>
                                    <Button
                                        onClick={handleClick}
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="outlined"
                                        color="secondary"
                                        disabled={sendMail}
                                    >
                                        Send Reset Email Link
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
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
                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                <AuthFooter />
            </Grid> */}
        </Grid>
    );
};

export default ForgotPassword;
