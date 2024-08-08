/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Autocomplete, Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
import PostCard from './PostCard';
import { changePlatform } from 'features/project/projectActions';
import reddit from 'assets/images/platforms/reddit.png';
import linkedin from 'assets/images/platforms/linkedin.png';
import quora from 'assets/images/platforms/quora.png';
import twitter from 'assets/images/platforms/twitter.png';
import removeEndingSubstring from 'utils/removeEndingSubstring';
import PostPlaceholder from 'ui-component/cards/Skeleton/PostPlaceholder';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';

const Mentions = () => {
    const { getAccessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const [mentionsDataObj, setMentionsDataObj] = useState({});
    const [selectedKeyword, setSelectedKeyword] = useState({ title: 'All' });

    const {
        project,
        selectedPlatform // projectCreated
    } = useSelector((state) => state.project);
    // const { subscription } = useSelector((state) => state.subscription);
    // const repliesCredits = subscription?.remainingCredit?.replies;
    useEffect(() => {
        const projectId = project?._id;
        const fetchProjectMentions = async (projectid) => {
            setLoading(true);
            setSelectedKeyword(project?.Suggestedkeywords[0]);
            try {
                const token = await getAccessToken();
                const { data } = await axios.get(`mentions/projects/${projectid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const platfms = project?.platforms?.reduce((a, c) => {
                    a[c] = [];
                    return a;
                }, {});
                const reduced = data.items?.reduce((a, c) => {
                    c.view = true;
                    if (c.platform === 'reddit.com') {
                        const link = removeEndingSubstring(c.link, '/');
                        if (link.includes('reddit.com/r/') && link.split(/(?<!\/)\/(?!\/)/).length === 3) {
                            return a;
                        }
                        if (a[c.platform]) {
                            a[c.platform].push(c);
                        }
                        return a;
                    }
                    if (a[c.platform]) {
                        a[c.platform].push(c);
                    }

                    return a;
                }, platfms);
                setMentionsDataObj(reduced);
                setLoading(false);
            } catch (e) {
                console.log(e);

                setLoading(false);
            }
        };
        if (projectId) {
            fetchProjectMentions(projectId);
        }
    }, [project?._id]);

    const loadMore = async () => {
        if (!selectedKeyword?._id || !selectedPlatform) {
            toast.error(`Someting going wrong!`);
            return;
        }
        const body = { keywordId: selectedKeyword._id, platform: selectedPlatform };
        console.log(body);
        setMoreLoading(true);
        try {
            const token = await getAccessToken();
            const {
                data: { items }
            } = await axios.post(`mentions/load-more`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (items?.length) {
                setMentionsDataObj((p) => {
                    p[selectedPlatform] = [...p[selectedPlatform], ...items];
                    return p;
                });
            }

            setMoreLoading(false);
        } catch (e) {
            console.log(e);
            toast.error(errorMsgHelper(e));

            setMoreLoading(false);
        }
    };

    const platformsSrc = {
        'reddit.com': reddit,
        'linkedin.com': linkedin,
        'quora.com': quora,
        'twitter.com': twitter
    };

    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: '',
                        alignItems: 'center',
                        gap: { xs: '10px', md: '20px' },
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            // justifyContent: { xs: 'normal', sm: 'space-between' },
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                width: { xs: '100%', md: '' },
                                textAlign: { xs: 'center', md: '' }
                            }}
                        >
                            Mentions
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* width: { xs: '100%', md: '50%' } */}
                            {project?.platforms?.map?.((platform) => (
                                <Typography
                                    key={platform}
                                    component="div"
                                    sx={{
                                        cursor: 'pointer',
                                        p: 0,
                                        maxWidth: '125px',
                                        border: selectedPlatform === platform && '1px solid rgb(33, 150, 243)',
                                        minHeight: '45px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => {
                                        if (selectedPlatform !== platform) changePlatform(platform)();
                                    }}
                                >
                                    <img
                                        src={platformsSrc[platform]}
                                        alt={platform}
                                        style={{
                                            width: '85%'
                                        }}
                                    />
                                </Typography>
                            )) || ''}
                        </Box>
                    </Box>
                    {/*  */}
                    <PostFilter {...{ keywords: project?.Suggestedkeywords, setSelectedKeyword, loading }} />
                </CardContent>
            </Card>
            {loading ? (
                <PostPlaceholder />
            ) : (
                <>
                    {selectedPlatform &&
                        mentionsDataObj[selectedPlatform]?.map?.((item) => {
                            if (selectedKeyword?.title === 'All')
                                return (
                                    <PostCard
                                        key={item._id}
                                        {...item}
                                        {...{
                                            project,
                                            setObjItems: setMentionsDataObj,
                                            selectedPlatform,
                                            showMarkRepliedBtn: true
                                        }}
                                    />
                                );
                            if (selectedKeyword?.title === item.keyword)
                                return (
                                    <PostCard
                                        key={item._id}
                                        {...item}
                                        {...{
                                            project,
                                            setObjItems: setMentionsDataObj,
                                            selectedPlatform,
                                            showMarkRepliedBtn: true
                                        }}
                                    />
                                );
                        })}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={loadMore}
                            disabled={selectedKeyword?.title === 'All' || moreLoading || !selectedPlatform}
                            title={selectedKeyword?.title === 'All' && `Please choose a keyword`}
                        >
                            Load more {moreLoading && <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px', ml: 1 }} />}
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};

export default Mentions;

const PostFilter = ({ keywords, label = 'Choose Your Keyword', setSelectedKeyword, loading }) => {
    // platform
    return (
        <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            {!loading && keywords?.length && (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={keywords}
                    sx={{
                        py: 0
                    }}
                    defaultValue={keywords[0]}
                    fullWidth
                    getOptionLabel={(item) => item.title}
                    onChange={(_, v) => {
                        const title = v || { title: 'All' };
                        setSelectedKeyword(title);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            sx={
                                {
                                    // '.MuiOutlinedInput-root': { py: '0 !important' },
                                    // py: '0 !important',
                                    // label: {
                                    //     mt: '-9px',
                                    //     '&:focus': {
                                    //         mt: 0
                                    //     }
                                    // },
                                    // input: {
                                    //     py: 0
                                    // },
                                    // fieldset: {
                                    //     py: 0
                                    // }
                                }
                            }
                        />
                    )}
                />
            )}
        </Box>
    );
};
