import { Card, CardContent, Box, Typography } from '@mui/material';
import { changePlatform } from 'features/project/projectActions';
import { FaRegSquare } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { platformsSrc } from 'data';

const PlatformSelection = ({ platforms = [], selectedPlatform, loading, haveData, initFirstPage }) => {
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '16px', mb: 3 }}>
                    Select the social media you want to see relevant posts below 👇🏽{' '}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {platforms?.map?.((platform) => (
                        <Typography
                            key={platform}
                            component="div"
                            sx={{
                                cursor: 'pointer',
                                p: 0,
                                width: '122px',
                                border: `1px solid ${selectedPlatform === platform ? '#0C22E5' : '#CCD3D9'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                position: 'relative',
                                height: '64px'
                            }}
                            onClick={() => {
                                if (selectedPlatform !== platform && loading === false && haveData) {
                                    changePlatform(platform)();
                                    initFirstPage?.();
                                }
                            }}
                        >
                            <Typography sx={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                                {selectedPlatform === platform ? (
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
                                            borderRadius: '3px'
                                        }}
                                    />
                                    // <FaRegSquare size={14} color="#667185" style={{ background: '#fff', borderRadius: '3px' }} />
                                )}
                            </Typography>
                            <img
                                src={platformsSrc[platform]}
                                alt={platform}
                                style={{
                                    width: '65%'
                                }}
                            />
                        </Typography>
                    )) || ''}
                </Box>
            </CardContent>
        </Card>
    );
};
export default PlatformSelection;
