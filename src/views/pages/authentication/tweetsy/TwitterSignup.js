/* eslint-disable prettier/prettier */
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IconBrandTwitter } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
// import logo-dark from '../../../../../src/assets/images/logo-dark.svg';

const TwitterLogin = () => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const { firebaseRegister, setTwitter } = useAuth();
    const a = 1;
    const handleChange = ({ target: { name, value } }) => {
        setInputs((p) => ({ ...p, [name]: value }));
    };
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

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const { email, password } = inputs;
                        await firebaseRegister(email, password);
                        // console.log(data);
                    } catch (e) {
                        console.log('signup, error', e);
                    }
                }}
            >
                <input type="email" onChange={handleChange} name="email" placeholder="Enter email..." />
                <input type="password" onChange={handleChange} name="password" placeholder="*******************" />
                <button type="submit">Signup</button>
            </form>

            {/* <Button
                variant="contained"
                // startIcon={<IconBrandTwitter fill='white' stroke={1} />}
                startIcon={<IconBrandTwitter />}
                onClick={firebaseRegister}
            >
                Sign-in using Twitter
            </Button> */}
        </Box>
    );
};

export default TwitterLogin;
