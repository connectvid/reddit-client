/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import AddKeyword from './AddKeyword';
import { IconTrash } from 'tabler-icons';
import { Link } from 'react-router-dom';
import { KEYWORD_PATH } from 'config';

const Keywords = () => {
    // const { getAccessToken } = useAuth();
    const { project, projects } = useSelector((state) => state.project);

    return (
        <>
            <Card sx={{ mb: 5, minHeight: '75vh' }}>
                <CardContent style={{}}>
                    <Box mb={4}>
                        <Typography
                            variant="h2"
                            style={{
                                marginRight: 'auto'
                            }}
                        >
                            Keywords
                        </Typography>
                    </Box>
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Card sx={{ border: '2px solid rgba(0,0,0,0.8)' }}>
                                                <CardContent sx={{}}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography sx={{ color: 'transparent', fontWeight: 'bold' }}>title</Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                                <Link to={`${KEYWORD_PATH}/add`} style={{ textDecoration: 'none' }}>
                                                                    Add Keyword
                                                                </Link>
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    color: 'transparent'
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <Typography>xxxxxxxxxxx</Typography>
                                                                    <Typography sx={{ fontWeight: 'bold' }}> xx</Typography>
                                                                </Box>{' '}
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <Typography>xxxxxxxxxxxxxxx</Typography>
                                                                    <Typography sx={{ fontWeight: 'bold' }}> xxxx</Typography>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        {project.Suggestedkeywords.map?.((item) => (
                                            <Grid key={item._id} item xs={12} sm={6} md={4}>
                                                <KeywordCard {...item} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </>
                            ) : (
                                <AddKeyword />
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default Keywords;

const KeywordCard = ({ _id, projectId, title, search }) => (
    <Card sx={{ border: '2px solid rgba(0,0,0,0.8)' }}>
        <CardContent sx={{}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>{title}</Typography>
                    <Typography>
                        <IconTrash size={16} />
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
