/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
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
import { IconBrandReddit, IconBrandTiktok } from '@tabler/icons';
import { LinkedIn, Twitter, Facebook, Instagram, Pinterest } from '@mui/icons-material';
import IconQuora from 'ui-component/icons/IconQuora';
import { keywordColors } from 'data';
import { random } from 'lodash';
// import crossIcon from '../../../../assets/images/cross.svg';
// import VariableModal from './VariableModal';
// import { display } from '@mui/system';
import OpenAikeyPopup from 'ui-component/OpenAikeyPopup';
import { useSelector } from 'react-redux';
import GradinentText from 'ui-component/GradinentText';
import classes from './postcard.module.css';
import isNew from 'utils/isNew';
import BRButton from 'ui-component/bizreply/BRButton';
import moment from 'moment';

const PostCard = ({
    project,
    platform,
    date,
    dateRange,
    // date = 'Recenty Found',
    // postAt,
    createdAt,
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
    markReplyPosition = 'reply-section', // generate-reply-top
    selectedPrompt
    // toggleInit
}) => {
    const { getAccessToken, dbUser } = useAuth();
    const { aiModels } = useSelector((s) => s.aiModel);
    // console.log(dbUser, 'dbUser');
    const filteredReply = reply ? replaceDomainWithLink(reply.replace(/[*#]/g, '')) : reply;
    const [editReply, setEditReply] = useState(filteredReply);
    const [generatingReply, setGeneratingReply] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [updatingReply, setUpdatingReply] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const { pathname } = useLocation();
    // console.log(dateRange);
    const handleGenerateReply = async () => {
        if (dbUser?.needOpenAiKey === 'Yes' && !aiModels?.length) {
            setOpenAlert(true);
            return;
        }
        if (repliesCredits !== 'Unlimited' && repliesCredits < 1) {
            toast.warning(`Reply limit reached. You cannot send more replies at this time.!`);
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
            platform,
            prompt: selectedPrompt
        };
        try {
            const token = await getAccessToken();
            const response = await axios.post(`/mentions/${_id}/generate-reply`, body, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { reply: responseReply, apiPrompt } = response.data;
            console.log(apiPrompt);
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
            // if (!selectedPlatform) {
            //     setTimeout(() => {
            //         toggleInit();
            //     }, 1500);
            // }
            subsctriptionCreditsSetter({ replies: -1 })();
            toast.success(`Reply has been generated!`);
        } catch (e) {
            console.log(e);
            toast.warning(errorMsgHelper(e));
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
                    if (update_on === 'markReply') {
                        return p?.filter?.((item) => item._id !== _id) || [];
                    }
                    const changed =
                        p?.map?.((item) => {
                            if (item._id === _id) {
                                if (isDelete) {
                                    upData.reply = '';
                                } else if (update_on === 'reply') {
                                    upData.reply = editVal;
                                }
                            }
                            return item;
                        }) || [];
                    return changed;
                });
                // if (!selectedPlatform) {
                //     setTimeout(() => {
                //         toggleInit();
                //     }, 1500);
                // }
            } else {
                setObjItems((p) => {
                    if (update_on === 'markReply') {
                        if (selectedPlatform) {
                            const filtered = p[selectedPlatform]?.filter?.((item) => item._id !== _id) || [];
                            return { ...p, [selectedPlatform]: filtered };
                        }
                        const filtered = [...p]?.filter?.((item) => item._id !== _id) || [];
                        return filtered;
                    }
                    if (selectedPlatform) {
                        const changed =
                            p[selectedPlatform]?.map?.((item) => {
                                if (item._id === _id) {
                                    if (isDelete) {
                                        upData.reply = '';
                                    } else if (update_on === 'reply') {
                                        upData.reply = editVal;
                                    }
                                }
                                return item;
                            }) || [];
                        return { ...p, [selectedPlatform]: changed };
                    }
                    const changed =
                        p?.map?.((item) => {
                            if (item._id === _id) {
                                if (isDelete) {
                                    upData.reply = '';
                                } else if (update_on === 'reply') {
                                    upData.reply = editVal;
                                }
                            }
                            return item;
                        }) || [];

                    return changed;
                });
                // if (!selectedPlatform) {
                //     setTimeout(() => {
                //         toggleInit();
                //     }, 1500);
                // }
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
            toast.warning(errorMsgHelper(e));
        }
        setUpdatingReply(false);
    };
    const handleDeletePost = async () => {
        setDeletePost(true);

        try {
            const token = await getAccessToken();
            await axios.delete(`/mentions/${_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (pathname === REPLY_PATH) {
                setObjItems((p) => {
                    return JSON.parse(JSON.stringify(p))?.filter?.((item) => item._id !== _id) || [];
                });
                // if (!selectedPlatform) {
                //     setTimeout(() => {
                //         toggleInit?.();
                //     }, 1500);
                // }
            } else {
                setObjItems((p) => {
                    if (selectedPlatform) {
                        const filtered = p[selectedPlatform]?.filter?.((item) => item._id !== _id) || [];
                        return { ...p, [selectedPlatform]: filtered };
                    }
                    const filtered = JSON.parse(JSON.stringify(p))?.filter?.((item) => item._id !== _id) || [];
                    return filtered;
                });
                // if (!selectedPlatform) {
                //     setTimeout(() => {
                //         toggleInit?.();
                //     }, 1500);
                // }
            }

            toast.success('Post has been skipped');
        } catch (e) {
            console.log(e);
            toast.warning(errorMsgHelper(e));
        }
        setDeletePost(false);
    };
    return (
        <>
            {(openAlert && <OpenAikeyPopup handleClose={() => setOpenAlert(false)} />) || ''}
            <Card sx={{ mb: 4, p: '5px' }} id={_id}>
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
                                        height: '28px',
                                        minWidth: '127px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        borderRadius: '6px',
                                        px: '20px',
                                        ...keywordColors[random(1, 3)]
                                    }}
                                >
                                    {keyword}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap="14px">
                                <Typography sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '18px' }} title={createdAt}>
                                    {date ||
                                        `${dateRange?.start ? moment(dateRange?.start).format('DD MMM, YYYY') : ''} ${
                                            dateRange?.end ? `- ${moment(dateRange?.end).format('DD MMM, YYYY')}` : ''
                                        }`}
                                </Typography>
                                <Typography>
                                    <SocialIcons platform={platform} />
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ mb: '10px', lineHeight: '19.54px', fontSize: '20px' }}>
                                {title.split(new RegExp(`(${keyword})`, 'i')).map((part, index) =>
                                    part.toLowerCase() === keyword.toLowerCase() ? (
                                        <strong key={index}>{part}</strong> // Bold the matching keyword
                                    ) : (
                                        <React.Fragment key={index}>{part}</React.Fragment>
                                    )
                                )}
                            </Typography>

                            {isNew({ createdAt }) ? (
                                <BRButton
                                    variant="outlined"
                                    sx={{
                                        height: '40px',
                                        // width: '183px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        fontWeight: 500
                                    }}
                                    childSx={{ justifyContent: 'center' }}
                                >
                                    <GradinentText className={classes.post_card}>New</GradinentText>
                                </BRButton>
                            ) : (
                                ''
                            )}
                        </Box>

                        <Typography sx={{ color: '#000', fontSize: '16px', fontWeight: 500, lineHeight: '22px' }} title={snippet}>
                            {removeLastSentenceIfEllipsis(snippet)
                                .split(new RegExp(`(${keyword})`, 'i')) // Case-insensitive split
                                .map((part, index) =>
                                    part.toLowerCase() === keyword.toLowerCase() ? (
                                        <strong key={index}>{part}</strong> // Bold the keyword
                                    ) : (
                                        <React.Fragment key={index}>{part}</React.Fragment>
                                    )
                                )}
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
                        <PostCardFooter
                            {...{
                                generatingReply,
                                handleGenerateReply,
                                link,
                                platform,
                                repliesCredits,
                                handleDeletePost,
                                deletePost,
                                createdAt
                            }}
                        />
                        {/* <VariableModal {...{ showVariableModal, setShowVariableModal }} /> */}
                    </Box>
                </CardContent>
            </Card>
        </>
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
    if (platform === 'tiktok.com') return <IconBrandTiktok sx={{ height: '28px', width: '28px', color: '#FE2C55' }} />;
    if (platform === 'facebook.com') return <Facebook sx={{ height: '28px', width: '28px', color: '#006699' }} />;
    if (platform === 'instagram.com') return <Instagram sx={{ height: '28px', width: '28px', color: '#cd486b' }} />;
    if (platform === 'pinterest.com') return <Pinterest sx={{ height: '28px', width: '28px', color: '#e8443d' }} />;
    return <></>;
};
