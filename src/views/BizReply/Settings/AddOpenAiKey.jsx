import React from 'react';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import BRButton from 'ui-component/bizreply/BRButton';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';

export default function () {
    const { getAccessToken } = useAuth();
    const [openAIkey, setOpenAIkey] = React.useState('');
    const [loading, setLoading] = React.useState('');
    return (
        <Card sx={{ mt: 4 }}>
            <CardContent>
                <Box>
                    {/* sx={{ width: { md: '60%', sm: '80%', xs: '100%' } }} */}
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                setLoading(true);
                                const token = await getAccessToken();
                                const { data } = await axios.post(
                                    `user/open-ai-key`,
                                    { openAIkey },
                                    {
                                        headers: { Authorization: `Bearer ${token}` }
                                    }
                                );
                                toast.success(data.message);
                                setOpenAIkey('');
                            } catch (e) {
                                console.log(e);
                                toast.warn(errorMsgHelper(e));
                            } finally {
                                setLoading(false);
                            }
                        }}
                    >
                        <Typography sx={{ mb: 2 }}>Open AI key</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', width: { md: '60%', sm: '80%', xs: '100%' } }}>
                            <BRInput2
                                placeholder="Enter Open API Key"
                                fullWidth
                                value={openAIkey}
                                onChange={({ target: { value = '' } }) => {
                                    setOpenAIkey(value);
                                }}
                            />

                            <BRButton
                                disabled={loading || !openAIkey}
                                variant="contained"
                                type="submit"
                                style={{ color: '#fff', width: '180px', height: '50px' }}
                            >
                                Add {(loading && <CircularProgress sx={{ maxHeight: '16px', maxWidth: '16px', ml: 1 }} />) || ''}
                            </BRButton>
                        </Box>
                    </form>
                </Box>
            </CardContent>
        </Card>
    );
}
