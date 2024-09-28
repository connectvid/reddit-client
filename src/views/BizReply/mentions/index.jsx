/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
import PostCard from './PostCard';
import PostPlaceholder from 'ui-component/cards/Skeleton/PostPlaceholder';
import socket from 'socket';
import PlatformSelection from './PlatformSelection';
import { useLocation } from 'react-router-dom';
import MentionBreadcrumb from 'ui-component/MentionBreadcrumb';
import Pagination from './Pagination';
import ManageMentions from 'ui-component/ManageMentions';
import postSorting from 'utils/postSorting';
import EmptyProject from '../projects/EmptyProject';
import errorMsgHelper from 'utils/errorMsgHelper';
import { toast } from 'react-toastify';
import AdvancedSetting from 'ui-component/AdvancedSetting';
import { Card, CardContent, Typography } from '@mui/material';
// import OpenAikeyPopup from 'ui-component/OpenAikeyPopup';

const dataGrouppingInPlatform = ({ data = [], platforms = [] }) => {
    const platfms = platforms?.reduce((a, c) => {
        a[c] = [];
        return a;
    }, {});
    const reduced = data?.reduce((a, c) => {
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
    const {
        project: { project, selectedPlatform, projects },
        prompt: { selectedPrompt },
        subscription: { subscription }
    } = useSelector((state) => state);
    const { platforms = [] } = subscription || {};
    const { state } = useLocation();
    // const navigate = useNavigate();
    const { getAccessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    // const [showEmpty, setShowEmpty] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const [haveData, setHaveData] = useState(false);
    const [mentionsDataObj, setMentionsDataObj] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    // const [allDatas, setAllDatas] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState({ title: 'All Keywords' });
    const [currentPosts, setCurrentPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [filterAgain, setFilterAgain] = useState(0);
    const [recall, setRecall] = useState(false);
    const handleRecall = () => setRecall((p) => !p);
    const [openMentionSettionModal, setOpenMentionSettingModal] = useState(false);
    const handleModal = () => setOpenMentionSettingModal((p) => !p);
    const modalClose = () => setOpenMentionSettingModal(false);
    const postsPerPage = 10;

    const [openAdvancedSettingModal, setOpenAdvancedSettingModal] = useState(false);
    // const handleASModal = () => setOpenAdvancedSettingModal((p) => !p);
    const handleASOpenModal = () => {
        if (!projects?.length) {
            toast.warn(`Please create a new project first to setup advance settings!`);
            return;
        }
        if (!project) {
            toast.warn(`Please select a project first to setup advance settings!`);
            return;
        }
        setOpenAdvancedSettingModal(true);
    };
    const modalASClose = () => setOpenAdvancedSettingModal(false);

    // console.log(currentPosts, 'currentPosts', mentionsDataObj, platforms);
    // SOCKET
    function mentionsUpdate({ message: { items, percentage }, purposeName }) {
        if (items?.length) {
            // setAllDatas(items);
            console.log(`Get new Data by socket`, platforms);
            const reduced = dataGrouppingInPlatform({ data: items, platforms });
            console.log(reduced, 'reduced');
            setMentionsDataObj((p) => {
                const upObj = {};
                for (const platform of platforms || []) {
                    // console.log({ platform });
                    if (reduced[platform]?.length) {
                        const allData = [...(reduced[platform] || []), ...(p?.[platform] || [])];
                        upObj[platform] = postSorting({ data: allData });
                    } else {
                        const allData = p?.[platform];
                        upObj[platform] = postSorting({ data: allData });
                    }
                }
                return upObj;
            });
            // console.log('socket', reduced);
            if (loading) {
                setLoading(false);
            }
            console.log({ purposeName });
            if (purposeName === 'manage-mentions') {
                // setFilterAgain((p) => p + 1);
            }
        }
        console.log(`fetching Mentions`, { percentage });
        if (!haveData && items?.length) {
            setHaveData(true);
            console.log(`haveData true`);
        }
    }
    useEffect(() => {
        socket.connect();
        const encoding = `project:${project?._id}`;
        console.log(`Socket is connected`, encoding);
        // if (state?.socket) {
        socket.connect();

        socket.on(encoding, mentionsUpdate);
        // socket.off();
        // setTimeout(() => {
        //     setShowEmpty(true);
        // }, 2500);
        return () => {
            socket.disconnect();
            setMentionsDataObj({});
        };
    }, []);

    useEffect(() => {
        const projectId = project?._id;
        const fetchProjectMentions = async (projectid) => {
            setLoading(true);
            // const first = project?.Suggestedkeywords?.[0];
            // if (first) setSelectedKeyword(first);
            try {
                const token = await getAccessToken();
                setFilteredData([]);
                const {
                    data: { items }
                } = await axios.get(`mentions/projects/${projectid}?fetch=expect-mark-reply${state?.socket ? `&wait=true` : ''}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const len = items.length;
                setHaveData(Boolean(len));
                //   ////////////////////
                const reduced = dataGrouppingInPlatform({ data: items, platforms });
                setMentionsDataObj(reduced);
                const [platform] = platforms || [];

                const filtered = reduced[platform];
                setFilteredData(filtered);
                setLoading(false);
                // if (!state?.socket || len) {
                //     setLoading(false);
                // }
                if (!state?.socket) {
                    // navigate(`${pathname}${search}`, { state: null });
                }
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

    useEffect(() => {
        const filtered = mentionsDataObj[selectedPlatform]?.filter?.((item) => {
            if (selectedKeyword?.title === 'All Keywords') {
                return item;
            }
            if (selectedKeyword?.title === item.keyword) {
                return item;
            }
        });
        setFilteredData(filtered);
        // setCurrentPage(1);
        handleRecall();
    }, [selectedKeyword?.title, selectedPlatform, mentionsDataObj?.[selectedPlatform]?.length, platforms?.length]);

    const initFirstPage = () => setCurrentPage(1);

    const loadMore = async () => {
        const firstKeyword = project?.Suggestedkeywords?.[0];
        const keyword = selectedKeyword?._id ? selectedKeyword : firstKeyword;
        // console.log({ selectedKeyword });
        if (!keyword?._id || !selectedPlatform) {
            toast.warning(`Failed to load more posts. Please refresh and try again.`);
            return;
        }
        const body = { keywordId: keyword._id, platform: selectedPlatform };
        setMoreLoading?.(true);
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
                // setMentionsDataObj?.((p) => {
                //     if (selectedPlatform) {
                //         const allData = [...items, ...(p?.[selectedPlatform] || [])];
                //         p[selectedPlatform] = postSorting({ data: allData });
                //     } else {
                //         const allData = [...items, ...p];
                //         p = postSorting({ data: allData });
                //     }
                //     return p;
                // });
                setMentionsDataObj?.((p) => {
                    if (selectedPlatform) {
                        const allData = [...(p?.[selectedPlatform] || []), ...items];
                        p[selectedPlatform] = allData;
                        // p[selectedPlatform] = postSorting({ data: allData });
                    } else {
                        const allData = [...p, ...items];
                        p = allData;
                        // p = postSorting({ data: allData });
                    }
                    return p;
                });
                if (currentPosts?.length < postsPerPage) {
                    setCurrentPage((p) => p + 1);
                }
            }

            setMoreLoading?.(false);
        } catch (e) {
            console.log(e);
            toast.warning(errorMsgHelper(e));
            setMoreLoading?.(false);
        }
    };

    // const mentionFetchAgain = async () => {
    //     setLoading(true);
    //     // const first = project?.Suggestedkeywords?.[0];
    //     // if (first) setSelectedKeyword(first);
    //     try {
    //         const token = await getAccessToken();
    //         setFilteredData([]);
    //         const body = { project };
    //         const {
    //             data: { items }
    //         } = await axios.post(`mentions/projects/${project?._id}/refresh-scrap`, body, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const len = items.length;
    //         setHaveData(Boolean(len));
    //         //   ////////////////////
    //         const reduced = dataGrouppingInPlatform({ data: items, platforms });
    //         setMentionsDataObj(reduced);
    //         const [platform] = platforms || [];
    //         // const title = first?.title;
    //         // console.log(reduced, first);

    //         // if (platform && title) {
    //         //     const filtered = reduced[platform]?.filter?.((item) => title === item.keyword);
    //         //     setFilteredData(filtered);
    //         // }
    //         const filtered = reduced[platform];
    //         setFilteredData(filtered);
    //         setLoading(false);
    //         // if (!state?.socket || len) {
    //         //     setLoading(false);
    //         // }
    //         if (!state?.socket) {
    //             // navigate(`${pathname}${search}`, { state: null });
    //         }
    //     } catch (e) {
    //         console.log(e);
    //         setLoading(false);
    //     }
    // };
    let Ele = <></>;
    // {!loading && !filteredData?.length ? project ? <PostPlaceholder /> : <EmptyProject {...{ description: '' }} /> : ''}
    if (!loading && !filteredData?.length) {
        if (project) {
            if (project?.mentionsStatus === 'succeed') {
                if (!currentPosts?.length) {
                    Ele = (
                        <Card sx={{ mb: 1 }}>
                            <CardContent>
                                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                    Sorry, there seems to be no posts
                                    {selectedKeyword?.title && selectedKeyword?.title !== 'All Keywords'
                                        ? ` for this keyword ${selectedKeyword.title} `
                                        : ''}
                                    on {selectedPlatform}
                                    {/* Please Wait For A Few Seconds We Are Working To Bring You New Posts Based On Your Keywords */}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                }
            } else if (project?.mentionsStatus === 'progress') {
                Ele = <PostPlaceholder />;
            }
        } else {
            Ele = <EmptyProject {...{ description: '' }} />;
        }
    }
    return (
        <>
            {/* <OpenAikeyPopup /> */}
            <MentionBreadcrumb
                {...{
                    setSelectedKeyword,
                    loading,
                    selectedKeyword,
                    setMentionsDataObj,
                    setMoreLoading,
                    moreLoading,
                    // firstKeyword: project?.Suggestedkeywords?.[0],
                    handleModal,
                    initFirstPage,
                    handleASModal: handleASOpenModal
                }}
            />

            {(project?.platforms && (
                <PlatformSelection {...{ haveData, platforms: project?.platforms, loading, selectedPlatform, initFirstPage }} />
            )) ||
                ''}
            {(openMentionSettionModal && <ManageMentions {...{ modalClose }} />) || ''}
            {(openAdvancedSettingModal && <AdvancedSetting {...{ modalClose: modalASClose }} />) || ''}
            {/* {!loading && !filteredData?.length ? project ? <PostPlaceholder /> : <EmptyProject {...{ description: '' }} /> : ''} */}
            {Ele}

            {/* 
            )} {!loading && showEmpty && !filteredData?.length ? (
                <Card sx={{ mb: 1 }}>
                    <CardContent>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}>
                            Please Wait For A Few Seconds We Are Working To Bring You New Posts Based On Your Keywords */}
            {/* Sorry, there seems to be no posts
                            {selectedKeyword?.title && selectedKeyword.title !== 'All Keywords' ? (
                                <strong> for your suggested {selectedKeyword?.title}</strong>
                            ) : (
                                ''
                            )}
                            ! */}

            {loading ? (
                <>
                    <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
                        Please Wait For A Few Seconds We Are Working To Bring You New Posts Based On Your Keywords
                    </Typography>
                    <PostPlaceholder />
                </>
            ) : (
                <>
                    {currentPosts?.length ? (
                        <>
                            {currentPosts?.map?.((item) => {
                                return (
                                    <PostCard
                                        key={item._id}
                                        {...item}
                                        {...{
                                            project,
                                            setObjItems: setMentionsDataObj,
                                            selectedPlatform,
                                            showMarkRepliedBtn: true,
                                            selectedPrompt
                                        }}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        ''
                    )}
                    <Pagination
                        {...{
                            data: filteredData,
                            setCurrentPosts,
                            currentPosts,
                            postsPerPage,
                            currentPage,
                            setCurrentPage,
                            recall,
                            loadMore,
                            moreLoading
                        }}
                    />
                </>
            )}
        </>
    );
};

export default Mentions;
