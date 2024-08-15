import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthLogin from './AuthLogin';
import useAuth from 'hooks/useAuth';

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
            style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
        >
            <Grid item xs={12} sm={8} md={5} lg={4}>
                <Box maxWidth={600} width="100%" style={{ position: 'relative' }}>
                    <Box
                        style={{
                            position: 'absolute',
                            // inset: '-8px',
                            // background: 'linear-gradient(90deg, #44ff9a, #44b0ff, #8b44ff, #ff6644, #ebff70)',
                            borderRadius: '24px'
                            // filter: 'blur(20px)',
                            // opacity: 0.3
                        }}
                    />
                    <Box
                        style={{
                            position: 'relative',
                            // backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: theme.shadows[2],
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
                                    <Grid item width="100%" display="flex">
                                        <Box
                                            width="100%"
                                            // display="flex"
                                            direction="column"
                                            alignItems="center"
                                            gap="20px"
                                            // justifyContent="space-between"
                                            spacing={1}
                                        >
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Log In
                                            </Typography>
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Hi, Welcome back 👋{' '}
                                            </Typography>
                                            <Typography variant="body2">
                                                Don’t have an account?{' '}
                                                <Link to="/register" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                                                    Join now
                                                </Link>
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
                                    Don&apos;t have an account?
                                </Typography>
                            </Grid>
                            <Grid item container direction="column" alignItems="center" xs={12}>
                                <Typography
                                    style={{ color: 'red', marginTop: '5px' }}
                                    component={Link}
                                    to={isLoggedIn ? '/pages/register/ForgotPassword3' : '/forgot-password'}
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Forgot password?
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
