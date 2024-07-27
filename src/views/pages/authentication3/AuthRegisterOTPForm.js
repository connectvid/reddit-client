/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, TextField, Grid, Typography, useMediaQuery } from '@mui/material';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import csses from './AuthRegisterWithOTP.module.css';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegisterOTPForm = ({ isOTPVerifying, OTPError, setOTPError, handleOPTSubmit, OTPValue, setOTPValue, signUpUser }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const [, setStrength] = React.useState(0);
    const [, setLevel] = React.useState();
    const { isLoading } = useAuth();

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);
    return (
        <>
            <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={12}>
                    <Typography sx={{ marginBottom: '10px' }} varient="h4">
                        Please check the requested email ({signUpUser.email}) for OTP
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleOPTSubmit}>
                <TextField
                    className={csses.registerOTPfield}
                    id="outlined-adornment-otp-register"
                    required
                    value={OTPValue}
                    onChange={(e) => {
                        const val = e.target.value;

                        if (val?.length < 7) {
                            setOTPValue(val);
                            setOTPError('');
                        }
                        if (isNaN(val)) {
                            setOTPError(`OTP must be numeric`);
                        } else if (val?.length < 6) {
                            setOTPError(`OTP must be 6 digits`);
                        }
                    }}
                    fullWidth
                    placeholder="OTP"
                />
                {OTPError ? (
                    <Typography color="error" variant="h5">
                        {OTPError}
                    </Typography>
                ) : (
                    ''
                )}

                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            disabled={isOTPVerifying || isLoading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="outlined"
                            color="secondary"
                        >
                            {isLoading || isOTPVerifying ? 'Verify up...' : 'Verify'}
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default AuthRegisterOTPForm;
