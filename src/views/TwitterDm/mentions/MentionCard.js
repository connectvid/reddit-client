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
import axios from 'utils/axios';
import { IconBrandReddit, IconCopy, IconExternalLink, IconTrash } from 'tabler-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

const MentionCard = ({ project, date, title, keyword, snippet, link, projectId, _id, reply = '', setMentionsData }) => {
    const { getAccessToken } = useAuth();
    const [editReply, setEditReply] = useState(reply);
    const [generatingReply, setGeneratingReply] = useState(false);

    const handleGenerateReply = async () => {
        setGeneratingReply(true);
        const body = {
            title,
            snippet,
            projectId,
            projectName: project.brandName,
            projectDomain: project.domain,
            projectDescription: project.shortDescription
        };
        try {
            const token = await getAccessToken();
            const response = await axios.post(`/mentions/${_id}/generate-reply`, body, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseReply = response.data.reply;
            setEditReply(responseReply);
            setMentionsData((p) =>
                p.map((item) => {
                    if (item._id === _id) {
                        item.reply = responseReply;
                    }
                    return item;
                })
            );
        } catch (e) {
            console.log(e);
        }
        setGeneratingReply(false);
    };
    // const spil = item.title?.split?.(`: r/`);
    // const last = spil ? spil[spil.length - 1] : '';
    return (
        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Box sx={{ lineHeight: 2 }}>
                    <Box sx={{ lineHeight: 2, display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{date}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{keyword}</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ mb: 1, fontSize: '20px' }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: '#000', fontSize: '16px' }}>{snippet}</Typography>
                    {reply && (
                        <Box style={{ marginTop: '20px' }}>
                            Generated Reply:
                            <Box sx={{ border: '', borderRadius: 4, position: 'relative' }}>
                                {/* <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '-33px',
                                        right: '4px',
                                        cursor: 'copy',
                                        border: '1px solid #ddd',
                                        p: '3px 5px 0',
                                        borderRadius: '6px'
                                    }}
                                >
                                    <CopyToClipboard text={reply} onCopy={() => toast.success(`Coppied!`)}>
                                        <IconCopy size={18} />
                                    </CopyToClipboard>
                                </Typography> */}
                                {/* <Typography
                                    sx={{
                                        color: '#000',
                                        fontSize: '16px'
                                    }}
                                >
                                    {editReply}
                                </Typography> */}
                                <TextField multiline fullWidth value={editReply || ''} onChange={(e) => setEditReply(e.target.value)} />
                                <Box
                                    display={{ sm: 'flex' }}
                                    sx={{ mt: 0, justifyContent: 'end', bottom: '-36px', position: 'absolute', right: '15px', gap: 3 }}
                                >
                                    <Button
                                        variant="outlined"
                                        sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', borderColor: '#ddd' }}
                                    >
                                        <CopyToClipboard text={reply} onCopy={() => toast.success(`Coppied!`)}>
                                            <Typography component="span" display="flex">
                                                <IconCopy size={18} /> Copy
                                            </Typography>
                                        </CopyToClipboard>
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', borderColor: '#ddd' }}
                                    >
                                        <IconTrash /> Reply
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', borderColor: '#ddd' }}
                                    >
                                        <IconTrash /> Reply
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', borderColor: '#ddd' }}
                                    >
                                        <IconTrash /> Reply
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                    {generatingReply && <div style={{ marginTop: '20px' }}>Generating Reply....</div>}
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button onClick={handleGenerateReply} variant="contained">
                            Generate Reply
                        </Button>
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
                            href={link}
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
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MentionCard;
