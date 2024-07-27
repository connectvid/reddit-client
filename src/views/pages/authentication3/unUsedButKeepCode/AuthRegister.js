// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//     Box,
//     Button,
//     // Checkbox,
//     // Divider,
//     FormControl,
//     // FormControlLabel,
//     FormHelperText,
//     Grid,
//     IconButton,
//     InputAdornment,
//     InputLabel,
//     OutlinedInput,
//     Typography,
//     useMediaQuery
// } from '@mui/material';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// // project imports
// import useAuth from 'hooks/useAuth';
// import useConfig from 'hooks/useConfig';
// import useScriptRef from 'hooks/useScriptRef';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// // assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// // ===========================|| FIREBASE - REGISTER ||=========================== //

// const FirebaseRegister = ({ ...others }) => {
//     const theme = useTheme();
//     // const scriptedRef = useScriptRef();
//     const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
//     // const { borderRadius } = useConfig();
//     const [showPassword, setShowPassword] = React.useState(false);
//     // const [checked, setChecked] = React.useState(true);

//     const [strength, setStrength] = React.useState(0);
//     const [level, setLevel] = React.useState();
//     const { firebaseRegister, isLoading } = useAuth();

//     // const googleHandler = async () => {
//     //     try {
//     //         await firebaseGoogleSignIn();
//     //     } catch (err) {
//     //         console.error(err);
//     //     }
//     // };

//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const changePassword = (value) => {
//         const temp = strengthIndicatorNumFunc(value);
//         setStrength(temp);
//         setLevel(strengthColor(temp));
//     };

//     useEffect(() => {
//         changePassword('123456');
//     }, []);

//     return (
//         <>
//             {/* <Grid container direction="column" justifyContent="center" spacing={2}>
//                 <Grid item xs={12}>
//                     <AnimateButton>
//                         <Button
//                             variant="outlined"
//                             fullWidth
//                             onClick={googleHandler}
//                             size="large"
//                             sx={{
//                                 color: 'grey.700',
//                                 backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
//                                 borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
//                             }}
//                         >
//                             <Box sx={{ display: 'flex', mr: { xs: 1, sm: 2, width: 20 } }}>
//                                 Google
//                                 <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
//                             </Box>
//                             Sign up with Google
//                         </Button>
//                     </AnimateButton>
//                 </Grid>
//                  <Grid item xs={12}>
//                     <Box sx={{ alignItems: 'center', display: 'flex' }}>
//                         <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
//                         <Button
//                             variant="outlined"
//                             sx={{
//                                 cursor: 'unset',
//                                 m: 2,
//                                 py: 0.5,
//                                 px: 7,
//                                 borderColor:
//                                     theme.palette.mode === 'dark'
//                                         ? `${theme.palette.dark.light + 20} !important`
//                                         : `${theme.palette.grey[100]} !important`,
//                                 color: `${theme.palette.grey[900]} !important`,
//                                 fontWeight: 500,
//                                 borderRadius: `${borderRadius}px`
//                             }}
//                             disableRipple
//                             disabled
//                         >
//                             OR
//                         </Button>
//                         <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} container alignItems="center" justifyContent="center">
//                     <Box sx={{ mb: 2 }}>
//                         <Typography variant="subtitle1">Sign up with Email address</Typography>
//                     </Box>
//                 </Grid>
//             </Grid> */}

//             <Formik
//                 initialValues={{
//                     email: '',
//                     password: '',
//                     firstName: '',
//                     name: ''
//                 }}
//                 validationSchema={Yup.object().shape({
//                     // firstName: Yup.string().min(2).max(255).required('First Name is required'),
//                     name: Yup.string().min(4).max(255).required('Name is required'),
//                     email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//                     password: Yup.string().max(255).required('Password is required')
//                     // .matches(
//                     //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//                     //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
//                     // )
//                 })}
//                 onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//                     try {
//                         await firebaseRegister(values);

