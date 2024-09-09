import React, { useState, useRef } from 'react';
import { Box, Typography, TextField, Link, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import BizReplyLogo from 'assets/images/logo-black.svg';
import VerifyEmail from 'assets/images/svgIcons/verifyEmail.svg';
import BRButton from 'ui-component/bizreply/BRButton';
import GradinentText from 'ui-component/GradinentText';
import useAuth from 'hooks/useAuth';

const AuthRegisterOTPForm = ({ isOTPVerifying, handleOPTSubmit, signUpUser, setShowRegisterForm, sendOTPAtEmail }) => {
    const { isLoading } = useAuth();
    const [code, setCode] = useState(Array(6).fill(''));
    const inputRefs = useRef(
        Array(6)
            .fill()
            .map(() => React.createRef())
    ); // Create refs for each input

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Allow empty input to clear the digit
        if (value === '') {
            newCode[index] = '';
        } else if (/^\d$/.test(value)) {
            // Check if the value is a single digit
            newCode[index] = value; // Update the value directly without slicing
        } else {
            return; // Ignore invalid input
        }

        setCode(newCode);

        // Move to the next input if the current input is filled and valid
        if (newCode[index] && index < 5) {
            inputRefs.current[index + 1].current.focus(); // Focus the next input
        }
    };

    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData('Text');
        if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
            setCode(pasteData.split(''));
            inputRefs.current[5].current.focus(); // Focus the last input after pasting
        }
    };

    const handleOTPCheck = () => {
        const otpString = code.join(''); // Join the code array into a string
        const otpNumber = Number(otpString); // Convert the string to a number

        if (!/^\d{6}$/.test(otpString)) {
            // Check if the input is a 6-digit number
            toast.warning('Invalid OTP: Please enter a 6-digit number.');
            return;
        }

        console.log('OTP as Number:', otpNumber);
        handleOPTSubmit(otpNumber);
    };

    function debounce(func, delay) {
        let timeout;
        let lastCallTime;

        return function (...args) {
            const context = this;
            const now = Date.now();

            if (lastCallTime && now < lastCallTime + delay) {
                // If the function was called recently, do nothing
                return;
            }

            // Update the last call time
            lastCallTime = now;

            // Clear the previous timeout if it exists
            clearTimeout(timeout);

            // Execute the function immediately
            func.apply(context, args);

            // Set a timeout to reset the last call time after the specified delay
            timeout = setTimeout(() => {
                lastCallTime = null; // Reset last call time
            }, delay);
        };
    }

    // Your handleResendOTP function with updated debounce
    const handleResendOTP = debounce(() => {
        sendOTPAtEmail({ name: signUpUser.name, email: signUpUser.email, password: signUpUser.password });
    }, 5000);

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
            <img src={VerifyEmail} alt="BizReply" style={{ height: '70px', marginTop: '15px' }} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                lg={4}
                style={{ width: '40%', minWidth: '400px', maxWidth: '667px', alignItems: 'center', textAlign: 'center', color: '#000' }}
            >
                <Typography sx={{ fontSize: '32px' }} variant="h5" fontWeight="bold" gutterBottom>
                    Verify your email address
                </Typography>
                <Typography variant="body2" gutterBottom>
                    A 6-digit verification code has been sent to
                </Typography>
                <Typography sx={{ marginTop: '-5px' }} variant="body2" gutterBottom>
                    {signUpUser.email}
                </Typography>
                <div style={{ width: '100%', height: '1px', background: '#e6e6e6', marginTop: '20px' }} />

                <Box textAlign="left" style={{ color: '#000 !important' }} mt={2}>
                    <Typography variant="body2">
                        Please check your inbox and enter the verification code below to verify your email address.
                    </Typography>
                </Box>

                <Box style={{ width: '100%' }} display="flex" gap={2} mt={3}>
                    {code.map((digit, index) => (
                        <TextField
                            key={index}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onPaste={handlePaste}
                            inputProps={{ maxLength: 1 }}
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                                flex: 1,
                                aspectRatio: '1 / 1',
                                '& input': {
                                    fontSize: '3vw',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    height: '100%'
                                }
                            }}
                            variant="outlined"
                            inputRef={inputRefs.current[index]}
                        />
                    ))}
                </Box>

                <BRButton
                    disabled={isOTPVerifying || isLoading}
                    onClick={handleOTPCheck}
                    variant="contained"
                    sx={{ width: '100%', marginTop: '25px', marginBottom: '5px' }}
                >
                    {isLoading || isOTPVerifying ? 'Verify up...' : 'Verify'}
                </BRButton>

                <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                    <Typography
                        onClick={() => setShowRegisterForm(true)}
                        underline="none"
                        color="#6E7478"
                        sx={{ borderBottom: '1px solid #e6e6e6', cursor: 'pointer' }}
                    >
                        Back to previous
                    </Typography>
                    <GradinentText
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            borderBottom: '1px solid #1d66dc'
                        }}
                        underline="none"
                        color="primary"
                        onClick={handleResendOTP}
                    >
                        Resend code
                    </GradinentText>
                </Box>
            </Grid>
        </Box>
    );
};

export default AuthRegisterOTPForm;
