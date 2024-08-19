/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-children-prop */
// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box, Dialog } from '@mui/material';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import { useSelector } from 'react-redux';
import { clearingError } from 'features/project/projectActions';
import React from 'react';
import { toast } from 'react-toastify';
import NewProject from 'views/BizReply/projects/NewProject';

const Header = () => {
    const {
        project: { error, showProjectCreateModal }
    } = useSelector((state) => state);
    React.useEffect(() => {
        if (error) {
            toast.warning(error);
            clearingError()();
        }
    }, [error]);

    return (
        <>
            <Box sx={{ marginRight: 1, flexGrow: 1, pl: 2 }} />
            <Box sx={{ marginRight: 1, flexGrow: 1, pl: 2 }} />
            <ProfileSection />
            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
            <Dialog open={showProjectCreateModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <NewProject />
            </Dialog>
        </>
    );
};

export default Header;
