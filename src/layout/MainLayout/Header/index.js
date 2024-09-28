/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-children-prop */
// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box, Modal } from '@mui/material';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import { useSelector } from 'react-redux';
import { clearingError, updateMentionFetchStatusChangerOfProject } from 'features/project/projectActions';
import React from 'react';
import { toast } from 'react-toastify';
import NewProject from 'views/BizReply/projects/NewProject';
import socket from 'socket';
import useAuth from 'hooks/useAuth';
import { updateSucceedReport } from 'features/report/reportActions';

const Header = () => {
    const {
        project: { error, showProjectCreateModal, project }
    } = useSelector((state) => state);
    const { dbUser, user } = useAuth();
    React.useEffect(() => {
        if (error) {
            toast.warning(error);
            clearingError()();
        }
    }, [error]);

    React.useEffect(() => {
        socket.connect();

        if (project?._id) {
            const projectMentionStatus = `mentionsStatus:${project?._id}`;
            console.log(`Socket is connected mentionsStatus`, projectMentionStatus);
            socket.on(projectMentionStatus, ({ message: { mentionsStatus } }) => {
                // "succeed"
                updateMentionFetchStatusChangerOfProject({ _id: project._id, mentionsStatus })();
                console.log({ mentionsStatus });
            });
        }
    }, [project?._id]);

    const userId = dbUser?._id || user?.id;
    // console.log({ userId });
    React.useEffect(() => {
        socket.connect();
        if (userId) {
            const reportStatus = `report:${userId}`;
            // console.log(`Socket is connected pdf status---------------------`, reportStatus);
            socket.on(
                reportStatus,
                ({
                    message: {
                        userId,
                        reportId,
                        item: { pdfUrl, pageCount }
                    }
                }) => {
                    // console.log('==========Alhamdu lillah');
                    updateSucceedReport({ _id: reportId, userId, pageCount, pdfUrl })();
                }
            );
        }
    }, [userId]);

    return (
        <>
            <Box sx={{ marginRight: 1, flexGrow: 1, pl: 2 }} />
            <Box sx={{ marginRight: 1, flexGrow: 1, pl: 2 }} />
            <ProfileSection />
            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>

            <Modal
                open={showProjectCreateModal}
                sx={{ '.MuiBox-root:nth-child(3)': { minWidth: { md: '600px', sx: 'unset', sm: '500px' } } }}
            >
                <NewProject />
            </Modal>
        </>
    );
};

export default Header;
