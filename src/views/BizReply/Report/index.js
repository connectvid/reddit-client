/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Card } from '@mui/material';
import { Box } from '@mui/system';

import useAuth from 'hooks/useAuth';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReportBreadcrumb from 'ui-component/ReportBreadcrumb';

const Report = () => {
    const navigate = useNavigate();
    const { dbUser } = useAuth();
    const { subscription } = useSelector((state) => state.subscription);

    const remainingCredit = subscription?.remainingCredit;

    const handleClick = () => {
        navigate('/subscription');
    };

    return (
        <>
            <ReportBreadcrumb />
            <Card>
                <Box sx={{ minHeight: '100%' }}>{/*  */}</Box>
            </Card>
        </>
    );
};

export default Report;
