/* eslint-disable no-nested-ternary */
import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import AddAndUpdatePrompt from './AddPrompt';
import React from 'react';
import BRButton from 'ui-component/bizreply/BRButton';
// import useAuth from 'hooks/useAuth';
import emptyImage from 'assets/images/projects.png';
import { IconPlus } from '@tabler/icons';
import PromptCard from './PromptCard';
import { createPromptStatus, deletePromptStatus, updatePromptStatus } from 'features/prompt/promptActions';
import { toast } from 'react-toastify';
import PromptBreadcrumb from 'ui-component/Prompt/PromptBreadcrumb';
import { clearingError as promptElearingError } from 'features/project/projectActions';

export default function () {
    // const { getAccessToken } = useAuth();
    const { prompts, loading, created, updated, deleted, error: promptError } = useSelector((state) => state.prompt);
    const [openModal, setOpenModal] = React.useState(false);
    const [editObj, setEditObj] = React.useState(null);

    // React.useEffect(() => {
    //     if (!prompts?.length) {
    //         (async () => {
    //             try {
    //                 const token = await getAccessToken();
    //                 getPromptsAPI(token)();
    //             } catch (e) {
    //                 console.error(e);
    //             }
    //         })();
    //     }
    // }, []);
    // console.log({ prompts });

    const handleModal = () => setOpenModal((p) => !p);
    const handleEditor = (selectedObj) => {
        handleModal();
        setEditObj(selectedObj);
    };

    const modalClose = () => {
        setEditObj(null);
        setOpenModal(false);
    };
    React.useEffect(() => {
        if (created) {
            modalClose();
            toast.success(`Prompt has been added!`);
            createPromptStatus(false)();
        }
        if (updated) {
            modalClose();
            toast.success(`Prompt has been updated!`);
            updatePromptStatus(false)();
            setEditObj(null);
        }
        if (deleted) {
            toast.success(`Prompt has been deleted!`);
            deletePromptStatus(false)();
        }
        if (promptError) {
            toast.warn(promptError);
            promptElearingError()();
        }
    }, [created, updated, deleted, promptError]);
    return (
        <>
            <PromptBreadcrumb {...{ handleModal }} />
            <Dialog
                open={openModal}
                // onClose={modalClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm':
                        {
                            p: 0,
                            m: 0,
                            minWidth: '545px'
                        }
                }}
            >
                {(openModal && <AddAndUpdatePrompt {...{ modalClose, isUpdate: Boolean(editObj), initVals: editObj }} />) || ''}
            </Dialog>
            {loading ? (
                <></>
            ) : (
                <>
                    {prompts?.length ? (
                        <>
                            {/* <Box sx={{ display: 'flex', justifyContent: '', alignItems: 'center' }}>
                                {prompts.map?.((item) => (
                                    <Box key={item._id} sx={{ width: '33%' }}>
                                        <PromptCard
                                            {...item}
                                            // {...{  }}
                                        />
                                    </Box>
                                ))}
                            </Box> */}
                            <Grid container spacing={2}>
                                {prompts.map?.((item) => (
                                    <Grid key={item._id} item xs={12} sm={6} md={4}>
                                        {/* <Grid
                                        key={item._id}
                                        item
                                        style={{
                                            flexBasis: 'calc(33.33% - 16px)', // Base width for three items per row
                                            minWidth: '450px', // Minimum width for each card
                                            padding: '8px', // Padding for spacing between items
                                            boxSizing: 'border-box' // Ensures padding is included in width calculation
                                        }}
                                    > */}
                                        <PromptCard
                                            {...item}
                                            {...{
                                                setEditObj,
                                                handleEditor
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Empty {...{ unmountClear: true, handleClose: modalClose, handleModal }} />
                    )}
                </>
            )}
        </>
    );
}

const Empty = ({ handleModal }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center', width: { sx: '60%', md: '50%' }, mx: 'auto', mt: 6 }}>
                <img src={emptyImage} alt="Empty" />
                <Typography sx={{ fontSize: '20px', fontWeight: 500, textAlign: 'center', my: 4 }}>
                    Currently don’t have any prompts yet. Let’s create Prompt
                </Typography>
                <BRButton
                    sx={{
                        height: '40px',
                        width: '246px',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#fff',
                        textAlign: 'center',
                        mx: 'auto'
                    }}
                    variant="contained"
                    onClick={handleModal}
                >
                    <IconPlus size={20} /> Create a new Prompt
                </BRButton>
            </Box>
        </Box>
    );
};
