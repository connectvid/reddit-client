/* eslint-disable no-unreachable */
/* eslint-disable no-nested-ternary */
import { Box, Button, CircularProgress, Dialog, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { createdKeywordSuccess, createKeywordsApi } from 'features/project/projectActions';
import AddKeyword from './AddKeyword';
import { useLocation, useNavigate } from 'react-router-dom';
import { MENTION_PATH } from 'config';
import React from 'react';
import KeywordBreadcrumb from 'ui-component/KeywordBreadcrumb';
import { LiaTimesCircle } from 'react-icons/lia';
import BRButton from 'ui-component/bizreply/BRButton';
import useAuth from 'hooks/useAuth';
import EmptyProject from '../projects/EmptyProject';
import KeywordCard from './KeywordCard';
import NegativeKeywordCard from './NegativeKeywordCard';
import Empty from '../Empty';

const Keywords = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const { getAccessToken } = useAuth();
    const { project, projects, createKeywordSuccess, createKeywordsLoading, customKeywords, customNegativeKeywords } = useSelector(
        (state) => state.project
    );

    // keywordDeleted
    const { accessToken } = useSelector((state) => state.auth);
    const [openModal, setOpenModal] = React.useState(false);
    React.useEffect(() => {
        if (createKeywordSuccess) {
            navigate(`${MENTION_PATH}${search}`, { state: { socket: true } });
            createdKeywordSuccess(false)();
        }
    }, [createKeywordSuccess]);
    console.log({ createKeywordSuccess });
    const handleModal = () => setOpenModal((p) => !p);
    const modalClose = () => setOpenModal(false);

    return (
        <>
            <KeywordBreadcrumb {...{ handleModal }} />
            <Dialog
                open={openModal}
                onClose={modalClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm':
                        {
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
                        <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Create a new keyword</Typography>
                        <Typography onClick={modalClose} sx={{ cursor: 'pointer' }}>
                            <LiaTimesCircle color="#000" size={24} />
                        </Typography>
                    </Box>
                    <AddKeyword {...{ unmountClear: true, handleClose: modalClose }} />
                    <Typography sx={{ display: 'flex', gap: '10px', justifyContent: 'end', p: '20px' }}>
                        <Button onClick={modalClose} sx={{ width: '156px', background: '#EAEAEA' }}>
                            Cancel
                        </Button>
                        <BRButton
                            disabled={
                                !(
                                    Object.values(customNegativeKeywords || {}).filter((item) => item.trim()).length ||
                                    Object.values(customKeywords || {}).filter((item) => item.trim()).length
                                ) || createKeywordsLoading
                            }
                            onClick={async () => {
                                console.log(customKeywords, customNegativeKeywords);
                                // return 0;
                                const token = await getAccessToken();
                                const body = {
                                    projectId: project._id,
                                    suggestedKeywords: [...Object.values(customKeywords).filter((item) => item.trim())],
                                    negativeKeywords: [...Object.values(customNegativeKeywords).filter((item) => item.trim())]
                                };
                                createKeywordsApi(token, body)();
                            }}
                            variant="contained"
                            sx={{ fontSize: '14px', fontWeight: 500, width: '196px' }}
                        >
                            Save Keyword {(createKeywordsLoading && <CircularProgress sx={{ maxWidth: 16, maxHeight: 16, ml: 1 }} />) || ''}
                        </BRButton>
                    </Typography>
                </Box>
            </Dialog>

            {!projects?.length ? (
                <EmptyProject />
            ) : (
                <>
                    {!project ? (
                        <Typography>Please Select a Project</Typography>
                    ) : project.Suggestedkeywords?.length ? (
                        <>
                            {!createKeywordSuccess ? (
                                <>
                                    <Grid container spacing={2}>
                                        {project.Suggestedkeywords.map?.((item) => (
                                            <Grid key={item._id} item xs={12} sm={6} md={4}>
                                                <KeywordCard
                                                    {...item}
                                                    {...{ accessToken, brandLogo: project?.brandLogo, brandName: project?.brandName }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {(project.negativeKeywords?.length && (
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px', margin: '30px 0 20px' }}>
                                            Negative Keywords:{' '}
                                        </Typography>
                                    )) ||
                                        ''}

                                    <Grid container spacing={2}>
                                        {project.negativeKeywords?.map?.((item) => {
                                            return (
                                                <Grid key={item._id} item xs={12} sm={6} md={4}>
                                                    <NegativeKeywordCard
                                                        // {...item}
                                                        {...{
                                                            accessToken,
                                                            brandLogo: project?.brandLogo,
                                                            brandName: project?.brandName,
                                                            item
                                                        }}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </>
                            ) : (
                                ''
                            )}
                        </>
                    ) : (
                        <Empty
                            {...{
                                unmountClear: true,
                                handleClose: modalClose,
                                handleModal,
                                buttonTitle: 'Create a new keyword',
                                description: `Currently don’t have any keywords yet. Let’s create keyword`
                            }}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default Keywords;
