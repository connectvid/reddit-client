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

const EditList = ({ setLists, showEditList, setShowEditList, listToEdit, setListToEdit }) => {
    const { getAccessToken, dbUser } = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const editList = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('List name is required.');
            return;
        }

        const body = {
            name,
            description
        };
        console.log(body);
        const token = await getAccessToken();
        axios
            .patch(`list/${listToEdit._id}`, body, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res);
                toast.success('Updated list successfully.');
                setShowEditList(false);
                setName('');
                setDescription('');
                // setLists((items) => [...items, res.data.data]);
                setLists((prevLists) => prevLists.map((item) => (item._id === listToEdit._id ? res.data.data : item)));
                setListToEdit(null);
            })
            .catch(async (e) => {
                console.log(e);
                toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
            });
    };

    useEffect(() => {
        if (listToEdit?.name) {
            console.log(listToEdit, 'in');
            setName(listToEdit.name);
            setDescription(listToEdit.description || '');
        } else {
            setName('');
            setDescription('');
        }
        console.log(listToEdit, 'out');
    }, [listToEdit?._id]);

    return (
        <Dialog open={showEditList} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <form onSubmit={editList}>
                <DialogTitle id="alert-dialog-title">Update List Info</DialogTitle>
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
                            label="Description"
                            multiline
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setShowEditList(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditList;
