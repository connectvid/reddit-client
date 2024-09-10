import { Box, Typography } from '@mui/material';
import { platformsSrc } from 'data';
import { FaCheck, FaRegSquare } from 'react-icons/fa6';

export default function ({ platforms = [], selectedPlatforms = [], handleSelectedPlatform, sx = {} }) {
    return (
        <Box sx={{ ...sx }}>
            <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '16px', mb: 3 }}>
                Select social profile (s) where you want to see posts from.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                {platforms?.map?.((platform) => (
                    <Typography
                        key={platform}
                        component="div"
                        sx={{
                            cursor: 'pointer',
                            p: 0,
                            minWidth: '154px',
                            maxWidth: '154px',
                            border: `1px solid ${selectedPlatforms.includes(platform) ? '#0C22E5' : '#CCD3D9'}`,
                            minHeight: '75px',
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            position: 'relative'
                        }}
                        onClick={() => handleSelectedPlatform?.(platform)}
                    >
                        <Typography sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                            {selectedPlatforms.includes(platform) ? (
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
                                <FaRegSquare size={14} color="#667185" />
                            )}
                        </Typography>
                        <img
                            src={platformsSrc[platform]}
                            alt={platform}
                            style={{
                                width: '65%',
                                marginTop: '10px'
                            }}
                        />
                    </Typography>
                )) || ''}
            </Box>
        </Box>
    );
}
