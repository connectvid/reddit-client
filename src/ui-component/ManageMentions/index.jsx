import { Box, Button, CircularProgress, Dialog, Typography } from '@mui/material';
import { setUpdateProjectLoading, updateProjectAPI } from 'features/project/projectActions';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { LiaTimesCircle } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BRButton from 'ui-component/bizreply/BRButton';
import PlatformSelection from 'ui-component/PlatformSelection';

export default function ({ modalClose }) {
    const { getAccessToken } = useAuth();
    const {
        subscription: { subscription },
        project: { project, updateProjectLoading }
    } = useSelector((s) => s);

    const [selectedPlatforms, setSelectedPlatforms] = React.useState([]);

    React.useEffect(() => {
        if (project?.platforms?.length) setSelectedPlatforms(project.platforms);
        return () => {
            setSelectedPlatforms([]);
        };
    }, [project?.platforms?.length]);

    React.useEffect(() => {
        if (updateProjectLoading) {
            setUpdateProjectLoading(false)();
            toast.success(`Data has been updated!`);
            modalClose?.();
        }
    }, [updateProjectLoading]);

    const handleSelectedPlatform = (platform) => {
        if (!selectedPlatforms.includes(platform)) {
            setSelectedPlatforms((p) => [...p, platform]);
        } else {
            setSelectedPlatforms(selectedPlatforms.filter((item) => item !== platform));
        }
    };

    return (
        <Dialog
            open
            onClose={modalClose}
            aria-labelledby="responsive-dialog-title"
            sx={{
                '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm': {
                    p: 0,
                    m: 0
                }
            }}
        >
            <Box sx={{ border: '1px solid #ddd', borderRadius: '12px', m: 0, p: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '54px',
                        alignItems: 'center',
                        background: '#F1F1F1',
                        px: '20px',
                        borderRadius: '12px 12px 0 0'
                    }}
                >
                    <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Manage mentions</Typography>
                    <Typography onClick={modalClose} sx={{ cursor: 'pointer' }}>
                        <LiaTimesCircle color="#000" size={24} />
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 3
                    }}
                >
                    <PlatformSelection {...{ platforms: subscription.platforms, selectedPlatforms, handleSelectedPlatform }} />
                    <Typography sx={{ display: 'flex', gap: '10px', justifyContent: 'end', pt: 3 }}>
                        <Button onClick={modalClose} sx={{ width: '156px', background: '#EAEAEA' }}>
                            Cancel
                        </Button>
                        <BRButton
                            disabled={!selectedPlatforms.length || updateProjectLoading}
                            onClick={async () => {
                                if (!selectedPlatforms?.length) {
                                    toast.warn(`Please select at least one platform`);
                                    return;
                                }
                                const token = await getAccessToken();
                                const body = {
                                    platforms: selectedPlatforms
                                };
                                updateProjectAPI(token, project._id, body)();
                            }}
                            variant="contained"
                            sx={{ fontSize: '14px', fontWeight: 500, width: '196px' }}
                        >
                            Save
                            {(updateProjectLoading && <CircularProgress sx={{ maxWidth: 16, maxHeight: 16, ml: 1 }} />) || ''}
                        </BRButton>
                    </Typography>
                </Box>
            </Box>
        </Dialog>
    );

    // return ;
}
