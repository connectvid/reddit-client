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
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import BRButton from 'ui-component/bizreply/BRButton';
import CardDetails from './CardDetails';
import CardFooter from './CardFooter';

export default function (props) {
    const { getAccessToken } = useAuth();
    const [expand, setExpand] = React.useState(false);
    const allowDescriptionLength = 394;
    const handleViewDetails = () => setExpand((p) => !p);
    const handleViewDetailsClose = () => setExpand(false);
    const { handleEditor, ...restProps } = props;
    const handleEdit = () => {
        handleEditor?.(restProps);
    };
    const handleDelete = async () => {
        if (!confirm(`Are you sure to delte the prompt!`)) return;
        try {
            const token = await getAccessToken();
            deletePromptAPI(token, restProps._id)();
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Dialog open={expand}>
                <Box sx={{ px: 4, py: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#000' }}>Details</Typography>
                        <Typography sx={{ cursor: 'pointer' }} onClick={handleViewDetailsClose}>
                            <FaRegTimesCircle size={18} />
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <CardDetails {...restProps} {...{ expand }} />
                </Box>
            </Dialog>
            <Card sx={{ borderRadius: '12px' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <CardDetails {...restProps} {...{ allowDescriptionLength, setExpand }} />
                        <CardFooter {...{ handleViewDetails, handleEdit, handleDelete }} />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}
