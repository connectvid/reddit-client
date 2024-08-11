/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MainCard from 'ui-component/cards/MainCard';

const PaymentDashboard = ({ fetchSubscribeData }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const created = new Date(fetchSubscribeData.created);
    const createdDate = `${created.getDate()}/${created.getMonth() + 1}/${created.getFullYear()}`;
    const current_period_start = new Date(fetchSubscribeData.current_period_start);
    const current_period_start_date = `${current_period_start.getDate()}/${
        current_period_start.getMonth() + 1
    }/${current_period_start.getFullYear()}`;
    const current_period_end = new Date(fetchSubscribeData.current_period_end);
    const current_period_end_date = `${current_period_end.getDate()}/${
        current_period_end.getMonth() + 1
    }/${current_period_end.getFullYear()}`;
    return (
        <MainCard sx={{ minHeight: '100%', position: 'relative' }}>
            <>
                <Box>
                    <Box
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '15px',
                            color: '#474b53'
                        }}
                    >
                        <Box style={{ height: '100%' }}>
                            <Typography variant="h2" style={{ marginBottom: '50px' }}>
                                Subscription
                            </Typography>
                            <Typography>
                                Your subscription created at: <span>{createdDate} </span>
                            </Typography>
                            <Typography>
                                Your current subscription period starts at : <span>{current_period_start_date}</span>{' '}
                            </Typography>
                            <Typography>
                                Your current subscription period ends at : <span>{current_period_end_date}</span>{' '}
                            </Typography>
                            <Button variant="outlined" size="small" sx={{ mt: 2 }} onClick={() => setIsConfirmOpen(true)}>
                                Cancel subscription
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </>
            <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                <DialogTitle>Notice</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please email hey@TwitterDm.io with the reason for unsubscribing</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3 }}>
                    <Button
                        onClick={() => {
                            setIsConfirmOpen(false);
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default PaymentDashboard;
