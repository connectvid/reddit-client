/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'utils/axios';

const CreateCampaign = ({ campaign, setCampaigns, createCampaign, setCreateCampaign }) => {
    const { getAccessToken, dbUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    const [selectedInstagramAccount, setSelectedInstagramAccount] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
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
            setLoading(!loading);
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

    const handleCreateCampaign = async (e) => {
        e.preventDefault();
        if (!selectedList || !message || !name || !selectedInstagramAccount) {
            toast.error('Please select a list and provide a message  and enter campaign name.');
            return;
        }

        const body = {
            name,
            message,
            status: 'processing',
            listId: selectedList,
            userId: dbUser._id,
            instagramAccountId: selectedInstagramAccount
        };
        console.log(body);
        const token = await getAccessToken();
        axios
            .post(`campaign`, body, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res);
                toast.success('Your campaign has been started, please check your inbox.');
                setCreateCampaign(false);
                setName('');
                setMessage('');
                setSelectedList('');
                setSelectedInstagramAccount('');
                setCampaigns((items) => [...items, res.data.data]);
            })
            .catch(async (e) => {
                console.log(e);
                toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
            });
    };

    useEffect(() => {
        getLeads();
        getAccounts();
    }, []);

    return (
        <Dialog open={createCampaign} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <form onSubmit={handleCreateCampaign}>
                <DialogTitle id="alert-dialog-title">Write message and select list</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            label="Name"
                            multiline
                            // rows={4}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Message"
                            multiline
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        {/* <InputLabel>Select List</InputLabel> */}
                        <Select
                            value={selectedList}
                            onChange={(e) => setSelectedList(e.target.value)}
                            displayEmpty
                            // placeholder="Select List"
                        >
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

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Select value={selectedInstagramAccount} onChange={(e) => setSelectedInstagramAccount(e.target.value)} displayEmpty>
                            <MenuItem value="">
                                <em>Select Twitter Account</em>
                            </MenuItem>
                            {accounts?.map((account) => (
                                <MenuItem key={account._id} value={account._id}>
                                    {account.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            setCreateCampaign(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button disabled={loading} variant="contained" type="submit">
                        Submit {loading && <CircularProgress sx={{ ml: 1, height: `24px !important`, width: `24px !important` }} />}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateCampaign;