//                         // setSubmitting(true);
//                         // .then(
//                         //     () => {
//                         //         // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
//                         //         // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
//                         //         // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
//                         //         // github issue: https://github.com/formium/formik/issues/2430
//                         //     },
//                         //     (err) => {
//                         //         console.log(err, '================');
//                         //         // if (scriptedRef.current) {
//                         //         //     setStatus({ success: false });
//                         //         //     setErrors({ submit: err.message });
//                         //         //     setSubmitting(false);
//                         //         // }
//                         //     }
//                         // );
//                     } catch (err) {
//                         console.error('authRegister', err);
//                         // if (scriptedRef.current) {
//                         //     setStatus({ success: false });
//                         //     setErrors({ submit: err.message });
//                         //     setSubmitting(false);
//                         // }
//                     }
//                 }}
//             >
//                 {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//                     <form noValidate onSubmit={handleSubmit} {...others}>
//                         <Grid container spacing={matchDownSM ? 0 : 2}>
//                             {/* <Grid item xs={12} sm={6}>
//                                 <FormControl
//                                     fullWidth
//                                     error={Boolean(touched.firstName && errors.firstName)}
//                                     sx={{ ...theme.typography.customInput }}
//                                 >
//                                     <InputLabel htmlFor="outlined-adornment-firstName-register">Your Last Name</InputLabel>
//                                     <OutlinedInput
//                                         id="outlined-adornment-firstName-register"
//                                         type="text"
//                                         value={values.firstName}
//                                         name="firstName"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         inputProps={{}}
//                                     />
//                                     {touched.firstName && errors.firstName && (
//                                         <FormHelperText error id="standard-weight-helper-text--register">
//                                             {errors.firstName}
//                                         </FormHelperText>
//                                     )}
//                                 </FormControl>
//                             </Grid> */}
//                             <Grid item xs={12} sm={12}>
//                                 <FormControl
//                                     fullWidth
//                                     error={Boolean(touched.name && errors.name)}
//                                     sx={{ ...theme.typography.customInput }}
//                                 >
//                                     <InputLabel htmlFor="outlined-adornment-name-register">Full Name</InputLabel>
//                                     <OutlinedInput
//                                         id="outlined-adornment-name-register"
//                                         type="text"
//                                         value={values.name}
//                                         name="name"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         inputProps={{}}
//                                     />
//                                     {touched.name && errors.name && (
//                                         <FormHelperText error id="standard-weight-helper-text--register">
//                                             {errors.name}
//                                         </FormHelperText>
//                                     )}
//                                 </FormControl>
//                             </Grid>
//                         </Grid>
//                         <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
//                             <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Usernamee</InputLabel>
//                             <OutlinedInput
//                                 id="outlined-adornment-email-register"
//                                 type="email"
//                                 required
//                                 value={values.email}
//                                 name="email"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 inputProps={{}}
//                             />
//                             {touched.email && errors.email && (
//                                 <FormHelperText error id="standard-weight-helper-text--register">
//                                     {errors.email}
//                                 </FormHelperText>
//                             )}
//                         </FormControl>

//                         <FormControl
//                             fullWidth
//                             error={Boolean(touched.password && errors.password)}
//                             sx={{ ...theme.typography.customInput }}
//                         >
//                             <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
//                             <OutlinedInput
//                                 id="outlined-adornment-password-register"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={values.password}
//                                 name="password"
//                                 label="Password"
//                                 onBlur={handleBlur}
//                                 onChange={(e) => {
//                                     handleChange(e);
//                                     changePassword(e.target.value);
//                                 }}
//                                 endAdornment={
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                             edge="end"
//                                             size="large"
//                                         >
//                                             {showPassword ? <Visibility /> : <VisibilityOff />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 }
//                                 inputProps={{}}
//                             />
//                             {touched.password && errors.password && (
//                                 <FormHelperText error id="standard-weight-helper-text-password-register">
//                                     {errors.password}
//                                 </FormHelperText>
//                             )}
//                         </FormControl>

//                         {strength !== 0 && (
//                             <FormControl fullWidth>
//                                 <Box sx={{ mb: 2 }}>
//                                     <Grid container spacing={2} alignItems="center">
//                                         <Grid item>
//                                             <Box
//                                                 style={{ backgroundColor: level?.color }}
//                                                 sx={{ width: 85, height: 8, borderRadius: '7px' }}
//                                             />
//                                         </Grid>
//                                         <Grid item>
//                                             <Typography variant="subtitle1" fontSize="0.75rem">
//                                                 {level?.label}
//                                             </Typography>
//                                         </Grid>
//                                     </Grid>
//                                 </Box>
//                             </FormControl>
//                         )}

//                         {/* <Grid container alignItems="center" justifyContent="space-between">
//                             <Grid item>
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={checked}
//                                             onChange={(event) => setChecked(event.target.checked)}
//                                             name="checked"
//                                             color="primary"
//                                         />
//                                     }
//                                     label={
//                                         <Typography variant="subtitle1">
//                                             Agree with &nbsp;
//                                             <Typography variant="subtitle1" component={Link} to="#">
//                                                 Terms & Condition.
//                                             </Typography>
//                                         </Typography>
//                                     }
//                                 />
//                             </Grid>
//                         </Grid> */}
//                         {errors.submit && (
//                             <Box sx={{ mt: 3 }}>
//                                 <FormHelperText error>{errors.submit}</FormHelperText>
//                             </Box>
//                         )}

//                         <Box sx={{ mt: 2 }}>
//                             <AnimateButton>
//                                 <Button
//                                     disableElevation
//                                     disabled={isSubmitting || isLoading}
//                                     fullWidth
//                                     size="large"
//                                     type="submit"
//                                     variant="contained"
//                                     color="secondary"
//                                 >
//                                     {isLoading ? 'Sign up...' : 'Sign up'}
//                                 </Button>
//                             </AnimateButton>
//                         </Box>
//                     </form>
//                 )}
//             </Formik>
//         </>
//     );
// };

// export default FirebaseRegister;
