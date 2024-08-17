import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import ProjectBreadcrumb from 'ui-component/Project/ProjectBreadcrumb';
import EmptyProject from './EmptyProject';

const Projects = () => {
    const { projects } = useSelector((state) => state.project);

    return (
        <>
            <ProjectBreadcrumb />
            {projects?.length ? `` : <EmptyProject />}
            <ProjectsTable {...{ projects }} />
        </>
    );
};

export default Projects;
