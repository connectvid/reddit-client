/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { Box } from '@mui/system';
import { IconTrash } from '@tabler/icons';
import { projectRemoving } from 'features/project/projectActions';
// import BizReplyConfig from 'BizReplyConfig';

import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import redditFeeds from 'assets/images/reddit-feeds.jpg';
import { subsctriptionCreditsSetter } from 'features/subscription/subscriptionActions';

const ProjectTable = ({
    // setProjects,
    projects = []
}) => {
    // const BASE_URL = BizReplyConfig.getNodeUrl();
    const { getAccessToken } = useAuth();
    // const [loading, setLoading] = React.useState(false);

    const deleteProject = async (id) => {
        if (!confirm(`Are you sure to delete the Project?`)) return;
        const token = await getAccessToken();
        axios
            .delete(`projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                toast('Project deleted successfully!', { autoClose: 2500, type: 'success' });
                projectRemoving(id)();

                subsctriptionCreditsSetter({ projects: 1 })();
            })
            .catch(async (e) => {
                console.log(e);
                toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
            });
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {projects?.map?.((item) => (
                    <Grid key={item._id} item xs={12} sm={6} md={4}>
                        <ProjectCard {...item} deleteProject={deleteProject} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProjectTable;

// material-ui

// ==============================|| SKELETON - EARNING CARD ||============================== //

const ProjectCard = ({ thumbnail = redditFeeds, brandName, domain, shortDescription, deleteProject, _id }) => (
    <Card>
        <CardContent sx={{ p: 0 }}>
            <Box sx={{ position: 'relative' }}>
                <img src={thumbnail} alt="Reddit Feeds" style={{ maxWidth: '100%' }} />
                <Typography
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
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
                    onClick={() => deleteProject(_id)}
                >
                    <IconTrash size={16} />
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Brand Name :</Typography>
                    <Typography>{brandName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Domain :</Typography>
                    <Typography>{domain}</Typography>
                </Box>
                <Box sx={{ display: '', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Description :</Typography>
                    <Typography>{shortDescription}</Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);