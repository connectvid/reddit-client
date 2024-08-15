/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply2/BRButton';
import Breadcrumb from '../../Breadcrumb';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import AllProjects from '../AllProjects';

const ProjectBreadcrumb = () => {
    return (
        <Breadcrumb title="Projects">
            <AllProjects />
            <BRButton sx={{ height: '40px', width: '180px' }} variant="contained" onClick={toggleProjectCreateModalCtrl()}>
                Add Project
            </BRButton>
        </Breadcrumb>
    );
};

export default ProjectBreadcrumb;
