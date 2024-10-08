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
import ManageMentions from 'ui-component/ManageMentions';
import postSorting from 'utils/postSorting';
import EmptyProject from '../projects/EmptyProject';
import errorMsgHelper from 'utils/errorMsgHelper';
import { toast } from 'react-toastify';
import AdvancedSetting from 'ui-component/AdvancedSetting';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';
// import BRAC from '../BRAC';
import PostFilter from 'ui-component/MentionBreadcrumb/PostFilter';
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
    const [selectedLoadMoreKeyword, setSelectedLoadMoreKeyword] = useState({ title: 'All Keywords' });
    const [open, setOpen] = useState(true);
    const [openMentionSettionModal, setOpenMentionSettingModal] = useState(false);
    const handleModal = () => setOpenMentionSettingModal((p) => !p);
    const modalClose = () => setOpenMentionSettingModal(false);
    const [openAdvancedSettingModal, setOpenAdvancedSettingModal] = useState(false);

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

    // SOCKET
    function mentionsUpdate({ message: { items, percentage }, purposeName }) {
        if (items?.length) {
            // setAllDatas(items);
            console.log(`Get new Data by socket`, platforms);
            const reduced = dataGrouppingInPlatform({ data: items, platforms });
            console.log(reduced, 'reduced');
            setMentionsDataObj((p) => {
                // const upObj = {};
                // for (const platform of platforms || []) {
                //     // console.log({ platform });
                //     if (reduced[platform]?.length) {
                //         const allData = [...(reduced[platform] || []), ...(p?.[platform] || [])];
                //         upObj[platform] = postSorting({ data: allData });
                //     } else {
                //         const allData = p?.[platform];
                //         upObj[platform] = postSorting({ data: allData });
                //     }
                // }
                // return upObj;
                const upObj = {};
                (platforms || []).forEach((platform) => {
                    const allData = reduced[platform]?.length ? [...(reduced[platform] || []), ...(p?.[platform] || [])] : p?.[platform];
                    upObj[platform] = postSorting({ data: allData });
                });
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
        if (selectedKeyword?._id === selectedLoadMoreKeyword?._id) return;
        setSelectedLoadMoreKeyword(selectedKeyword);

        setOpen(false);
        setTimeout(() => {
            setOpen(true);
        }, 500);
    }, [selectedKeyword?._id, project?._id]);
    console.log({ selectedPlatform });
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
        const filtered = mentionsDataObj[selectedPlatform]?.filter?.(
            (item) => selectedKeyword?.title === 'All Keywords' || selectedKeyword?.title === item.keyword
        );
        setFilteredData(filtered);
    }, [selectedKeyword?.title, selectedPlatform, mentionsDataObj?.[selectedPlatform]?.length, platforms?.length]);

    // const initFirstPage = () => setCurrentPage(1);

    const loadMore = async () => {
        // const firstKeyword = project?.Suggestedkeywords?.[0];
        // const keyword = selectedKeyword?._id ? selectedKeyword : firstKeyword;
        // console.log({ selectedKeyword });
        // if (!keyword?._id || !selectedPlatform) {
        //     toast.warning(`Failed to load more posts. Please refresh and try again.`);
        //     return;
        // }
        const body = { keywordId: selectedLoadMoreKeyword?._id, platform: selectedPlatform, projectId: project._id };
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
            }

            setMoreLoading?.(false);
        } catch (e) {
            console.log(e);
            toast.warning(errorMsgHelper(e));
            setMoreLoading?.(false);
        }
    };

    let Ele = <></>;
    // {!loading && !filteredData?.length ? project ? <PostPlaceholder /> : <EmptyProject {...{ description: '' }} /> : ''}
    if (!loading && !filteredData?.length) {
        if (project) {
            if (project?.mentionsStatus === 'succeed') {
                if (!filteredData?.length) {
                    Ele = (
                        <Card sx={{ mb: 1 }}>
                            <CardContent>
                                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                    Sorry, there seems to be no posts
                                    {selectedKeyword?.title && selectedKeyword?.title !== 'All Keywords'
                                        ? ` for this keyword ${selectedKeyword.title}`
                                        : ''}{' '}
                                    on {selectedPlatform}
                                    {/* Please Wait For A Few Seconds We Are Working To Bring You New Posts Based On Your Keywords */}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                }
            } else if (project?.mentionsStatus === 'progress') {
                Ele = (
                    <>
                        <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
                            Please Wait For A Few Seconds We Are Working To Bring You New Posts Based On Your Keywords
                        </Typography>
                        <PostPlaceholder />
                    </>
                );
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
                    // initFirstPage,
                    handleASModal: handleASOpenModal
                }}
            />

            {(project?.platforms && (
                <PlatformSelection
                    {...{
                        haveData,
                        platforms: project?.platforms,
                        loading,
                        selectedPlatform // , initFirstPage
                    }}
                />
            )) ||
                ''}
            {(openMentionSettionModal && <ManageMentions {...{ modalClose }} />) || ''}
            {(openAdvancedSettingModal && <AdvancedSetting {...{ modalClose: modalASClose, projectName: project?.brandName }} />) || ''}
            {/* {!loading && !filteredData?.length ? project ? <PostPlaceholder /> : <EmptyProject {...{ description: '' }} /> : ''} */}
            {Ele}

            {loading ? (
                <>
                    <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
                        Please Wait For A Few Seconds We Are Working To Bring You New Posts Based On Your Keywords
                    </Typography>
                    <PostPlaceholder />
                </>
            ) : (
                <>
                    {filteredData?.length ? (
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
                    <LoadMore {...{ loadMore, moreLoading, selectedLoadMoreKeyword, setSelectedLoadMoreKeyword, loading, open }} />
                </>
            )}
        </>
    );
};

export default Mentions;

const LoadMore = ({ loadMore, moreLoading, setSelectedLoadMoreKeyword, loading, initFirstPage, selectedLoadMoreKeyword, open }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                }}
            >
                <BRButton onClick={loadMore} disabled={moreLoading} sx={{ px: 2, color: '#fff', height: '35px', ml: 0.5 }}>
                    Load More {moreLoading ? <CircularProgress sx={{ maxHeight: '16px', maxWidth: '16px', ml: 1 }} /> : ''}
                </BRButton>
                <Typography sx={{ mx: 1, fontWeight: 700 }}>posts from</Typography>
                {open ? (
                    <PostFilter
                        {...{
                            setSelectedKeyword: setSelectedLoadMoreKeyword,
                            defaultKeyword: selectedLoadMoreKeyword,
                            loading,
                            initFirstPage,
                            width: '205px',
                            placeholder: '',
                            wrapperSx: { minWidth: '150px', border: 0, background: 'transparent' }
                        }}
                    />
                ) : (
                    ''
                )}
                {/* <BRAC
                    {...{
                        placeholder: 'Select keyword',
                        options: [{ title: 'All Keywords' }, ...options],
                        getOptionLabel: (item) => item.title,
                        disableClearable: true,
                        disablePortal: true,
                        defaultValue: { title: 'All Keywords' },
                        wrapperSx: {
                            minWidth: '180px',
                            border: 0,
                            background: 'transparent'
                        },
                        titleSx: { pl: 0 },
                        onChange: (_, v) => {
                            // const title = v || defaultKeyword;
                            // setSelectedKeyword(title);
                            // initFirstPage?.();
                        },
                        titleSeparator: false
                    }}
                /> */}
            </Box>
        </Box>
    );
};
