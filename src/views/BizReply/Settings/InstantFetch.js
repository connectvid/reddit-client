/* eslint-disable no-unreachable */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import { Autocomplete, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { refetchingProjectAPI, clearingError, projectRefetchingInitializedStatus } from 'features/project/projectActions';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import BRButton from 'ui-component/bizreply/BRButton';
import errorMsgHelper from 'utils/errorMsgHelper';

export default function () {
    const {
        project: { project, error, projectRefetchingInitLoading, projectRefetchingInitialized }
    } = useSelector((s) => s);
    const { getAccessToken } = useAuth();

    const fetchTimings = [
        { label: 'Every day', value: 1 },
        { label: 'Every week', value: 7 },
        { label: 'Every month', value: 30 },
        { label: 'Every year', value: 365 }
    ];

    const postsPerRequests = [10, 20, 30, 40, 50, 100];
    const [values, setValues] = useState({
        fetchTiming: fetchTimings[0].value,
        postsPerRequest: postsPerRequests[0]
    });

    useEffect(() => {
        if (project) {
            setValues({
                postsPerRequest: project?.postsPerRequest,
                fetchTiming: project?.defaultFetch
            });
        }
    }, []);
    useEffect(() => {
        if (error) {
            toast.warn(error);
            clearingError(null)();
        }
    }, [error]);

    useEffect(() => {
        if (projectRefetchingInitialized) {
            toast.success(`Instant project fetch has been started!`);
            projectRefetchingInitializedStatus(false)();
        }
    }, [projectRefetchingInitialized]);

    const handleInstantFetch = async () => {
        try {
            if (!project?._id) {
                toast.warn(`Please create a new project first to setup advance settings!`);
                return;
            }
            const token = await getAccessToken();
            refetchingProjectAPI({ token, data: values, id: project._id })();
        } catch (e) {
            console.error(e);
            toast.warn(errorMsgHelper(e));
        }
    };

    return (
        <>
            <Box
                sx={{
                    background: '#fff',
                    borderRadius: '10px'
                    // ...wrapperSx
                }}
            >
                <Box>
                    <Box sx={{ minWidth: '300px', mt: 0 }}>
                        <Box>
                            <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>When to fetch posts</Typography>
                            <Autocomplete
                                id="Whentofetchposts"
                                disablePortal
                                onChange={(_, data) => {
                                    if (data) setValues((p) => ({ ...p, fetchTiming: data?.value }));
                                    return data;
                                }}
                                defaultValue={fetchTimings?.find?.((im) => im.value === project?.defaultFetch)}
                                options={fetchTimings}
                                sx={{ minWidth: 250, mt: 1, mb: 2 }}
                                disableClearable
                                renderInput={(params) => <TextField fullWidth {...params} required placeholder="When to fetch posts" />}
                            />
                        </Box>
                        {/*<Box>
                            <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Number of posts to fetch on each request
                            </Typography>
                            <Autocomplete
                                id="Numberofpoststofetchoneachrequest"
                                fullWidth
                                onChange={(_, data) => {
                                    if (data) setValues((p) => ({ ...p, postsPerRequest: data }));
                                    return data;
                                }}
                                defaultValue={project?.postsPerRequest}
                                getOptionLabel={(item) => item}
                                disablePortal
                                options={postsPerRequests}
                                sx={{
                                    mt: 1,
                                    mb: 2
                                }}
                                disableClearable
                                renderInput={(params) => (
                                    <TextField fullWidth {...params} required placeholder="Number of posts to fetch on each request" />
                                )}
                            />
                        </Box> */}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', my: 2 }}>
                <BRButton
                    sx={{ height: '40px' }}
                    fullWidth
                    disabled={projectRefetchingInitLoading}
                    variant="contained"
                    onClick={handleInstantFetch}
                >
                    {projectRefetchingInitLoading ? <CircularProgress sx={{ maxHeight: '20px', maxWidth: '20px', ml: 1 }} /> : 'Fetch'}
                </BRButton>
            </Box>
        </>
    );
}
