/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import { RememberMe } from '@mui/icons-material';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ loginProp, ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const { firebaseEmailPasswordSignIn, isLoading, firebaseGoogleLoginOrSignup } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true);
                        await firebaseEmailPasswordSignIn(values);
                        setSubmitting(false);
                    } catch (err) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others} style={{ width: '100%', textAlign: 'center', margin: '0 auto 0' }}>
                        {/* <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                label="Password"
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                            <FormControlLabel
                                // eslint-disable-next-line no-undef
                                control={<Checkbox checked={RememberMe} onChange={Checkbox} color="primary" />}
                                label="Remember me"
                                sx={{ marginTop: 2 }}
                                alignItems="start"
                            />
                        </FormControl> */}
                        <FormControl
                            // fullWidth
                            style={{ width: '100%', textAlign: 'center', margin: '0 auto 0', marginTop: '30px' }}
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...theme.typography.customInput, width: '400px' }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            // fullWidth
                            style={{ width: '100%', textAlign: 'center', margin: '0 auto 0', marginTop: '20px' }}
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput, width: '400px' }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                label="Password"
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                            <FormControlLabel
                                control={<Checkbox checked={RememberMe} onChange={Checkbox} color="primary" />}
                                label="Remember me"
                                sx={{ marginTop: 2 }}
                                alignItems="start"
                            />
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} />
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton style={{ width: '100%', textAlign: 'center', margin: '0 auto 0' }}>
                                <Button
                                    style={{ width: '100%', padding: '20px' }}
                                    disableElevation
                                    disabled={isSubmitting || isLoading}
                                    // fullWidth
                                    size="large"
                                    type="submit"
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'grey' } }}
                                    endIcon={
                                        isLoading ? (
                                            <CircularProgress disableShrink sx={{ width: '30px !important', height: '30px !important' }} />
                                        ) : (
                                            <></>
                                        )
                                    }
                                >
                                    {isLoading ? 'Sign in...' : 'Sign in'}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
            <Box onClick={firebaseGoogleLoginOrSignup} sx={{ mt: 2 }} style={{ width: '100%', textAlign: 'center', margin: '0 auto 0' }}>
                <AnimateButton>
                    {/* <Button
                        style={{ background: DEFAULT_BUTTON_COLOR_CODE, color: '#fff' }}
                        sx={{ mt: 2 }}
                        disableElevation
                        disabled={isLoading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        endIcon={
                            isLoading ? (
                                <CircularProgress disableShrink sx={{ width: '30px !important', height: '30px !important' }} />
                            ) : (
                                <></>
                            )
                        }
                    >
                        login using google
                    </Button> */}
                    <Button
                        disableElevation
                        disabled={isLoading}
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        style={{ marginTop: theme.spacing(3), padding: '20px' }}
                    >
                        Sign in with Google
                    </Button>
                </AnimateButton>
            </Box>
        </>
    );
};

FirebaseLogin.propTypes = {
    loginProp: PropTypes.number
};

export default FirebaseLogin;
