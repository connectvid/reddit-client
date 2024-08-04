/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Card, CardContent, Typography } from '@mui/material';
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

const Mentions = () => {
    const { getAccessToken } = useAuth();
    // const [mentionsData, setMentionsData] = useState([]);
    const [mentionsDataObj, setMentionsDataObj] = useState({});
    const {
        project,
        selectedPlatform // projectCreated
    } = useSelector((state) => state.project);

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

                const platfms = project?.platforms?.reduce((a, c) => {
                    a[c] = [];
                    return a;
                }, {});
                const reduced = data.items?.reduce((a, c) => {
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
                                component="div"
                                sx={{
                                    cursor: 'pointer',
                                    p: 0,
                                    maxWidth: '70px',
                                    border: selectedPlatform === platform && `1px solid rgb(33, 150, 243)`,
                                    minHeight: '35px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '5px'
                                }}
                                onClick={() => {
                                    if (selectedPlatform !== platform) changePlatform(platform)();
                                }}
                            >
                                {/* {platformsSrc[platform]} */}
                                <img
                                    src={platformsSrc[platform]}
                                    alt={platform}
                                    style={{
                                        width: '85%' // platform === 'linkedin.com' ? '85%' : '100%'
                                    }}
                                />
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
