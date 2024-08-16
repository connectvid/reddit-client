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
import errorMsgHelper from 'utils/errorMsgHelper';
import { IconBrandReddit } from '@tabler/icons';
import { LinkedIn, Twitter } from '@mui/icons-material';
import IconQuora from 'ui-component/icons/IconQuora';

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
    repliesCredits,
    brandLogo,
    markReplyPosition = 'reply-section' // generate-reply-top
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
            toast.success(`Reply has been generated!`);
        } catch (e) {
            console.log(e);
            toast.error(errorMsgHelper(e));
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
            if (isDelete) {
                setEditReply('');
            } else if (update_on === 'reply') {
                setEditReply(editVal);
            }
            if (pathname === REPLY_PATH) {
                setObjItems((p) => {
                    const changed =
                        p?.map?.((item) => {
                            if (item._id === _id) {
                                if (isDelete) {
                                    upData.reply = '';
                                } else if (update_on === 'reply') {
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
                                if (isDelete) {
                                    upData.reply = '';
                                } else if (update_on === 'reply') {
                                    upData.reply = editVal;
                                } else if (update_on === 'markReply') item.markReply = markReply;
                            }
                            return item;
                        }) || [];
                    return { ...p, [selectedPlatform]: changed };
                });
            }
            let successMsg = '';
            if (update_on === 'markReply') {
                successMsg = `Reply has been marked`;
            } else if (isDelete) {
                successMsg = `Reply has been deleted!`;
            } else {
                successMsg = `Reply has been updated!`;
            }
            toast.success(successMsg);
        } catch (e) {
            console.log(e);
            toast.error(errorMsgHelper(e));
        }
        setUpdatingReply(false);
    };
    return (
        <Card sx={{ mb: 4, p: '20px' }} id={_id}>
            <CardContent>
                <Box sx={{ lineHeight: 2 }}>
                    <Box sx={{ lineHeight: 2, display: 'flex', justifyContent: 'space-between', width: '100%', mb: '21px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
                            {(brandLogo && (
                                <Typography>
                                    <img src={brandLogo} alt="brandLogo" style={{ maxWidth: '80px' }} />
                                </Typography>
                            )) ||
                                ''}

                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    color: '#0A362E',
                                    bgcolor: '#C7FCEB',
                                    height: '28px',
                                    width: '127px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    borderRadius: '6px'
                                }}
                            >
                                {keyword}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap="14px">
                            <Typography sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>{date}</Typography>
                            <Typography>
                                <SocialIcons platform={platform} />
                            </Typography>
                        </Box>
                    </Box>
                    <Typography sx={{ mb: '9px', fontWeight: 700, lineHeight: '19.54px', fontSize: '16px' }}>{title}</Typography>

                    <Typography sx={{ color: '#000', fontSize: '14px', fontWeight: 400, lineHeight: '22px' }} title={snippet}>
                        {removeLastSentenceIfEllipsis(snippet)}
                    </Typography>
                    {editReply && (
                        <GeneretedReply
                            {...{
                                editReply,
                                setEditReply,
                                reply: editReply,
                                updatingReply,
                                handleUpdateReply,
                                editOpen,
                                setEditOpen,
                                setUpdatingReply,
                                link,
                                showMarkRepliedBtn,
                                markReply,
                                markReplyPosition
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

const SocialIcons = ({ platform }) => {
    if (platform === 'reddit.com')
        return (
            <IconBrandReddit
                style={{
                    background: '#ff4500',
                    padding: '5px',
                    height: '28px',
                    width: '28px',
                    borderRadius: '50%',
                    color: '#fff'
                }}
            />
        );
    if (platform === 'quora.com') return <IconQuora style={{ height: '28px', width: '28px', color: '#b82b27' }} />;
    if (platform === 'twitter.com') return <Twitter sx={{ height: '28px', width: '28px', color: '#17a3f1' }} />;
    if (platform === 'linkedin.com') return <LinkedIn sx={{ height: '28px', width: '28px', color: '#006699' }} />;
    return <></>;
};
