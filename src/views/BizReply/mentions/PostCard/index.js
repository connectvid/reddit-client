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
import { IconBrandReddit } from '@tabler/icons';
import { LinkedIn, Twitter } from '@mui/icons-material';
import IconQuora from 'ui-component/icons/IconQuora';
import { keywordColors } from 'data';
import { random } from 'lodash';
// import crossIcon from '../../../../assets/images/cross.svg';
// import VariableModal from './VariableModal';
// import { display } from '@mui/system';
import OpenAikeyPopup from 'ui-component/OpenAikeyPopup';

const PostCard = ({
    project,
    platform,
    date = 'Recenty Found',
    // postAt,
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
}) => {
    const { getAccessToken, dbUser } = useAuth();
    // console.log(dbUser, 'dbUser');
    const filteredReply = reply ? replaceDomainWithLink(reply.replace(/[*#]/g, '')) : reply;
    const [editReply, setEditReply] = useState(filteredReply);
    const [generatingReply, setGeneratingReply] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [updatingReply, setUpdatingReply] = useState(false);
    const { pathname } = useLocation();
    // const [showVariableModal, setShowVariableModal] = useState(false);
    // const [customPrompt, setCustomPrompt] =
    //     useState(`Incorporate the details of a product/service subtly within the comments, and make sure to include the brand as a clickable link (with the domain URL explicitly mentioned). Here are the specifics:
    //   Brand name: {projectName}
    //   Domain URL: {projectDomain}
    //   Description of the brand: {projectDescription}
    //   The comments should:
    //   1. Be concise and relevant, getting to the point quickly and adding value to the discussion.
    //   2. Integrate a subtle mention of the brand and its benefits without making it the primary focus.
    //   3. Include the brand and the product URL only once per comment, in the format "teamsynergypro.com".
    //   4. Ensure the links do not have any kind of brackets or asterisks around them like ()[]{}**.
    //   5. Be between 250 and 300 characters to ensure higher engagement.
    //   6. Maintain high content quality by including insightful, humorous, or informative content that resonates with the community.
    //   The post title is as follows:
    //   "{title}"
    //   The post snippet is as follows:
    //   "{snippet}"
    //   Use the above guidelines to craft one good comment that encourage discussion and interest in the product/service. `);

    const [showCustomPromptInput, setShowCustomPromptInput] = useState(false);

    const handleGenerateReply = async () => {
        if (dbUser?.needOpenAiKey === 'Yes' && !dbUser?.openAIkey) {
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
            } else {
                setObjItems((p) => {
                    if (update_on === 'markReply') {
                        const filtered = p[selectedPlatform]?.filter?.((item) => item._id !== _id) || [];
                        return { ...p, [selectedPlatform]: filtered };
                    }
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
            toast.warning(errorMsgHelper(e));
        }
        setUpdatingReply(false);
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
                                <Typography sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>{date}</Typography>
                                <Typography>
                                    <SocialIcons platform={platform} />
                                </Typography>
                            </Box>
                        </Box>
                        {/* <Typography sx={{ mb: '10px', lineHeight: '19.54px', fontSize: '20px' }}>
                        {title.split(keyword).map((part, index, arr) => (
                            <React.Fragment key={index}>
                                {part}
                                {index < arr.length - 1 && <strong>{keyword}</strong>}
                            </React.Fragment>
                        ))}
                    </Typography> */}

                        <Typography sx={{ mb: '10px', lineHeight: '19.54px', fontSize: '20px' }}>
                            {title.split(new RegExp(`(${keyword})`, 'i')).map((part, index) =>
                                part.toLowerCase() === keyword.toLowerCase() ? (
                                    <strong key={index}>{part}</strong> // Bold the matching keyword
                                ) : (
                                    <React.Fragment key={index}>{part}</React.Fragment>
                                )
                            )}
                        </Typography>

                        {/* <Typography sx={{ mb: '10px', fontWeight: 700, lineHeight: '19.54px', fontSize: '20px' }}>{title}</Typography> */}

                        {/* <Typography sx={{ color: '#000', fontSize: '16px', fontWeight: 500, lineHeight: '22px' }} title={snippet}>
                        {removeLastSentenceIfEllipsis(snippet)
                            .split(keyword)
                            .map((part, index, arr) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < arr.length - 1 && <strong>{keyword}</strong>}
                                </React.Fragment>
                            ))}
                    </Typography> */}
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

                        {/* <Typography sx={{ color: '#000', fontSize: '16px', fontWeight: 500, lineHeight: '22px' }} title={snippet}>
                        {removeLastSentenceIfEllipsis(snippet)}
                    </Typography> */}
                        {/* <Box>
                        <Box
                            style={{
                                fontSize: '15px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '-20px'
                            }}
                        >
                            <p>Enter Custom Prompt:</p>
                            <Box style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ fontSize: '15px', cursor: 'pointer' }} onClick={() => setShowVariableModal(true)}>
                                    Variables
                                </div>
                                <img
                                    style={{
                                        cursor: 'pointer',
                                        float: 'right',
                                        height: '20px',
                                        marginTop: '5px'
                                    }}
                                    onClick={() => setShowCustomPromptInput(false)}
                                    src={crossIcon}
                                    alt="icon"
                                />
                            </Box>
                        </Box>

                        {showCustomPromptInput && (
                            <TextField
                                value={customPrompt}
                                required
                                fullWidth
                                multiline
                                onChange={(e) => setCustomPrompt(e.target.value || '')}
                                sx={{
                                    mb: 2,
                                    borderRadius: `0 !important`,
                                    textarea: {
                                        borderRadius: `0 !important`,
                                        fontSize: '16px',
                                        lineHeight: '22px',
                                        minHeight: '50px',
                                        maxHeight: '80px'
                                    }
                                }}
                            />
                        )}
                    </Box> */}

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
                                showCustomPromptInput,
                                setShowCustomPromptInput
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
    return <></>;
};
