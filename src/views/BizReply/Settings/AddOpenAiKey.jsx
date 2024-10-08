import React from 'react';
import { Autocomplete, Box, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import BRButton from 'ui-component/bizreply/BRButton';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';
import { Link } from 'react-router-dom';
import { OPEN_AI_MODELS } from 'data';

export default function () {
    const { getAccessToken, dbUser, setDbUser } = useAuth();
    const [values, setValues] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    // console.log(dbUser, 'dbUser');
    const options = OPEN_AI_MODELS.map((item) => ({ label: item, value: item }));
    // React.useEffect(() => {
    //     if (dbUser?.openAIkey) {
    //         // setValues({ openAIkey: dbUser?.openAIkey });
    //     }
    // }, []);
    const handleEditOpen = () => {
        if (dbUser?.openAIModel) {
            setValues({ openAIModel: dbUser?.openAIModel });
        }
        setOpenUpdate(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = await getAccessToken();
            const { data } = await axios({
                url: `user/open-ai-key`,
                method: openUpdate ? 'PUT' : 'POST',
                data: values,
                headers: { Authorization: `Bearer ${token}` }
            });
            setDbUser((p) => ({ ...p, openAIkey: data.openAIkey, openAIModel: data.openAIModel }));
            toast.success(data.message);
            setValues({});
            // setValues((p) => ({ ...p, openAIkey: '' }));
            setOpenUpdate(false);
        } catch (e) {
            console.log(e);
            toast.warn(errorMsgHelper(e));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const token = await getAccessToken();
            const { data } = await axios.delete(`user/open-ai-key`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(data.message);
            setDbUser((p) => ({ ...p, openAIkey: '', openAIModel: '' }));
            setValues({});
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
            {(dbUser && dbUser?.needOpenAiKey && (
                <Card sx={{ mt: 4 }} id="add-open-ai-key">
                    <CardContent>
                        <Box>
                            {/* sx={{ width: { md: '60%', sm: '80%', xs: '100%' } }} */}
                            {!dbUser?.openAIkey || openUpdate ? (
                                <form onSubmit={handleSubmit}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{ color: '#000', my: 1 }}>Process to find your GPT API Keys:</Typography>
                                        <Link
                                            target="_blank"
                                            to="https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key"
                                        >
                                            https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key
                                        </Link>
                                    </Box>
                                    <Typography sx={{ mb: 2 }}>Open AI key</Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px',
                                            width: { md: '85%', sm: '100%', xs: '100%' }
                                        }}
                                    >
                                        <BRInput2
                                            placeholder="Enter Open API Key"
                                            fullWidth
                                            required={!openUpdate}
                                            value={values?.openAIkey || ''}
                                            name="openAIkey"
                                            onChange={({ target: { value = '' } }) => {
                                                setValues((p) => ({ ...p, openAIkey: value }));
                                            }}
                                        />
                                        <Autocomplete
                                            onChange={(_, data) => {
                                                if (data) setValues((p) => ({ ...p, openAIModel: data.value }));
                                                return data;
                                            }}
                                            defaultValue={options.find((item) => item.value === dbUser?.openAIModel)}
                                            disablePortal
                                            id="combo-box-demo"
                                            options={options}
                                            sx={{ minWidth: 250 }}
                                            disableClearable
                                            renderInput={(params) => <TextField {...params} required placeholder="Open AI model" />}
                                        />
                                        <BRButton
                                            disabled={
                                                loading // || Object.values(values)?.filter?.((item) => item?.trim?.())?.length !== 2
                                            }
                                            variant="contained"
                                            type="submit"
                                            sx={{ color: '#fff', width: '180px', height: '50px' }}
                                        >
                                            {openUpdate ? 'Update' : 'Add'} {` `}
                                            {(loading && <CircularProgress sx={{ maxHeight: '16px', maxWidth: '16px', ml: 1 }} />) || ''}
                                        </BRButton>
                                        {/* {openUpdate && (
                                            <BRButton
                                                disabled={loading}
                                                // || !openAIkey
                                                onClick={() => setOpenUpdate(false)}
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
                                            <BRButton sx={{ color: '#fff', width: '100px' }} onClick={handleEditOpen}>
                                                Edit
                                            </BRButton>
                                            <BRButton sx={{ color: '#fff', width: '100px' }} onClick={handleDelete}>
                                                Delete
                                            </BRButton>
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
