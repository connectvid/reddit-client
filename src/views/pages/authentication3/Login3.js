import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthLogin from './AuthLogin';
import useAuth from 'hooks/useAuth';
import BizReplyLogo from 'assets/images/logo-black.svg';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { isLoggedIn, dbUser } = useAuth();

    useEffect(() => {
        if (dbUser?.email) {
            navigate('/');
        }
    }, [dbUser?.email, navigate]);

    return (
        <Grid direction="column" justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#ffffff' }}>
            {/* BizReply Logo Section */}
            <Box
                style={{
                    padding: '10px',
                    borderBottom: '1px solid #CECECE'
                }}
            >
                <img src={BizReplyLogo} alt="BizReply" style={{ height: '40px' }} />
            </Box>

            {/* Login Form Section */}
            <Grid container justifyContent="center" alignItems="center" style={{ padding: '100px 0px' }}>
                <Grid item xs={12} sm={8} md={5} lg={4} style={{ width: '467px' }}>
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
                                                Login
                                            </Typography>
                                            <Typography
                                                color="black"
                                                gutterBottom
                                                variant={matchDownSM ? 'h4' : 'h5'} // Adjust the variant for better scaling
                                                fontSize="20px" // Set the font size for "Hi, Welcome back 👋",
                                            >
                                                Hi, Welcome back 👋{' '}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                <AuthLogin />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                            <Grid item container direction="column" alignItems="center" xs={12}>
                                <Typography
                                    component={Link}
                                    to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Not registered yet?{' '}
                                    <span
                                        style={{
                                            background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        Create an account
                                    </span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
