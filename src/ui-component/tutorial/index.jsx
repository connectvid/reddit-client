/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable prettier/prettier */
// material-ui
import { Box } from '@mui/system';
import { useState } from 'react';
import VideoModal from './VideoModal';

const Tutorial = ({
    initImageWrrap = {
        sx: { px: { sm: '0em', md: '5em' } }
    }
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <Box sx={{ minHeight: '100%', height: '100%', position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    ...initImageWrrap.sx
                }}
            >
                <img
                    // width="100%"
                    // height="100%"
                    src="video_bg.png"
                    alt="preview"
                    style={{
                        borderRadius: '10px',
                        maxWidth: '100%',
                        height: '100%'
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        width: '50px',
                        opacity: '.5',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        overflow: 'hidden'
                    }}
                    onClick={() => {
                        console.log('🧪 check\n', isModalOpen);
                        setIsModalOpen(true);
                    }}
                >
                    <img
                        width="100%"
                        src="https://cdn.discordapp.com/attachments/998224228216217661/998224268489936896/unknown.png"
                        alt=""
                    />
                </Box>
            </Box>
            {/* <Typography variant="h2" sx={{ textAlign: 'center', my: 2, color: 'gray' }}>
                Watch Demo..
            </Typography> */}
            <VideoModal {...{ isModalOpen, setIsModalOpen }} />
        </Box>
    );
};

export default Tutorial;
