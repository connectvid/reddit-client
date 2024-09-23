/* eslint-disable import/extensions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Typography } from '@mui/material';
import {
    IconPencil,
    IconEye //, IconTrash
} from '@tabler/icons';
// import { FaTrash } from 'react-icons/fa6';
import BRButton from 'ui-component/bizreply/BRButton';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import BRButton from 'ui-component/bizreply/BRButton';

const CardFooter = ({
    handleViewDetails,
    handleEdit, // handleDelete,
    hideEdit = false
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {hideEdit ? (
                <>
                    <Typography sx={{ width: '100%' }} />
                    <Typography sx={{ width: '100%' }} />
                </>
            ) : (
                <>
                    <BRButton
                        sx={{
                            height: '40px',
                            width: '100%',
                            textAlign: 'center'
                        }}
                        grandChildSx={{ textAlign: 'center', margin: '0 auto 0' }}
                        variant="outlined"
                        onClick={handleEdit}
                    >
                        <IconPencil style={{ marginRight: '2px', color: '#2a98d5', marginTop: '-3px' }} size={18} /> Edit Prompt
                    </BRButton>
                    {/* <Typography
                        onClick={handleDelete}
                        sx={{
                            border: '1px solid #0c22e5',
                            height: '40px',
                            width: '95px',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <IconTrash style={{ color: '#e1002d' }} size={20} />
                    </Typography> */}
                    {/* <BRButton
                        sx={{
                            height: '40px',
                            width: '20px',
                            // width: '100%',
                            // width: '15px',
                            textAlign: 'center'
                        }}
                        grandChildSx={{ textAlign: 'center', margin: '0 auto', px: '0 !important', width: '20px' }}
                        childSx={{ px: '0 !important' }}
                        variant="outlined"
                        onClick={handleDelete}
                    >
                        <IconTrash style={{ color: '#e1002d', marginTop: '-3px' }} size={20} />
                    </BRButton> */}
                </>
            )}
            <BRButton sx={{ height: '40px', width: '100%' }} variant="contained" onClick={handleViewDetails}>
                <IconEye style={{ marginRight: '5px' }} size={20} /> View Details
            </BRButton>
        </Box>
    );
};

export default CardFooter;
