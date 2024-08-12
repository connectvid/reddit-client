/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
import PostCard from './PostCard';
import PostPlaceholder from 'ui-component/cards/Skeleton/PostPlaceholder';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';
import socket from 'socket';
import PostFilter from './PostFilter';
import PlatformSelection from './PlatformSelection';
import { useLocation, useNavigate } from 'react-router-dom';

const dataGrouppingInPlatform = ({ data = [], platforms = [] }) => {
    const platfms = platforms?.reduce((a, c) => {
        a[c] = [];
        return a;
    }, {});
    const reduced = data?.reduce((a, c) => {
        // c.view = true;
        // if (c.platform === 'reddit.com') {
        //     const link = removeEndingSubstring(c.link, '/');
        //     if (link.includes('reddit.com/r/') && link.split(/(?<!\/)\/(?!\/)/).length === 3) {
        //         return a;
        //     }
        //     if (a[c.platform]) {
        //         a[c.platform].push(c);
        //     }
        //     return a;
        // }
        if (a[c.platform]) {
            a[c.platform].push(c);
        } else {
            a[c.platform] = [c];
        }

        return a;
    }, platfms);
    return reduced;
};
const Mentions = () => {
    const { state, pathname, search } = useLocation();
    const navigate = useNavigate();
    const { getAccessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const [haveData, setHaveData] = useState(false);
    const [mentionsDataObj, setMentionsDataObj] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [allDatas, setAllDatas] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState({ title: 'All' });

    const {
        project,
        createKeywordSuccess,
        selectedPlatform // projectCreated
    } = useSelector((state) => state.project);
    console.log(project?.Suggestedkeywords, 'project?.Suggestedkeywords');
    // const { subscription } = useSelector((state) => state.subscription);
    // const repliesCredits = subscription?.remainingCredit?.replies;
    // SOCKET
    useEffect(() => {
        function mentionsUpdate({ message: { items, percentage } }) {
            if (items?.length) {
                // setAllDatas(items);
                const reduced = dataGrouppingInPlatform({ data: items, platforms: project.platforms });
                setMentionsDataObj((p) => {
                    const upObj = {};

                    for (const platform of project.platforms || []) {
                        console.log({ platform });
                        if (reduced[platform]?.length) {
                            upObj[platform] = [...(p?.[platform] || []), ...(reduced[platform] || [])];
                        } else upObj[platform] = p?.[platform];
                    }
                    return upObj;
                });
                // console.log('socket', reduced);
                if (loading) {
                    setLoading(false);
                }
            }
            console.log(`fetching Mentions`, { percentage });
            if (!haveData && items?.length) {
                setHaveData(true);
                console.log(`haveData true`);
            }
            if (percentage === 100) {
                if (state) {
                    navigate(`${pathname}${search}`, { state: null, replace: true });
                    console.log(`State Clear`);
                }
            }
        }
        socket.connect();
        console.log(`Socket is connected`);
        const encoding = `project:${project?._id}`;
        // if (state?.socket) {
        socket.connect();
        //     console.log(`Socket is connected`);
        // }

        socket.on(encoding, mentionsUpdate);
        // socket.off();
        setTimeout(() => {
            setShowEmpty(true);
        }, 2500);
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const projectId = project?._id;
        const fetchProjectMentions = async (projectid) => {
            setLoading(true);
            const first = project?.Suggestedkeywords?.[0];
            if (first) setSelectedKeyword(first);
            try {
                const token = await getAccessToken();
                setFilteredData([]);
                const {
                    data: { items }
                } = await axios.get(`mentions/projects/${projectid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const len = items.length;
                setHaveData(Boolean(len));
                //   ////////////////////
                const reduced = dataGrouppingInPlatform({ data: items, platforms: project.platforms });
                setMentionsDataObj(reduced);
                const [platform] = project?.platforms || [];
                const title = first?.title;
                // console.log(reduced, first);

                if (platform && title) {
                    const filtered = reduced[platform]?.filter?.((item) => title === item.keyword);
                    setFilteredData(filtered);
                }
                setLoading(false);
                // if (!state?.socket || len) {
                //     setLoading(false);
                // }
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        if (projectId && project?.Suggestedkeywords?.length) {
            fetchProjectMentions(projectId);
        } else {
            setLoading(false);
            if (filteredData?.length) {
                setFilteredData([]);
            }
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

    useEffect(() => {
        const filtered = mentionsDataObj[selectedPlatform]?.filter?.((item) => {
            if (selectedKeyword?.title === 'All') {
                return item;
            }
            if (selectedKeyword?.title === item.keyword) {
                return item;
            }
        });
        setFilteredData(filtered);
    }, [selectedKeyword?.title, selectedPlatform, mentionsDataObj?.[selectedPlatform]?.length]);

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
                        <PlatformSelection {...{ haveData, platforms: project?.platforms, loading, selectedPlatform }} />
                    </Box>
                    {!createKeywordSuccess && project?.Suggestedkeywords?.length ? (
                        <PostFilter
                            {...{
                                keywords: project?.Suggestedkeywords, // selectedKeyword
                                setSelectedKeyword,
                                loading,
                                haveData
                            }}
                        />
                    ) : (
                        ''
                    )}
                </CardContent>
            </Card>
            {!loading && showEmpty && !filteredData?.length ? (
                <Card sx={{ mb: 1 }}>
                    <CardContent>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}>
                            Sorry, there seems to be no posts
                            {selectedKeyword?.title && selectedKeyword.title !== 'All' ? (
                                <strong> for your suggested {selectedKeyword?.title}</strong>
                            ) : (
                                ''
                            )}
                            !
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                ''
            )}
            {loading ? (
                <PostPlaceholder />
            ) : (
                <>
                    {filteredData?.map?.((item) => {
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

                    {filteredData?.length ? (
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
                    ) : (
                        ''
                    )}
                </>
            )}
        </>
    );
};

export default Mentions;
