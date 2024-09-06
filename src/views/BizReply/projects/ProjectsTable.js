/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { Box } from '@mui/system';
import { editProjectSelect, isEditProjectStatus, projectRemoving, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
// import BizReplyConfig from 'BizReplyConfig';

import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import { Grid } from '@mui/material';
import { subsctriptionCreditsSetter } from 'features/subscription/subscriptionActions';
import { useNavigate } from 'react-router-dom';
import ProjectCard from 'ui-component/Project/ProjectCard';

export default function ({
    // setProjects,
    projects = []
}) {
    const navigate = useNavigate();
    const { getAccessToken } = useAuth();

    const deleteProject = async (id) => {
        if (!confirm(`Are you sure to delete the Project?`)) return;
        const token = await getAccessToken();
        axios
            .delete(`projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(({ data: { deletedKeywords } }) => {
                toast('Project deleted successfully!', { autoClose: 2500, type: 'success' });
                projectRemoving(id)();
                subsctriptionCreditsSetter({ projects: 1, keywords: deletedKeywords })();
            })
            .catch(async (e) => {
                console.log(e);
                toast('Failed to delete the project. Please try again later.', { autoClose: 2500, type: 'warning' });
            });
    };

    const editProject = async (item) => {
        isEditProjectStatus(true)();
        editProjectSelect(item)();
        toggleProjectCreateModalCtrl()();
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {projects?.map?.((item) => (
                    <ProjectCard key={item._id} {...item} deleteProject={deleteProject} editProject={editProject} navigate={navigate} />
                ))}
            </Grid>
        </Box>
    );
}
