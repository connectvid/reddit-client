import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Typography } from '@mui/material';
import BizReplyLogo from 'assets/images/logo-black.svg';
// project imports
import ForgotPasswordImage from 'assets/images/svgIcons/forgotPassword.svg';
// import AuthFooter from 'ui-component/cards/AuthFooter';
import { useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';

import { toast } from 'react-toastify';
import { Box } from '@mui/system';
import BRButton from 'ui-component/bizreply/BRButton';
import BRInput from 'ui-component/bizreply/BRInput';
import GradinentText from 'ui-component/GradinentText';
// ============================|| AUTH3 - FORGOT PASSWORD ||============================ //

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    // const [err, setErr] = useState('');
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

    const navigateLoginPage = () => {
        navigate('/login');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" bgcolor="#fff" p={3}>
            <Box
                style={{
                    padding: '10px',
                    marginTop: '20px'
                }}
            >
                <Link to="https://bizreply.co" target="_blank" style={{ textDecoration: 'none' }}>
                    <img src={BizReplyLogo} alt="BizReply" style={{ height: '40px' }} />
                </Link>
            </Box>
            <img src={ForgotPasswordImage} alt="BizReply" style={{ height: '70px', marginTop: '15px' }} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                lg={4}
                style={{ width: '40%', minWidth: '400px', maxWidth: '667px', alignItems: 'center', textAlign: 'center', color: '#000' }}
            >
                <Typography sx={{ fontSize: '32px', marginTop: '20px' }} variant="h5" fontWeight="bold" gutterBottom>
                    Forgot Password
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Please enter the email address for your account that you would
                </Typography>
                <Typography variant="body2" gutterBottom>
                    like to reset the password for
                </Typography>

                <Box sx={{ marginTop: '20px', textAlign: 'left', width: '100%' }}>
                    <BRInput
                        label="Email"
                        type="text"
                        placeholder="johnsmith@gmail.com"
                        name="email"
                        value={email}
                        handleChange={(e) => {
                            console.log(e.target.value);
                            // setValues((p) => ({ ...p, email: value }));
                            setEmail(e.target.value);
                        }}
                    />
                </Box>
                <BRButton
                    disabled={sendMail}
                    onClick={handleClick}
                    variant="contained"
                    sx={{ width: '100%', marginTop: '20px', marginBottom: '15px' }}
                >
                    Request reset link
                </BRButton>
                <GradinentText
                    sx={{
                        cursor: 'pointer',
                        margin: '0 auto 0',
                        textDecoration: 'underline'
                    }}
                    underline="none"
                    color="primary"
                    onClick={navigateLoginPage}
                >
                    Back to login
                </GradinentText>
            </Grid>
        </Box>
    );
};

export default ForgotPassword;
