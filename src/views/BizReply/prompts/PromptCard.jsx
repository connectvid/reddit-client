/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Card, CardContent, Typography } from '@mui/material';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import BRButton from 'ui-component/bizreply/BRButton';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ({ name = '', prompt = '' }) {
    return (
        <Card sx={{ border: '1px solid rgba(0,0,0,0.8)', borderRadius: '12px' }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', mb: 2 }}>Prompt Name: {name}</Typography>
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontSize: '16px',
                                color: '#3A3D41',
                                lineHeight: '24px',
                                border: '1px solid #CCD3D9',
                                p: 2,
                                borderRadius: '10px',
                                height: '180px',
                                overflow: 'hidden'
                            }}
                        >
                            {prompt}
                        </Typography>
                    </Box>
                    {/* <Box>
                        <BRButton
                            variant="outlined"
                            sx={{ borderRadius: '6px', height: '38px', mt: 1.5 }}
                            childSx={{ borderRadius: '6px', px: 1.5 }}
                        >
                            <CopyToClipboard text={prompt} onCopy={() => toast.success(`Coppied!`)}>
                                <Typography component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <MdOutlineContentCopy color="#0C22E5" /> <Typography ml={0.5}>Copy prompt</Typography>
                                </Typography>
                            </CopyToClipboard>
                        </BRButton>
                    </Box> */}
                </Box>
            </CardContent>
        </Card>
    );
}
