/* eslint-disable prettier/prettier */
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IconBrandTwitter } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import React from 'react';
// import logo-dark from '../../../../../src/assets/images/logo-dark.svg';


const TwitterLogin = () => {
    const { twitterSignIn } = useAuth()
    const a = 1;

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#e3f2fd'
            }}
        >
            {/* <Typography variant='h2'  >Welcome To MacroDM</Typography>
            <Typography variant='h5' sx={{ color: 'gray', mb: '7em', mt: 1 }} >10x Your Twitter Growth Today</Typography> */}



            <Button
                variant="contained"
                // startIcon={<IconBrandTwitter fill='white' stroke={1} />}
                startIcon={<IconBrandTwitter />}
                onClick={twitterSignIn}
            >
                Sign-in using Twitter
            </Button>
        </Box>
    );
};

export default TwitterLogin;
