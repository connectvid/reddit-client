import { Box, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';

import GeneretedReply from './GeneretedReply';
import PostCardFooter from './PostCardFooter';
import { useLocation } from 'react-router-dom';
import { REPLY_PATH } from 'config';
import removeLastSentenceIfEllipsis from 'utils/removeLastSentenceIfEllipsis';
import replaceDomainWithLink from 'utils/replaceDomainWithLink';
import { subsctriptionCreditsSetter } from 'features/subscription/subscriptionActions';
import { toast } from 'react-toastify';

const PostCard = ({
    project,
    platform,
    date,
    title,
    keyword,
    snippet,
    link,
    projectId,
    _id,
    reply = '',
    markReply,
    // setMentionsData,
    setObjItems,
    selectedPlatform,
    showMarkRepliedBtn,
    repliesCredits
}) => {
    const { getAccessToken } = useAuth();
    const filteredReply = reply ? replaceDomainWithLink(reply.replace(/[*#]/g, '')) : reply;
    const [editReply, setEditReply] = useState(filteredReply);
    const [generatingReply, setGeneratingReply] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [updatingReply, setUpdatingReply] = useState(false);
    const { pathname } = useLocation();
    const handleGenerateReply = async () => {
        if (repliesCredits !== 'Unlimited' && repliesCredits < 1) {
            toast.error(`Reply limit is over!`);
            return;
        }
        setGeneratingReply(true);
        const body = {
            title,
            snippet,
            projectId,
            projectName: project.brandName,
            projectDomain: project.domain,
            projectDescription: project.shortDescription,
            platform
        };
        try {
            const token = await getAccessToken();
            const response = await axios.post(`/mentions/${_id}/generate-reply`, body, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseReply = response.data.reply;
            setEditReply(responseReply);

            setObjItems((p) => {
                if (selectedPlatform) {
                    const changed =
                        p[selectedPlatform]?.map?.((item) => {
                            if (item._id === _id) {
                                item.reply = responseReply;
                            }
                            return item;
                        }) || [];
                    return { ...p, [selectedPlatform]: changed };
                }
                const changed =
                    p?.map?.((item) => {
                        if (item._id === _id) {
                            item.reply = responseReply;
                        }
                        return item;
                    }) || [];
                return changed;
            });
            subsctriptionCreditsSetter({ replies: -1 })();
        } catch (e) {
            console.log(e);
        }
        setGeneratingReply(false);
    };
    const handleUpdateReply = async ({ update_on = 'reply', isDelete = false, markReply }) => {
        setUpdatingReply(true);
        const editVal = isDelete ? '' : editReply;
        const upData = { update_on };
        if (update_on === 'reply') {
            upData.reply = editVal;
        } else if (update_on === 'markReply') {
            upData.markReply = markReply;
        }

        try {
            const token = await getAccessToken();
            await axios.put(`/mentions/${_id}/update-reply`, upData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (update_on === 'reply') {
                setEditReply(editVal);
            }
            if (pathname === REPLY_PATH) {
                setObjItems((p) => {
                    const changed =
                        p?.map?.((item) => {
                            if (item._id === _id) {
                                if (update_on === 'reply') {
                                    upData.reply = editVal;
                                } else if (update_on === 'markReply') item.markReply = markReply;
                            }
                            return item;
                        }) || [];
                    return changed;
                });
            } else {
                setObjItems((p) => {
                    const changed =
                        p[selectedPlatform]?.map?.((item) => {
                            if (item._id === _id) {
                                if (update_on === 'reply') {
                                    upData.reply = editVal;
                                } else if (update_on === 'markReply') item.markReply = markReply;
                            }
                            return item;
                        }) || [];
                    return { ...p, [selectedPlatform]: changed };
                });
            }
        } catch (e) {
            console.log(e);
        }
        setUpdatingReply(false);
    };

    return (
        <Card sx={{ mb: 4 }} id={_id}>
            <CardContent>
                <Box sx={{ lineHeight: 2 }}>
                    <Box sx={{ lineHeight: 2, display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{date}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{keyword}</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ mb: 1, fontSize: '20px', fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }} title={snippet}>
                        {removeLastSentenceIfEllipsis(snippet)}
                    </Typography>
                    {reply && (
                        <GeneretedReply
                            {...{
                                editReply,
                                setEditReply,
                                reply: filteredReply,
                                updatingReply,
                                handleUpdateReply,
                                editOpen,
                                setEditOpen,
                                setUpdatingReply,
                                link,
                                showMarkRepliedBtn,
                                markReply
                            }}
                        />
                    )}
                    {generatingReply && <div style={{ marginTop: '20px' }}>Generating Reply....</div>}
                    <PostCardFooter {...{ generatingReply, handleGenerateReply, link, platform, repliesCredits }} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard;
