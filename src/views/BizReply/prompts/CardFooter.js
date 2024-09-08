/* eslint-disable import/extensions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Card, CardContent, Dialog, Divider, Typography } from '@mui/material';
import { deletePromptAPI } from 'features/prompt/promptActions';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
// import { FaTrash } from 'react-icons/fa6';
import BRButton from 'ui-component/bizreply/BRButton';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import BRButton from 'ui-component/bizreply/BRButton';

const CardFooter = ({
    handleViewDetails,
    handleEdit //, handleDelete
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BRButton sx={{ height: '40px', width: '100%' }} variant="contained" onClick={handleViewDetails}>
                View Details
            </BRButton>
            <BRButton sx={{ height: '40px', width: '100%' }} variant="contained" onClick={handleEdit}>
                Edit
            </BRButton>
        </Box>
    );
};

export default CardFooter;
