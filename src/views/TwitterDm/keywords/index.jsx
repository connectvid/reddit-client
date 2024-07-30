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
    <Card sx={{ border: '1px solid #ddd' }}>
        <CardContent sx={{}}>
            <Box sx={{ position: 'relative' }}>
                {/* <img src={redditFeeds} alt="Reddit Feeds" style={{ maxWidth: '100%' }} /> */}
                {/* <Typography
                    style={{
                        cursor: 'pointer',
                        // position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '25px',
                        width: '25px',
                        alignItems: 'center',
                        top: '10px',
                        right: '10px',
                        background: ' #ddd',
                        color: 'red',
                        borderRadius: '50%'
                    }}
                    // onClick={() => deleteProject(_id)}
                >
                    <IconTrash size={16} />
                </Typography> */}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
                    <Typography>
                        <IconTrash size={16} />
                    </Typography>
                </Box>
                <Box sx={{}}>
                    <Typography sx={{ fontWeight: 'bold' }}>Replies</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Last month:</Typography>
                            <Typography sx={{ fontWeight: 'bold' }}> 0</Typography>
                        </Box>{' '}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Last 24h:</Typography>
                            <Typography sx={{ fontWeight: 'bold' }}> 0</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    </Card>
);
