/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'utils/axios';

const AddProxy = ({ addProxy, setAddProxy, setProxies }) => {
    const { getAccessToken, dbUser } = useAuth();
    const [proxy, setProxy] = useState('');
    const [name, setName] = useState('');

    const handleAddProxy = async (e) => {
        e.preventDefault();
        if (!proxy || !name) {
            toast.error('Please enter proxy and proxy name.');
            return;
        }

        const body = {
            name,
            proxy,
            userId: dbUser._id
        };
        console.log(body);
        const token = await getAccessToken();

        const response = await axios.post(`proxy`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data.proxy);
        setProxies((elements) => [...elements, response.data.proxy]);
        toast.success(`Proxy has been added Successfully!`);

        setAddProxy(false);
    };

    return (
        <Dialog open={addProxy} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <form onSubmit={handleAddProxy}>
                <DialogTitle id="alert-dialog-title">Enter proxy info</DialogTitle>
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
                        <TextField fullWidth label="Proxy" multiline rows={4} value={proxy} onChange={(e) => setProxy(e.target.value)} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setAddProxy(false);
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

export default AddProxy;
