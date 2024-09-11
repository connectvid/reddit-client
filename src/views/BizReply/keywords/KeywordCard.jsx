/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Card, CardContent, Typography } from '@mui/material';
import { deleteKeywordAPI } from 'features/project/projectActions';
import { FiTrash2 } from 'react-icons/fi';
import { TbSquareAsterisk } from 'react-icons/tb';
import GradinentText from 'ui-component/GradinentText';

export default function ({ _id, title, accessToken, brandLogo = '', brandName, mentions }) {
    return (
        <Card sx={{ border: '1px solid rgba(0,0,0,0.8)', height: '197px', borderRadius: '12px' }}>
            <CardContent sx={{}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 700 }}>
                            {brandLogo ? (
                                <Typography
                                    component="span"
                                    sx={{
                                        // background: 'rgb(141, 149, 219)',
                                        height: '25px'
                                    }}
                                >
                                    <img src={brandLogo} alt={`${brandName} logo`} style={{ height: '25px', maxWidth: '100%' }} />
                                </Typography>
                            ) : (
                                brandName
                            )}
                        </Typography>
                        <Typography
                            sx={{ cursor: 'pointer' }}
                            onClick={async () => {
                                if (!confirm(`Are you sure to delete keyword with associated mentions?`)) return;
                                deleteKeywordAPI(accessToken, _id)();
                            }}
                        >
                            <FiTrash2 size={24} color="#6E7478" />
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            boxSizing: 'border-box',
                            padding: '1px',
                            backgroundImage: 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)',
                            borderRadius: '8px',
                            height: '48px'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                background: 'white',
                                px: '20px',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    color: 'rgba(0,0,0,1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <TbSquareAsterisk size={16.5} color="#000" /> Keyword
                            </Typography>

                            <GradinentText
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '16px'
                                }}
                            >
                                {title}
                            </GradinentText>
                        </Box>
                    </Box>
                    <Box sx={{ mt: '6px' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '16px', color: '#6E7478' }}>Mentions</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '6px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.8)' }}>
                                <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px' }}>Last month:</Typography>
                                <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px', ml: '2px' }}>
                                    {' '}
                                    {mentions?.lastMonth ?? 0}
                                </Typography>
                            </Box>{' '}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,1)' }}>
                                <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px' }}>Last 24h:</Typography>
                                <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,1)', fontSize: '16px', ml: '2px' }}>
                                    {mentions?.last24hrs ?? 0}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
