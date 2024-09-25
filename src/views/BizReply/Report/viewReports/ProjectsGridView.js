import ProjectCard from './ProjectCard';
import { Grid } from '@mui/material';

const ProjectsGridView = ({ projects }) => {
    return (
        // <Grid container spacing={2} style={{}}>
        //     {projects.map((project) => (
        //         <Grid key={project._id} item xs={12} sm={6} md={4} lg={4}>
        //             <ProjectCard {...{ project }} />
        //         </Grid>
        //     ))}
        //     <Grid />
        // </Grid>
        <Grid container spacing={2} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {projects.map((project) => (
                <Grid key={project._id} item xs={12} sm={6} md={4} lg={4} style={{ display: 'flex' }}>
                    <ProjectCard {...{ project }} style={{ flex: 1 }} />
                </Grid>
            ))}
            <Grid />
        </Grid>
    );
};

export default ProjectsGridView;
