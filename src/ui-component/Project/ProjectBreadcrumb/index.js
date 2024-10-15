/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply/BRButton';
import Breadcrumb from '../../Breadcrumb';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
// import AllProjects from '../AllProjects';

export default function ({ remainingProject }) {
    return (
        <Breadcrumb title="Projects">
            <Typography
                sx={{
                    border: '1px solid #CCD3D9',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#6E7478',
                    p: '8.335px 25px',
                    boxShadow: '0 1px 2px 0 #DEE3E8',
                    borderRadius: '10px'
                }}
            >
                All Projects
            </Typography>
            {/* <AllProjects {...{ projectListWidth: '210px' }} /> */}
            <BRButton
                sx={{ height: '40px', width: '180px' }}
                variant="contained"
                onClick={() => {
                    if (!remainingProject || remainingProject < 1) {
                        console.log({ remainingProject });
                        toast.warn(`Project limit is over!`);
                        return;
                    }
                    toggleProjectCreateModalCtrl()();
                }}
            >
                Add Project
            </BRButton>
        </Breadcrumb>
    );
}
