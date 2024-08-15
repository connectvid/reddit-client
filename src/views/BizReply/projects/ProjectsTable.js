/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { Box } from '@mui/system';
import { IconTrash, IconEdit } from '@tabler/icons';
import { projectRemoving } from 'features/project/projectActions';
// import BizReplyConfig from 'BizReplyConfig';

import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import redditFeeds from 'assets/images/demoWebsite.png';
import { subsctriptionCreditsSetter } from 'features/subscription/subscriptionActions';
import BRButton from 'ui-component/bizreply/BRButton';

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

    const editProject = async (id) => {
        console.log(id);
        toast('We are working on this feature', { autoClose: 2500, type: 'warning' });
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {projects?.map?.((item) => (
                    <Grid key={item._id} item xs={12} sm={6} md={4}>
                        <ProjectCard {...item} deleteProject={deleteProject} editProject={editProject} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProjectTable;

// material-ui

// ==============================|| SKELETON - EARNING CARD ||============================== //

const ProjectCard = ({ thumbnail = redditFeeds, brandName, domain, shortDescription, deleteProject, _id, editProject }) => (
    <Card>
        <CardContent sx={{ p: 0, fontWeight: '500' }}>
            <Box sx={{ position: 'relative' }}>
                <img src={thumbnail} alt="Reddit Feeds" style={{ maxWidth: '100%', padding: '15px', borderRadius: '25px' }} />
                <Typography
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '35px',
                        width: '35px',
                        alignItems: 'center',
                        bottom: '30px',
                        right: '70px',
                        background: ' #DDDDDD',
                        color: '#6E7478',
                        borderRadius: '50%'
                    }}
                    onClick={() => deleteProject(_id)}
                >
                    <IconTrash size={20} />
                </Typography>
                <Typography
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '35px',
                        width: '35px',
                        alignItems: 'center',
                        bottom: '30px',
                        right: '30px',
                        background: ' #DDDDDD',
                        color: '#6E7478',
                        borderRadius: '50%'
                    }}
                    onClick={() => editProject(_id)}
                >
                    <IconEdit size={20} />
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#6E7478' }}>Brand Name :</Typography>
                    <Typography>{brandName.length > 50 ? `${brandName.substring(0, 50)}...` : brandName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#6E7478' }}>Domain :</Typography>
                    <Typography>{domain.length > 50 ? `${domain.substring(0, 50)}...` : domain}</Typography>
                </Box>
                <Box sx={{ display: '', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#6E7478', mb: 2 }}>Description :</Typography>
                    <Typography sx={{ height: '100px' }}>
                        {shortDescription.length > 250 ? `${shortDescription.substring(0, 250)}...` : shortDescription}
                    </Typography>
                </Box>
            </Box>
            <BRButton
                sx={{ height: '40px', marginTop: '25px', width: '90%', marginLeft: '5%' }}
                variant="contained"
                // onClick={toggleProjectCreateModalCtrl()}
            >
                View Details
            </BRButton>
        </CardContent>
    </Card>
);
