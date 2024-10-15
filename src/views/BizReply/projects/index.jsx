import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import ProjectBreadcrumb from 'ui-component/Project/ProjectBreadcrumb';
import EmptyProject from './EmptyProject';

const Projects = () => {
    const {
        project: { projects, loading },
        subscription: { subscription = {} }
    } = useSelector((state) => state);

    return (
        <>
            <ProjectBreadcrumb {...{ remainingProject: subscription?.remainingCredit?.projects }} />
            {!projects?.length && !loading ? <EmptyProject /> : ``}
            <ProjectsTable {...{ projects }} />
        </>
    );
};

export default Projects;
