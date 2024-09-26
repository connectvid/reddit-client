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
// import { useNavigate } from 'react-router-dom';
// import useAuth from 'hooks/useAuth';
import UpgradeScreen from './showUpgradeScreen/UpgradeScreen';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css';

const Report = () => {
    const {
        project: { projects = [], project },
        report: { reports = [] }
    } = useSelector((s) => s);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // const navigate = useNavigate();
    // const { dbUser } = useAuth();
    const { subscription } = useSelector((state) => state.subscription);

    const remainingCredit = subscription?.remainingCredit;

    if (!subscription.credit?.reports) {
        return <UpgradeScreen />;
    }

    return (
        <>
            <ReportBreadcrumb remainingCredit={remainingCredit} setShowCreateModal={setShowCreateModal} />
            <Card>
                <Box sx={{ minHeight: '100%' }}>
                    <NewReport {...{ projects, project, showCreateModal, setShowCreateModal }} />
                </Box>
            </Card>
            <ViewReports reports={reports} />
        </>
    );
};

export default Report;
