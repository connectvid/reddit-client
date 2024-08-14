import { Button, Card, CardContent, Typography } from '@mui/material';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import BRButton from 'ui-component/bizreply/BRButton';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
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
