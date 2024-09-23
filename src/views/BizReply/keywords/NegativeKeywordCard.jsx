/* eslint-disable no-useless-return */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Card, CardContent, Typography } from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';
import { TbSquareAsterisk } from 'react-icons/tb';
import GradinentText from 'ui-component/GradinentText';
import { deleteNegativeKeywordAPI } from 'features/project/projectActions';

export default function ({
    keyword, //brandLogo = '', brandName
    accessToken,
    projectId
}) {
    return (
        <Card sx={{ border: '1px solid rgba(0,0,0,0.8)', borderRadius: '12px' }}>
            <CardContent sx={{}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        {/* <Typography sx={{ fontWeight: 700 }}>
                            {brandLogo ? <img src={brandLogo} alt={`${brandName} logo`} style={{ height: '25px' }} /> : brandName}
                        </Typography> */}
                        <Typography
                            sx={{ cursor: 'pointer' }}
                            onClick={async () => {
                                if (!confirm(`Are you sure to delete the negative keyword?`)) return;
                                // console.log({ token: accessToken, keyword, _id: projectId });
                                deleteNegativeKeywordAPI({ token: accessToken, keyword, id: projectId })();
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
                            height: '48px',
                            mb: 1.5
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
                                {keyword}
                            </GradinentText>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
