/* eslint-disable no-lone-blocks */
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import InstantFetch from 'views/BizReply/Settings/InstantFetch';
import MentionSettingsForAdvancedSetting from 'views/BizReply/Settings/MentionSettingsForAdvancedSetting';

const selectedStyle = {
    color: '#fff',
    fontWeight: 700,
    background: 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)'
};

export default function ({ modalClose, projectName }) {
    const [setting, setSetting] = React.useState('general');
    const handleSetting = (v) => setSetting(v);
    let Tab = <></>;
    if (setting === 'general') {
        Tab = (
            <MentionSettingsForAdvancedSetting
                formContentSx={{ width: '100%' }}
                submitButtonSx={{ mt: 2, justifyContent: 'start' }}
                wrapperSx={{}}
                platformCardSx={{ minWidth: '100px', maxWidth: '100px', minHeight: '65px' }}
                switchSx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                title=""
            />
        );
    } else {
        Tab = <InstantFetch />;
    }
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
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    {[
                        { name: 'general', title: 'General settings' },
                        { name: 'instant_fetch', title: 'Instant Fetch' }
                    ].map(({ title, name }) => (
                        <Button
                            key={name}
                            sx={{
                                width: '100%',
                                border: 'none',
                                borderRadius: '25px',
                                ':hover': {
                                    // background: 'transparent'
                                },
                                ...(setting === name ? selectedStyle : {})
                            }}
                            onClick={() => handleSetting(name)}
                        >
                            {title}
                        </Button>
                    ))}
                </Box>

                {Tab}
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
