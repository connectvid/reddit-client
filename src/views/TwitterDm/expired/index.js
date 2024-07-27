/* eslint-disable prettier/prettier */
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconX } from '@tabler/icons';

// ==============================|| Expired PAGE ||============================== //

const Expired = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    height: '100%',
                    display: 'grid',
                    placeContent: 'center'
                }}
            >
                {/* <Typography
                    variant='h4'
                >Your subscription has been expired Expired!</Typography>
                <br />
                <Button
                    variant='contained'
                    onClick={() => navigate("/subscription", { replace: true })}
                >Go to Subscription Page</Button> */}
            </Box>
            <Dialog 
                open={open}
            >
                <Typography
                    onClick={() => setOpen((p) => !p)}
                    sx={{ position: 'absolute', right: 5, top: 5, '&:hover': { cursor: 'pointer' }, color: 'red' }}
                > 
                    <IconX stroke={1.5} size="1.3rem" />
                </Typography>

                <DialogTitle id="alert-dialog-title">Subscription Expired</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Your Subscription has been Expired!</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3 }}>
                    <Button onClick={() => navigate('/subscription', { replace: true })}>Go to Subscription</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Expired;
