import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { clearingError, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import NewProject from 'views/BizReply/projects/NewProject';
import React from 'react';
import { toast } from 'react-toastify';

export default function () {
    const {
        project: { error, showProjectCreateModal }
    } = useSelector((state) => state);

    React.useEffect(() => {
        toggleProjectCreateModalCtrl()();
    }, []);
    React.useEffect(() => {
        if (error) {
            toast.warning(error);
            clearingError()();
        }
    }, [error]);
    return <></>;
    // return (
    //     <Modal open={showProjectCreateModal}>
    //         <NewProject />
    //     </Modal>
    // );
}
