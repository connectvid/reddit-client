/* eslint-disable no-unreachable */
/* eslint-disable no-nested-ternary */
import { Dialog, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { createdKeywordSuccess, createdNegativeKeywordSuccess } from 'features/project/projectActions';
import CreateKeyword from './CreateKeyword';
import { useLocation, useNavigate } from 'react-router-dom';
import { MENTION_PATH } from 'config';
import React from 'react';
import KeywordBreadcrumb from 'ui-component/Keyword/KeywordBreadcrumb';

import EmptyProject from '../projects/EmptyProject';
import KeywordCard from './KeywordCard';
import NegativeKeywordCard from './NegativeKeywordCard';
import Empty from '../Empty';
import { toast } from 'react-toastify';

const Keywords = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    // const { getAccessToken } = useAuth();
    const { project, projects, createKeywordSuccess, createNegativeKeywordSuccess } = useSelector((state) => state.project);

    // keywordDeleted
    const { accessToken } = useSelector((state) => state.auth);
    const [openModal, setOpenModal] = React.useState(false);
    const modalClose = () => setOpenModal(false);
    React.useEffect(() => {
        if (createKeywordSuccess) {
            toast.success('Keyword has been added!');
            navigate(`${MENTION_PATH}${search}`, { state: { socket: true } });
            createdKeywordSuccess(false)();
        } else if (createNegativeKeywordSuccess) {
            toast.success('Negative keyword has been added!');
            createdNegativeKeywordSuccess(false)();
        }
        modalClose();
    }, [createKeywordSuccess, createNegativeKeywordSuccess]);
    // console.log({ createNegativeKeywordSuccess, createKeywordSuccess });
    const handleModal = () => {
        if (!projects?.length) {
            toast.warn(`Please create a new project first to create a keyword!`);
            return;
        }
        setOpenModal((p) => !p);
    };

    return (
        <>
            <KeywordBreadcrumb {...{ handleModal }} />
            <Dialog
                open={openModal}
                onClose={modalClose}
                sx={{
                    '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm':
                        {
                            p: 0,
                            m: 0
                        }
                }}
            >
                {openModal ? <CreateKeyword {...{ modalClose }} /> : ''}
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
                                        {project.negativeKeywords?.map?.((keyword) => {
                                            return (
                                                <Grid key={keyword._id} item xs={12} sm={6} md={4}>
                                                    <NegativeKeywordCard
                                                        // {...item}
                                                        {...{
                                                            accessToken,
                                                            brandLogo: project?.brandLogo,
                                                            brandName: project?.brandName,
                                                            projectId: project?._id,
                                                            keyword
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
