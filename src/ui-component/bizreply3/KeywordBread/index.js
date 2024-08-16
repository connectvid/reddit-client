/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply3/BRButton';
import BRBradcrumb from '../../Breadcrumb';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import AllProjects from './AllProjects';

const BRProjectSelection = () => {
    return (
        <BRBradcrumb title="Projects">
            <AllProjects />
            <BRButton sx={{ height: '40px', width: '180px' }} variant="contained" onClick={toggleProjectCreateModalCtrl()}>
                Add Project
            </BRButton>
        </BRBradcrumb>
    );
};

export default BRProjectSelection;
