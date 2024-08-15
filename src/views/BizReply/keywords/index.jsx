/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Button, Card, CardContent, CircularProgress, Dialog, Grid, Typography } from '@mui/material';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { createdKeywordSuccess, createKeywordsApi, deleteKeywordAPI, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import AddKeyword from './AddKeyword';
import { useLocation, useNavigate } from 'react-router-dom';
import { MENTION_PATH } from 'config';
import React from 'react';
import KeywordBreadcrumb from 'ui-component/KeywordBreadcrumb';
import { FiTrash2 } from 'react-icons/fi';
import { TbSquareAsterisk } from 'react-icons/tb';
import GradinentText from 'ui-component/GradinentText';
import { LiaTimesCircle } from 'react-icons/lia';
import BRButton from 'ui-component/bizreply/BRButton';
import useAuth from 'hooks/useAuth';

const Keywords = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const { getAccessToken } = useAuth();
    const { project, projects, createKeywordSuccess, createKeywordsLoading, customKeywords } = useSelector((state) => state.project);

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
                    <AddKeyword />
                    <Typography sx={{ display: 'flex', gap: '10px', justifyContent: 'end', p: '20px' }}>
                        <Button onClick={modalClose} sx={{ width: '156px', background: '#EAEAEA' }}>
                            Cancle
                        </Button>
                        <BRButton
                            disabled={
                                !Object.values(customKeywords || {})?.filter?.((item) => item.trim())?.length || createKeywordsLoading
                            }
                            onClick={async () => {
                                const token = await getAccessToken();
                                const body = {
                                    projectId: project._id,
                                    suggestedKeywords: [...Object.values(customKeywords).filter((item) => item.trim())]
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
                <Typography>
                    <span onClick={toggleProjectCreateModalCtrl()}>Create a project</span>
                </Typography>
            ) : (
                <>
                    {!project ? (
                        <Typography>Please Select a Project</Typography>
                    ) : project.Suggestedkeywords?.length ? (
                        <>
                            {!createKeywordSuccess ? (
                                <Grid container spacing={2}>
                                    {project.Suggestedkeywords.map?.((item) => (
                                        <Grid key={item._id} item xs={12} sm={6} md={4}>
                                            <KeywordCard {...item} {...{ accessToken }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                ''
                            )}
                        </>
                    ) : (
                        <AddKeyword />
                    )}
                </>
            )}
        </>
    );
};

export default Keywords;

const KeywordCard = ({ _id, title, accessToken, brandLogo = 'brand-logo/clickup.png' }) => (
    <Card sx={{ border: '1px solid rgba(0,0,0,0.8)', height: '197px', borderRadius: '12px' }}>
        <CardContent sx={{}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>
                        <img src={brandLogo} alt="brandLogo" style={{ height: '25px' }} />
                    </Typography>
                    <Typography
                        sx={{ cursor: 'pointer' }}
                        onClick={async () => {
                            if (!confirm(`Are you sure to delete keyword with associated mentions?`)) return;
                            deleteKeywordAPI(accessToken, _id)();
                        }}
                    >
                        <FiTrash2 size={24} color="#6E7478" />
                    </Typography>
                </Box>
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        padding: '1px',
                        backgroundImage: 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)',
                        borderRadius: '8px',
                        height: '48px'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background: 'white',
                            px: '20px',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: '16px',
                                color: 'rgba(0,0,0,1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <TbSquareAsterisk size={16.5} color="#000" /> Keyword
                        </Typography>

                        <GradinentText
                            onClick={async () => {
                                // eslint-disable-next-line no-alert
                                if (!confirm(`Are you sure to delete keyword with associated mentions?`)) return;
                                deleteKeywordAPI(accessToken, _id)();
                            }}
                            sx={{
                                fontWeight: 700,
                                fontSize: '16px'
                            }}
                        >
                            {title}
                        </GradinentText>
                    </Box>
                </Box>
                <Box sx={{ mt: '6px' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '16px', color: '#6E7478' }}>Replies</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '6px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.8)' }}>
                            <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px' }}>Last month:</Typography>
                            <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px', ml: '2px' }}> 0</Typography>
                        </Box>{' '}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,1)' }}>
                            <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px' }}>Last 24h:</Typography>
                            <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px', ml: '2px' }}> 0</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    </Card>
);
