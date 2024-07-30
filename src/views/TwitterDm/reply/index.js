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
import MentionCard from '../mentions/PostCard';

const Reply = () => {
    const { getAccessToken } = useAuth();
    const [mentionsData, setMentionsData] = useState([]);
    const { project } = useSelector((state) => state.project);

    useEffect(() => {
        const projectId = project?._id;
        const fetchProjectMentions = async (projectid) => {
            try {
                const token = await getAccessToken();
                const { data } = await axios.get(`mentions/projects/${projectid}?fetch=reply-only`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMentionsData(data.items);
            } catch (e) {
                console.log(e);
            }
        };
        if (projectId) {
            fetchProjectMentions(projectId);
        }
    }, [project?._id]);

    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2" style={{ marginRight: 'auto' }}>
                        Replies
                    </Typography>
                </CardContent>
            </Card>
            {mentionsData?.map?.((item) => (
                <MentionCard key={item._id} {...item} {...{ project, setMentionsData }} />
            ))}
        </>
    );
};

export default Reply;
