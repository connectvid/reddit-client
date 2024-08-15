/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { createdKeywordSuccess, deleteKeywordAPI, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import AddKeyword from './AddKeyword';
import { IconTrash } from 'tabler-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { KEYWORD_PATH, MENTION_PATH } from 'config';
import React from 'react';
import KeywordBreadcrumb from 'ui-component/KeywordBreadcrumb';

const Keywords = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    // const { getAccessToken } = useAuth();
    const { project, projects, createKeywordSuccess } = useSelector((state) => state.project);
    // keywordDeleted
    const { accessToken } = useSelector((state) => state.auth);
    React.useEffect(() => {
        if (createKeywordSuccess) {
            navigate(`${MENTION_PATH}${search}`, { state: { socket: true } });
            createdKeywordSuccess(false)();
        }
    }, [createKeywordSuccess]);
    console.log({ createKeywordSuccess });

    return (
        <>
            <KeywordBreadcrumb />
            {/* <Card sx={{ mb: 5, minHeight: '75vh' }}>
                <CardContent>
                 
                </CardContent>
            </Card> */}
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

const KeywordCard = ({ _id, title, accessToken }) => (
    <Card sx={{ border: '1px solid rgba(0,0,0,0.8)', height: '197px', borderRadius: '12px' }}>
        <CardContent sx={{}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>Logo</Typography>
                    <Typography
                        sx={{ cursor: 'pointer' }}
                        onClick={async () => {
                            // eslint-disable-next-line no-alert
                            if (!confirm(`Are you sure to delete keyword with associated mentions?`)) return;
                            deleteKeywordAPI(accessToken, _id)();
                        }}
                    >
                        <IconTrash size={16} />
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>Keyword</Typography>
                    <Typography
                        sx={{ cursor: 'pointer' }}
                        onClick={async () => {
                            // eslint-disable-next-line no-alert
                            if (!confirm(`Are you sure to delete keyword with associated mentions?`)) return;
                            deleteKeywordAPI(accessToken, _id)();
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ color: 'rgba(0,0,0,0.8)' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>Replies</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.8)' }}>
                            <Typography sx={{ color: 'rgba(0,0,0,0.8)' }}>Last month:</Typography>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}> 0</Typography>
                        </Box>{' '}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.8)' }}>
                            <Typography sx={{ color: 'rgba(0,0,0,0.8)' }}>Last 24h:</Typography>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}> 0</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    </Card>
);
