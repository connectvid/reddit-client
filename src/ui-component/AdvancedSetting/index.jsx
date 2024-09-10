/* eslint-disable no-lone-blocks */
import { Box, Typography } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import MentionSettings from 'views/BizReply/Settings/MentionSettings';

export default function ({ modalClose }) {
    return (
        <Box
            sx={{
                top: 0,
                position: 'fixed',
                height: '100%',
                right: 0,
                background: '#fff !important',
                zIndex: 9990,
                width: '500px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '54px',
                    alignItems: 'center',
                    background: '#000',
                    px: 2.5
                }}
            >
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Mention Settinge</Typography>
                <Typography onClick={modalClose} sx={{ cursor: 'pointer' }}>
                    <FaTimes color="#757B89" size={14} />
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    px: 4,
                    pb: 3
                }}
            >
                <MentionSettings
                    formContentSx={{ width: '100%' }}
                    submitButtonSx={{ mt: 2, justifyContent: 'start' }}
                    wrapperSx={{}}
                    title=""
                />
            </Box>
        </Box>
    );
}

{
    /* <Dialog
open
onClose={modalClose}
sx={{
    '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm': {
        p: 0,
        m: 0,
        width: '600px'
    }
    // p: 0
}}
></Dialog> */
}
