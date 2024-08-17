import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthLogin from './AuthLogin';
import useAuth from 'hooks/useAuth';
import BizReplyLogo from './bizreply.png'; // Update the path to the correct location

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
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh', backgroundColor: '#ffffff', position: 'relative' }}
        >
            {/* Container with fixed width of 1440px */}
            <Box style={{ width: '1440px', maxWidth: '100%', padding: theme.spacing(0, 2) }}>
                {/* BizReply Logo Section */}
                <Box
                    style={{
                        position: 'absolute',
                        top: theme.spacing(3),
                        left: theme.spacing(3)
                    }}
                >
                    <img src={BizReplyLogo} alt="BizReply" style={{ height: '50px' }} />
                </Box>

                {/* Login Form Section */}
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                    <Grid item xs={12} sm={8} md={5} lg={4} style={{ width: '467px' }}>
                        <Box
                            style={{
                                position: 'relative',
                                borderRadius: '16px',
                                boxShadow: theme.shadows[2],
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
                                                gap="6px"
                                                justifyContent="center"
                                            >
                                                <Typography color="black" gutterBottom variant={matchDownSM ? 'h3' : 'h2'} fontSize="36px">
                                                    Login
                                                </Typography>
                                                <Typography
                                                    color="black"
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h4' : 'h5'} // Adjust the variant for better scaling
                                                    fontSize="22px" // Set the font size for "Hi, Welcome back 👋"
                                                >
                                                    Hi, Welcome back 👋{' '}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <AuthLogin />
                                </Grid>
                            </Grid>
                            <Typography align="center" style={{ margin: theme.spacing(3, 0), color: theme.palette.text.disabled }}>
                                <svg width="172" height="16" viewBox="0 0 172 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* SVG path data omitted for brevity */}
                                </svg>
                            </Typography>
                            <Grid item xs={12}>
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
            </Box>
        </Grid>
    );
};

export default Login;
