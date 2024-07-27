/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { FormControl, TextField, Select, MenuItem, Button, Box, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';

const CampaignSettings = () => {
    const handleChange = () => {};
    return (
        <Box>
            <Box>
                <Box sx={{ width: { lg: `90%` }, mx: `auto`, mt: 10 }}>
                    <Typography variant="h2" sx={{ my: 3 }}>
                        Campaign Settings
                    </Typography>
                    <Box sx={{ border: `1px solid #ddd`, borderRadius: `5px`, p: 3, bgcolor: `#fff` }}>
                        <Box>
                            <Typography variant="h4" sx={{ mb: 2 }}>
                                Delay between each request (min - max) in seconds
                            </Typography>
                            <Box sx={{ display: { lg: `flex`, md: 'block' }, gap: 2, justifyContent: `space-between` }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Minimum delay"
                                    placeholder="Enter minimum delay..."
                                    name="min_delay"
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Maximum delay"
                                    placeholder="Enter maximum delay..."
                                    name="max_delay"
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 3, display: 'block' }}>
                            <Typography variant="h4" sx={{ mb: 2 }}>
                                Maximum number of requests per day
                            </Typography>
                            <TextField
                                fullWidth
                                type="number"
                                label="Maximum number of requests per day"
                                placeholder="Maximum number of requests..."
                                name="max_number_of_request"
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CampaignSettings;
