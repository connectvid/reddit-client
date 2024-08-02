/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
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

const Mentions = () => {
    const { getAccessToken } = useAuth();
    // const [mentionsData, setMentionsData] = useState([]);
    const [mentionsDataObj, setMentionsDataObj] = useState({});
    const { project, selectedPlatform, projectCreated } = useSelector((state) => state.project);
    // const [selectedPlatform, setSelectedPlatform] = useState('');

    // console.log(mentionsDataObj?.[selectedPlatform]);
    // console.log(selectedPlatform, 'selectedPlatform');
    // useEffect(() => {
    //     if (!selectedPlatform && project?.platforms?.length) {
    //         setSelectedPlatform(project?.platforms[0]);
    //     }
    // }, [project?.platforms?.length]);
    useEffect(() => {}, [projectCreated]);
    useEffect(() => {
        const projectId = project?._id;
        const fetchProjectMentions = async (projectid) => {
            try {
                const token = await getAccessToken();
                const { data } = await axios.get(`mentions/projects/${projectid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // setMentionsData(data.items);

                const platfms = project?.platforms?.reduce((a, c) => {
                    a[c] = [];
                    return a;
                }, {});
                const reduced = data.items?.reduce((a, c) => {
                    a[c.platform].push(c);
                    return a;
                }, platfms);
                setMentionsDataObj(reduced);
            } catch (e) {
                console.log(e);
            }
        };
        if (projectId) {
            fetchProjectMentions(projectId);
        }
    }, [project?._id]);
    const platformsSrc = {
        'reddit.com': reddit,
        'linkedin.com': linkedin,
        'quora.com': quora,
        'twitter.com': twitter
    };
    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: '', alignItems: 'center', gap: '200px' }}>
                    <Typography variant="h2" style={{}}>
                        Mentions
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {project?.platforms?.map?.((platform) => (
                            <Typography
                                key={platform}
                                variant=""
                                type="button"
                                sx={{ cursor: 'pointer', p: 0, maxWidth: '100px' }}
                                onClick={() => {
                                    if (selectedPlatform !== platform) changePlatform(platform)();
                                }}
                            >
                                {/* {platformsSrc[platform]} */}
                                <img src={platformsSrc[platform]} alt={platform} style={{ width: '100%' }} />
                            </Typography>
                        ))}
                    </Box>
                </CardContent>
            </Card>
            {selectedPlatform &&
                mentionsDataObj[selectedPlatform]?.map?.((item) => (
                    <PostCard
                        key={item._id}
                        {...item}
                        {...{ project, setObjItems: setMentionsDataObj, selectedPlatform, showMarkRepliedBtn: true }}
                    />
                ))}
            {/* {mentionsData?.map?.((item) => (
                <MentionCard key={item._id} {...item} {...{ project, setMentionsData }} />
            ))} */}
        </>
    );
};

export default Mentions;
