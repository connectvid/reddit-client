/* eslint-disable import/extensions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Typography } from '@mui/material';
import { IconPencil, IconEye, IconTrash } from '@tabler/icons';
// import { FaTrash } from 'react-icons/fa6';
import BRButton from 'ui-component/bizreply/BRButton';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import BRButton from 'ui-component/bizreply/BRButton';

const CardFooter = ({ handleViewDetails, handleEdit, handleDelete, hideEdit = false }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                        <IconPencil style={{ marginRight: '5px', color: '#2a98d5', marginTop: '-3px' }} size={20} /> Edit Prompt
                    </BRButton>
                    <BRButton
                        sx={{
                            height: '40px',
                            width: '100%',
                            textAlign: 'center'
                        }}
                        grandChildSx={{ textAlign: 'center', margin: '0 auto 0' }}
                        variant="outlined"
                        onClick={handleDelete}
                    >
                        <IconTrash style={{ marginRight: '5px', color: '#e1002d', marginTop: '-3px' }} size={20} />
                    </BRButton>
                </>
            )}
            <BRButton sx={{ height: '40px', width: '100%' }} variant="contained" onClick={handleViewDetails}>
                <IconEye style={{ marginRight: '5px' }} size={20} /> View Details
            </BRButton>
        </Box>
    );
};

export default CardFooter;
