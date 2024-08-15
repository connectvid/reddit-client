import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import BRProjectSelection from 'ui-component/bizreply/BRProjectSelection';

const Projects = () => {
    const { projects } = useSelector((state) => state.project);

    return (
        <>
            <BRProjectSelection {...{ toggleProjectCreateModalCtrl }} />
            <ProjectsTable {...{ projects }} />
        </>
    );
};

export default Projects;
