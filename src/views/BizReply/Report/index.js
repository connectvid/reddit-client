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
// import { useSelector } from 'react-redux';
import ReportBreadcrumb from 'ui-component/ReportBreadcrumb';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css';

const Report = () => {
    // const navigate = useNavigate();
    // const { dbUser } = useAuth();
    // const { subscription } = useSelector((state) => state.subscription);

    // const remainingCredit = subscription?.remainingCredit;

    // const handleClick = () => {
    //     navigate('/subscription');
    // };
    // const selectionRange = {
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     key: 'selection'
    // };
    // const handleSelect = (ranges) => {
    //     console.log(ranges);
    //     // {
    //     //   selection: {
    //     //     startDate: [native Date Object],
    //     //     endDate: [native Date Object],
    //     //   }
    //     // }
    // };
    return (
        <>
            <ReportBreadcrumb />
            <Card>
                <Box sx={{ minHeight: '100%' }}>{/* <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} /> */}</Box>
            </Card>
        </>
    );
};

export default Report;
