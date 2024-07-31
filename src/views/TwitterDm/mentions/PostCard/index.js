/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';

import GeneretedReply from './GeneretedReply';
import PostCardFooter from './PostCardFooter';

const PostCard = ({ project, date, title, keyword, snippet, link, projectId, _id, reply = '', setMentionsData }) => {
    const { getAccessToken } = useAuth();
    const [editReply, setEditReply] = useState(reply);
    const [generatingReply, setGeneratingReply] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [updatingReply, setUpdatingReply] = useState(false);

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
    const handleUpdateReply = async (isDelete = false) => {
        setUpdatingReply(true);
        const editVal = isDelete ? '' : editReply;
        try {
            const upData = { reply: editVal };
            const token = await getAccessToken();
            await axios.put(`/mentions/${_id}/update-reply`, upData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditReply(editVal);
            setMentionsData((p) =>
                p.map((item) => {
                    if (item._id === _id) {
                        item.reply = editVal;
                    }
                    return item;
                })
            );
        } catch (e) {
            console.log(e);
        }
        setUpdatingReply(false);
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
                        <GeneretedReply
                            {...{
                                editReply,
                                setEditReply,
                                reply,
                                updatingReply,
                                handleUpdateReply,
                                editOpen,
                                setEditOpen,
                                setUpdatingReply,
                                link
                            }}
                        />
                    )}
                    {generatingReply && <div style={{ marginTop: '20px' }}>Generating Reply....</div>}
                    <PostCardFooter {...{ generatingReply, handleGenerateReply, link }} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard;
