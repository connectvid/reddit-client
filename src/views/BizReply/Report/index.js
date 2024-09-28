/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Card } from '@mui/material';
import { Box } from '@mui/system';

// import useAuth from 'hooks/useAuth';
// // import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReportBreadcrumb from 'ui-component/Report/ReportBreadcrumb';
import ViewReports from './viewReports/ViewReports';
import NewReport from './addNewReport/NewReport';
import { useState } from 'react';
import UpgradeScreen from './showUpgradeScreen/UpgradeScreen';

const Report = () => {
    const {
        project: { projects = [], project },
        report: { reports = [], loading, PDFReportStatusChange },
        subscription: { subscription }
    } = useSelector((s) => s);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const openModalHandler = () => setShowCreateModal(true);

    const remainingCredit = subscription?.remainingCredit;

    if (!subscription?.credit?.reports) {
        return <UpgradeScreen />;
    }

    return (
        <>
            <ReportBreadcrumb remainingCredit={remainingCredit} handleModal={openModalHandler} />
            <Card>
                <Box sx={{ minHeight: '100%' }}>
                    <NewReport {...{ projects, project, showCreateModal, setShowCreateModal }} />
                </Box>
            </Card>
            <ViewReports reports={reports} handleModal={openModalHandler} loading={loading} PDFReportStatusChange={PDFReportStatusChange} />
        </>
    );
};

export default Report;
