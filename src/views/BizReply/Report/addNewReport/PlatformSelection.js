/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Typography } from '@mui/material';
import { FaCheck } from 'react-icons/fa6';
import SocialIcons from 'views/BizReply/SocialIcons';

const PlatformSelection = ({ options, selectedPlatforms, handlePlatformSelection }) => {
    // const options = [
    //     'reddit.com',
    //     'linkedin.com',
    //     'twitter.com',
    //     'quora.com',
    //     'tiktok.com',
    //     'facebook.com',
    //     'instagram.com',
    //     'pinterest.com'
    // ];
    return (
        <Box sx={{}}>
            <Typography
                variant="subtitle2"
                sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
            >
                Social media
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                {options.map((platform) => {
                    return (
                        <Typography
                            key={platform}
                            component="div"
                            sx={{
                                cursor: 'pointer',
                                p: 0,
                                width: '70px',
                                border: `1px solid ${selectedPlatforms?.includes(platform) ? '#0C22E5' : '#CCD3D9'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                position: 'relative',
                                height: '64px'
                            }}
                            onClick={() => {
                                handlePlatformSelection?.(platform);
                            }}
                        >
                            <Typography sx={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                                {selectedPlatforms?.includes(platform) ? (
                                    <Typography
                                        component="span"
                                        sx={{
                                            height: '14px',
                                            width: '14px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)'
                                        }}
                                    >
                                        <FaCheck size={10} color="#fff" />
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{
                                            border: '1px solid #667185',
                                            background: '#fff',
                                            height: '14px',
                                            width: '14px',
                                            baorderRadius: '3px'
                                        }}
                                    />
                                )}
                            </Typography>
                            <SocialIcons platform={platform} />
                        </Typography>
                    );
                })}
            </Box>
        </Box>
    );
};

export default PlatformSelection;
