import React from 'react';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import BRButton from 'ui-component/bizreply/BRButton';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';

export default function () {
    const { getAccessToken, dbUser, setDbUser } = useAuth();
    const [openAIkey, setOpenAIkey] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    console.log(dbUser, 'dbUser');
    const handleSubmit = async (e) => {
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
            setDbUser((p) => ({ ...p, openAIkey: data.openAIkey }));
            toast.success(data.message);
            setOpenAIkey('');
            setOpenUpdate(false);
        } catch (e) {
            console.log(e);
            toast.warn(errorMsgHelper(e));
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {/*  */}
            {(dbUser && dbUser?.needOpenAiKey && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Box>
                            {/* sx={{ width: { md: '60%', sm: '80%', xs: '100%' } }} */}
                            {!dbUser?.openAIkey || openUpdate ? (
                                <form onSubmit={handleSubmit}>
                                    <Typography sx={{ mb: 2 }}>Open AI key</Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px',
                                            width: { md: '60%', sm: '80%', xs: '100%' }
                                        }}
                                    >
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
                                            sx={{ color: '#fff', width: '180px', height: '50px' }}
                                        >
                                            {openUpdate ? 'Update' : 'Add'} {` `}
                                            {(loading && <CircularProgress sx={{ maxHeight: '16px', maxWidth: '16px', ml: 1 }} />) || ''}
                                        </BRButton>
                                        {/* {openUpdate && (
                                            <BRButton
                                                disabled={loading || !openAIkey}
                                                variant="outlined"
                                                sx={{ width: '120px', height: '50px' }}
                                                grandChildSx={{ textAlign: 'center', width: '100%', display: 'block' }}
                                            >
                                                Cancel x
                                            </BRButton>
                                        )} */}
                                    </Box>
                                </form>
                            ) : (
                                <>
                                    <Box>
                                        <Typography sx={{ mb: 1 }}>Open AI API key:</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                            <Typography>{dbUser?.openAIkey}</Typography>
                                            {/* <BRButton
                                                sx={{ color: '#fff', width: '100px' }}
                                                onClick={() => {
                                                    setOpenUpdate(true);
                                                }}
                                            >
                                                Edit
                                            </BRButton> */}
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            )) ||
                ''}
        </>
    );
}
