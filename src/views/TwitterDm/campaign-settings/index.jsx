/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const CampaignSettings = () => {
    const [loading, setLoading] = useState(false);
    console.log({ loading });
    const handleChange = () => {};
    return (
        <Box>
            <Box sx={{ width: { lg: `70%` }, mx: `auto` }}>
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
                    <Typography sx={{ textAlign: `right`, mt: 2 }}>
                        <Button variant="contained" sx={{ cursor: `pointer` }}>
                            Save
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CampaignSettings;
