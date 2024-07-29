/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
import { IconBrandReddit, IconExternalLink } from 'tabler-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

const MentionCard = ({ item, singelArr }) => {
    const { getAccessToken } = useAuth();
    const { project } = useSelector((state) => state.project);
    const [reply, setReply] = useState('');
    const [generatingReply, setGeneratingReply] = useState(false);

    const handleGenerateReply = async () => {
        setGeneratingReply(true);
        const body = {
            title: item.title,
            snippet: item.snippet,
            projectName: project.brandName,
            projectDomain: project.domain,
            projectDescription: project.shortDescription
        };
        try {
            const token = await getAccessToken();
            const response = await axios.post(`/mentions/replyMention`, body, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReply(response.data.reply);
        } catch (e) {
            console.log(e);
        }
        setGeneratingReply(false);
    };
    const spil = item.title?.split?.(`: r/`);
    const last = spil ? spil[spil.length - 1] : '';
    return (
        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Box sx={{ lineHeight: 2 }}>
                    <Box sx={{ lineHeight: 2, display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{item.date}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{singelArr.keyword}</Typography>
                    </Box>
                    <Typography sx={{ color: '#000' }}>{item.snippet}</Typography>
                    {/* <Typography>{last}</Typography> */}
                    <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography
                            component="span"
                            sx={{
                                height: '18px',
                                width: '18px',
                                borderRadius: '50%',
                                bgcolor: '#ff4500',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <IconBrandReddit size={12} color="#fff" />
                        </Typography>
                        <a
                            href={item.link}
                            target="_blank"
                            style={{
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '1px solid #ddd',
                                padding: '5px 18px',
                                borderRadius: '4px',
                                gap: '4px'
                            }}
                        >
                            View <IconExternalLink />
                        </a>
                    </Typography>
                    <Button onClick={handleGenerateReply} variant="contained" sx={{ mt: 2 }}>
                        Generate Reply
                    </Button>
                    {reply && (
                        <div style={{ marginTop: '20px' }}>
                            Generate Reply:
                            <CopyToClipboard text={reply} onCopy={() => toast.success(`Coppied!`)}>
                                <TextField variant="outlined" multiline value={reply} sx={{ cursor: 'copy' }} fullWidth />
                            </CopyToClipboard>
                        </div>
                    )}
                    {generatingReply && <div style={{ marginTop: '20px' }}>Generating Reply....</div>}
                </Box>
            </CardContent>
        </Card>
    );
};

export default MentionCard;
