import { Box, Typography } from '@mui/material';
import { platformsSrc } from 'data';
import { changePlatform } from 'features/project/projectActions';
import { FaCheck, FaRegSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function ManageMentions({ selectedPlatform, loading, haveData }) {
    const {
        // project: { project },
        subscription: { subscription }
    } = useSelector((state) => state);
    return (
        <Box>
            <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '16px', mb: 3 }}>
                Select social profile (s) where you want to see posts from.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {subscription?.platforms?.map?.((platform) => (
                    <Typography
                        key={platform}
                        component="div"
                        sx={{
                            cursor: 'pointer',
                            p: 0,
                            maxWidth: '109px',
                            border: `1px solid ${selectedPlatform === platform ? '#0C22E5' : '#CCD3D9'}`,
                            minHeight: '75px',
                            textAlign: 'center',
                            borderRadius: '10px'
                            // display: 'flex',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            // ,position: 'relative'
                        }}
                        onClick={() => {
                            if (selectedPlatform !== platform && loading === false && haveData) changePlatform(platform)();
                        }}
                    >
                        <Typography sx={{ textAlign: 'right', m: '10px 10px 0 0 ' }}>
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
                                <FaRegSquare size={14} color="#667185" />
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
        </Box>
    );
}
