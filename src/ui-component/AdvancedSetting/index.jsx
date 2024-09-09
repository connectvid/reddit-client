import { Box, Dialog, Typography } from '@mui/material';
import { LiaTimesCircle } from 'react-icons/lia';
import MentionSettings from 'views/BizReply/Settings/MentionSettings';

export default function ({ modalClose }) {
    return (
        <Dialog
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
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '54px',
                    alignItems: 'center',
                    background: '#F1F1F1',
                    px: 2.5,
                    borderRadius: '12px 12px 0 0'
                }}
            >
                <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Mention Settinge</Typography>
                <Typography onClick={modalClose} sx={{ cursor: 'pointer' }}>
                    <LiaTimesCircle color="#000" size={24} />
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    px: 3,
                    pb: 3
                }}
            >
                <MentionSettings formContentSx={{ width: '100%' }} submitButtonSx={{ px: 2, mt: 0 }} wrapperSx={{}} title="" />
            </Box>
        </Dialog>
    );
}
