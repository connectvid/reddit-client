// import React from 'react';
// import { Container, Box, Typography, TextField, Button, Link, Checkbox, FormControlLabel, Paper, Grid } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
//         opacity: 0.3,
//         filter: 'blur(16px)',
//         borderRadius: '24px',
//         position: 'absolute',
//         width: '100%',
//         height: '100%'
//     },
//     container: {
//         position: 'relative',
//         zIndex: 1,
//         padding: theme.spacing(4)
//     },
//     paper: {
//         padding: theme.spacing(4),
//         position: 'relative',
//         zIndex: 2,
//         boxShadow: theme.shadows[3],
//         borderRadius: '16px'
//     },
//     title: {
//         fontWeight: 'bold'
//     },
//     form: {
//         marginTop: theme.spacing(3)
//     },
//     submitButton: {
//         marginTop: theme.spacing(3)
//     },
//     googleButton: {
//         marginTop: theme.spacing(2),
//         backgroundColor: '#f1f3f4'
//     },
//     svgLines: {
//         marginTop: theme.spacing(3),
//         textAlign: 'center',
//         color: '#c1c1c1'
//     }
// }));

// const Login1 = () => {
//     const classes = useStyles();

//     return (
//         <Container maxWidth="lg" style={{ position: 'relative', paddingTop: '80px' }}>
//             <Box className={classes.root} />
//             <Grid container justifyContent="center">
//                 <Grid item xs={12} md={6}>
//                     <Paper className={classes.paper}>
//                         <Box className={classes.container}>
//                             <Box display="flex" justifyContent="space-between" alignItems="center">
//                                 <Typography variant="h5" className={classes.title}>
//                                     Sign in
//                                 </Typography>
//                                 <Typography variant="body2">
//                                     Don’t have an account?{' '}
//                                     <Link href="#" underline="hover">
//                                         Join now
//                                     </Link>
//                                 </Typography>
//                             </Box>
//                             <form className={classes.form} noValidate autoComplete="off">
//                                 <TextField
//                                     variant="outlined"
//                                     margin="normal"
//                                     fullWidth
//                                     id="email"
//                                     label="Email"
//                                     name="email"
//                                     autoComplete="email"
//                                     autoFocus
//                                 />
//                                 <TextField
//                                     variant="outlined"
//                                     margin="normal"
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     id="password"
//                                     autoComplete="current-password"
//                                 />
//                                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                                     <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
//                                     <Link href="#" variant="body2">
//                                         Forgot Password?
//                                     </Link>
//                                 </Box>
//                                 <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitButton}>
//                                     Sign in
//                                 </Button>
//                             </form>
//                             <div className={classes.svgLines}>{/* SVG lines go here */}</div>
//                             <Button
//                                 fullWidth
//                                 variant="outlined"
//                                 color="default"
//                                 className={classes.googleButton}
//                                 startIcon={
//                                     <svg className="w-5 h-5 mr-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path
//                                             d="M19.2436 8.26113L11.0858 8.26074C10.7256 8.26074 10.4336 8.5527 10.4336 8.91293V11.519C10.4336 11.8791 10.7256 12.1712 11.0858 12.1712H15.6798C15.1767 13.4767 14.2378 14.57 13.0399 15.2647L14.9988 18.6557C18.1411 16.8384 19.9988 13.6497 19.9988 10.0803C19.9988 9.57203 19.9613 9.20871 19.8864 8.79961C19.8295 8.48879 19.5596 8.26113 19.2436 8.26113Z"
//                                             fill="#167EE6"
//                                         />
//                                         <path
//                                             d="M9.99957 16.0871C7.75137 16.0871 5.78871 14.8587 4.73461 13.041L1.34375 14.9955C3.06934 17.9862 6.30191 20.0001 9.99957 20.0001C11.8135 20.0001 13.5251 19.5117 14.9996 18.6606V18.6559L13.0407 15.2649C12.1447 15.7846 11.1078 16.0871 9.99957 16.0871Z"
//                                             fill="#12B347"
//                                         />
//                                         <path
//                                             d="M15 18.6603V18.6557L13.0411 15.2646C12.1451 15.7843 11.1083 16.0868 10 16.0868V19.9998C11.8139 19.9998 13.5256 19.5114 15 18.6603Z"
//                                             fill="#0F993E"
//                                         />
//                                         <path
//                                             d="M3.91305 10.0002C3.91305 8.89207 4.21547 7.85531 4.73504 6.95934L1.34418 5.00488C0.488359 6.47469 0 8.18164 0 10.0002C0 11.8188 0.488359 13.5258 1.34418 14.9956L4.73504 13.0411C4.21547 12.1452 3.91305 11.1084 3.91305 10.0002Z"
//                                             fill="#FFD500"
//                                         />
//                                         <path
//                                             d="M9.99957 3.91305C11.4656 3.91305 12.8123 4.43398 13.8641 5.30051C14.1236 5.51426 14.5007 5.49883 14.7384 5.26113L16.5849 3.41465C16.8546 3.14496 16.8354 2.70352 16.5473 2.45359C14.785 0.924726 12.492 0 9.99957 0C6.30191 0 3.06934 2.01395 1.34375 5.00465L4.73461 6.9591C5.78871 5.14141 7.75137 3.91305 9.99957 3.91305Z"
//                                             fill="#FF4B26"
//                                         />
//                                         <path
//                                             d="M13.8645 5.30051C14.124 5.51426 14.5012 5.49883 14.7389 5.26113L16.5854 3.41465C16.855 3.14496 16.8358 2.70352 16.5477 2.45359C14.7854 0.924688 12.4925 0 10 0V3.91305C11.466 3.91305 12.8127 4.43398 13.8645 5.30051Z"
//                                             fill="#D93F21"
//                                         />
//                                     </svg>
//                                 }
//                             >
//                                 Sign in with Google
//                             </Button>
//                         </Box>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Login1;
