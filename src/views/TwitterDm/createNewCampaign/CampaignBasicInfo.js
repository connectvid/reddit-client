/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { FormControl, TextField, Select, MenuItem, Button, Box, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';

const CampaignBasicInfo = ({
    selectedList,
    setSelectedList,
    selectedInstagramAccount,
    setSelectedInstagramAccount,
    message,
    setMessage,
    name,
    setName
}) => {
    const { getAccessToken, dbUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [lists, setLists] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const getLeads = async () => {
        try {
            setLoading(true);
            const token = await getAccessToken();
            const data = await axios.get(`list/${dbUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLists(data.data.lists);
        } catch (e) {
            const status = e?.response?.status || 500;
            let message = `Something Went Wrong!`;
            if (status < 500) {
                message = e?.response?.data?.message || e.message;
            }
            toast.error(message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const getAccounts = async () => {
        try {
            setLoading(true);
            const token = await getAccessToken();
            const {
                data: { items = [] }
            } = await axios.get(`accounts/${dbUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccounts(items);
        } catch (e) {
            const status = e?.response?.status || 500;
            let message = `Something Went Wrong!`;
            if (status < 500) {
                message = e?.response?.data?.message || e.message;
            }
            toast.error(message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLeads();
        getAccounts();
    }, []);

    return (
        <Box>
            <Box sx={{ width: { lg: `90%` }, mx: `auto` }}>
                <Typography variant="h2" sx={{ my: 3 }}>
                    Basic Campaign Info
                </Typography>
                <Box sx={{ border: `1px solid #ddd`, borderRadius: `5px`, p: 3, bgcolor: `#fff` }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>
                                <TextField
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    label="Name"
                                    multiline
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    label="Message"
                                    multiline
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <Select value={selectedList} onChange={(e) => setSelectedList(e.target.value)} displayEmpty>
                                        <MenuItem value="">
                                            <em>Select Target List</em>
                                        </MenuItem>
                                        {lists.map((list) => (
                                            <MenuItem key={list._id} value={list._id}>
                                                {list.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <Select
                                        value={selectedInstagramAccount}
                                        onChange={(e) => setSelectedInstagramAccount(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <em>Select Twitter Account</em>
                                        </MenuItem>
                                        {accounts.map((account) => (
                                            <MenuItem key={account._id} value={account._id}>
                                                {account.username}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default CampaignBasicInfo;
