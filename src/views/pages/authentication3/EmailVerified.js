import { Box, Typography, Button, TextField, Link, Grid } from '@mui/material';
import BizReplyLogo from 'assets/images/logo-black.svg';
import emailVerifiedImage from 'assets/images/svgIcons/emailVerified.svg';
import BRButton from 'ui-component/bizreply/BRButton';
import { ONBOARDING_PATH } from 'config';
import { useNavigate } from 'react-router-dom';

const EmailVerified = () => {
    const navigate = useNavigate();
    const handleRedirectDashboard = () => {
        navigate(ONBOARDING_PATH);
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
            <img src={emailVerifiedImage} alt="BizReply" style={{ height: '70px', marginTop: '15px' }} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                lg={4}
                style={{ width: '40%', minWidth: '400px', maxWidth: '667px', alignItems: 'center', textAlign: 'center', color: '#000' }}
            >
                <Typography sx={{ fontSize: '32px', marginTop: '20px' }} variant="h5" fontWeight="bold" gutterBottom>
                    Congratulations! 🚀
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Your email was successfully verified
                </Typography>
                <BRButton
                    onClick={handleRedirectDashboard}
                    variant="contained"
                    sx={{ width: '100%', marginTop: '50px', marginBottom: '5px' }}
                >
                    Go to your dashboard
                </BRButton>
            </Grid>
        </Box>
    );
};

export default EmailVerified;
