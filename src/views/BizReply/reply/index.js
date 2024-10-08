/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
import PostCard from '../mentions/PostCard';
import PostPlaceholder from 'ui-component/cards/Skeleton/PostPlaceholder';
import ReplyBreadcrumb from 'ui-component/ReplyBreadcrumb';

const Reply = () => {
    const { getAccessToken } = useAuth();
    const [mentionsData, setMentionsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        project: { project },
        prompt: { selectedPrompt }
    } = useSelector((state) => state);

    useEffect(() => {
        const projectId = project?._id;
        const fetchProjectMentions = async (projectid) => {
            try {
                setLoading(true);
                const token = await getAccessToken();
                const { data } = await axios.get(`mentions/projects/${projectid}?fetch=reply-only`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMentionsData(data.items);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        if (projectId) {
            fetchProjectMentions(projectId);
        }
    }, [project?._id]);

    return (
        <>
            <ReplyBreadcrumb {...{ mentionsData, brandName: project?.brandName }} />
            {loading ? <PostPlaceholder /> : ''}
            {!loading && !mentionsData?.length ? (
                <Card>
                    <CardContent>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}>
                            No saved replies!
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                ''
            )}

            {mentionsData?.map?.((item) => (
                <PostCard
                    key={item._id}
                    {...item}
                    {...{
                        project,
                        setObjItems: setMentionsData,
                        markReplyPosition: 'generate-reply-top',
                        brandLogo: project?.brandLogo,
                        selectedPrompt
                    }}
                />
            ))}
        </>
    );
};

export default Reply;
