import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import ProjectBreadcrumb from 'ui-component/Project/ProjectBreadcrumb';

const Projects = () => {
    const { projects } = useSelector((state) => state.project);

    return (
        <>
            <ProjectBreadcrumb />
            <ProjectsTable {...{ projects }} />
        </>
    );
};

export default Projects;
