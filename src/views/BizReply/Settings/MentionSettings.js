import { Autocomplete, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import BRButton from 'ui-component/bizreply/BRButton';
import BRInput from 'ui-component/bizreply/BRInput';
import axios from 'utils/axios';

const MentionSettings = () => {
    const { dbUser, getAccessToken } = useAuth();
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const chosenLanguages = [
        { label: 'English', value: 'en' },
        { label: 'Akan', value: 'ak' }
    ];
    const fetchTimings = [
        { label: '24  Hours', value: 1 },
        { label: '2 days', value: 2 },
        { label: '3 days', value: 3 },
        { label: '4 days', value: 4 },
        { label: '5 days', value: 5 },
        { label: '6 days', value: 6 },
        { label: '7 days', value: 7 },
        { label: '15 days', value: 15 },
        { label: '30 days', value: 30 }
    ];
    const postsPerRequests = [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '30', value: 30 },
        { label: '40', value: 40 },
        { label: '50', value: 50 },
        { label: '100', value: 100 }
    ];
    const [values, setValues] = useState({
        chosenLanguage: 'en',
        fetchTiming: 1,
        postsPerRequest: 10
    });

    const getMentionSettings = async () => {
        const token = await getAccessToken();
        const response = await axios.get(`mention-settings`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data?.data, 'this is the response');
        if (response.data?.data?._id) {
            setValues({
                chosenLanguage: response.data?.data?.chosenLanguage,
                fetchTiming: response.data?.data?.fetchTiming,
                postsPerRequest: response.data?.data?.postsPerRequest
            });
            setChecked(response.data?.data?.isActive);
        }
    };
    useEffect(() => {
        getMentionSettings();
    }, []);

    const updateMentionSettings = async () => {
        const token = await getAccessToken();
        // console.log(checked, values);
        const body = {
            ...values,
            isActive: checked
        };
        const response = await axios.post(`mention-settings`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response, 'THIS IS the response');
    };

    return (
        <>
            <Box
                sx={{
                    background: '#fff',
                    p: 3,
                    mt: 4,
                    borderRadius: '10px'
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                            Mention settings
                        </Typography>
                    </Box>
                    <Box style={{ width: '50%', minWidth: '300px', marginTop: '20px' }}>
                        <span style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '16px' }}>Choose language</span>
                        <Autocomplete
                            onChange={(_, data) => {
                                if (data) setValues((p) => ({ ...p, chosenLanguage: data.value }));
                                return data;
                            }}
                            defaultValue={values.chosenLanguage}
                            disablePortal
                            id="combo-box-demo"
                            options={chosenLanguages}
                            sx={{ minWidth: 250, mt: 1, mb: 2 }}
                            disableClearable
                            renderInput={(params) => <TextField {...params} required placeholder="Choose language" />}
                        />
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>When to fetch posts</span>
                        <Autocomplete
                            onChange={(_, data) => {
                                if (data) setValues((p) => ({ ...p, fetchTiming: data.value }));
                                return data;
                            }}
                            defaultValue={values.fetchTiming}
                            disablePortal
                            id="combo-box-demo"
                            options={fetchTimings}
                            sx={{ minWidth: 250, mt: 1, mb: 2 }}
                            disableClearable
                            renderInput={(params) => <TextField {...params} required placeholder="When to fetch posts" />}
                        />
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Number of posts to fetch on each request</span>
                        <Autocomplete
                            onChange={(_, data) => {
                                if (data) setValues((p) => ({ ...p, postsPerRequest: data.value }));
                                return data;
                            }}
                            defaultValue={values.postsPerRequest}
                            disablePortal
                            id="combo-box-demo"
                            options={postsPerRequests}
                            sx={{ minWidth: 250, mt: 1, mb: 2 }}
                            disableClearable
                            renderInput={(params) => (
                                <TextField {...params} required placeholder="Number of posts to fetch on each request" />
                            )}
                        />
                    </Box>

                    <div style={{ alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Ability to on/off fetching request</span>
                        <br />
                        <FormControlLabel
                            control={<Switch checked={checked} onChange={handleChange} color="primary" />}
                            label={checked ? 'On' : 'Off'}
                        />
                    </div>
                </Box>
            </Box>
            <Box style={{ display: 'flex', float: 'right', marginTop: '20px', marginBottom: '100px' }}>
                <BRButton sx={{ height: '40px', width: '180px' }} variant="contained" onClick={updateMentionSettings}>
                    Save Changes
                </BRButton>
            </Box>
        </>
    );
};

export default MentionSettings;
