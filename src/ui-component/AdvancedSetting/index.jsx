/* eslint-disable no-lone-blocks */
import { Box, Typography } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import MentionSettingsForAdvancedSetting from 'views/BizReply/Settings/MentionSettingsForAdvancedSetting';

export default function ({ modalClose, projectName }) {
    return (
        <Box
            sx={{
                top: 0,
                position: 'fixed',
                height: '100%',
                right: 0,
                background: '#fff !important',
                zIndex: 9990,
                // width: '100%',
                width: '510px',
                overflowY: 'scroll'
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
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                    Advanced Settings {projectName ? `(${projectName})` : ''}
                </Typography>
                <Typography onClick={modalClose} sx={{ cursor: 'pointer' }}>
                    <FaTimes color="#757B89" size={14} />
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    px: 4
                    // pb: 3
                }}
            >
                <MentionSettingsForAdvancedSetting
                    formContentSx={{ width: '100%' }}
                    submitButtonSx={{ mt: 2, justifyContent: 'start' }}
                    wrapperSx={{}}
                    platformCardSx={{ minWidth: '100px', maxWidth: '100px', minHeight: '65px' }}
                    switchSx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
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
