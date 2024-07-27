/* eslint-disable no-unreachable */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
// external imports
import { Button, LinearProgress, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';

const CampaignDetails = () => {
    const { getAccessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [campaignData, setCampaignData] = useState(null);
    const [leads, setLeads] = useState([]);

    const fetchCampaignData = async () => {
        setLoading(true);
        const token = await getAccessToken();
        try {
            const response = await axios.get(`campaign/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCampaignData(response.data.campaign);
            setLeads(response.data.leads);
            console.log(response.data);
        } catch (error) {
            toast.error('Error fetching campaign data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaignData();
    }, [id]);

    return (
        <Box p={2}>
            {loading && <LinearProgress />}
            {campaignData ? (
                <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Campaign Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Name:</Typography>
                            <Typography>{campaignData.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Message:</Typography>
                            <Typography>{campaignData.message}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Status:</Typography>
                            <Typography>{campaignData.status}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Leads Section */}
            {!loading && (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Leads
                    </Typography>
                    <Grid container spacing={2}>
                        {leads.length > 0 ? (
                            leads.map((lead) => (
                                <Grid item key={lead._id} xs={12} sm={6} md={4} lg={3}>
                                    <Paper elevation={1} sx={{ padding: 2, border: '1px solid black' }}>
                                        <Typography variant="subtitle1">Username: {lead.username}</Typography>
                                        <Typography variant="body2">Full Name: {lead.fullName}</Typography>
                                        <Typography variant="body2">
                                            Status: {lead.status}
                                            {lead.status === 'on queue' && (
                                                <span role="img" aria-label="On Queue">
                                                    ⏳
                                                </span>
                                            )}
                                            {lead.status === 'success' && (
                                                <span role="img" aria-label="Success">
                                                    ✅
                                                </span>
                                            )}
                                            {lead.status === 'failed' && (
                                                <span role="img" aria-label="Failed">
                                                    ❌
                                                </span>
                                            )}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ margin: '15px 0 0 15px' }}>
                                No leads found
                            </Typography>
                        )}
                    </Grid>
                </Paper>
            )}
        </Box>
    );
};

export default CampaignDetails;
