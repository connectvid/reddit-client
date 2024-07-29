/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import useAuth from 'hooks/useAuth';
import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { addingKeywordForSave, getProjects, toggleProjectCreateModalCtrl, updateProject } from 'features/project/projectActions';
import { IconPlus, IconTrash } from 'tabler-icons';
import axios from 'utils/axios';

const MentionCard = ({ item, singelArr }) => {
    const { getAccessToken, dbUser } = useAuth();
    const { project } = useSelector((state) => state.project);
    const [reply, setReply] = useState('');
    const [generatingReply, setGeneratingReply] = useState(false);

    const handleGenerateReply = async () => {
        setGeneratingReply(true);
        const body = {
            title: item.title,
            snippet: item.snippet,
            projectName: project.brandName,
            projectDomain: project.domain,
            projectDescription: project.shortDescription
        };
        try {
            // console.log(body);
            const token = await getAccessToken();
            const response = await axios.post(`/mentions/replyMention`, body, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReply(response.data.reply);
        } catch (e) {
            console.log(e);
        }
        setGeneratingReply(false);
    };
    return (
        <Card sx={{ mb: 4 }}>
            <CardContent style={{}}>
                <Box sx={{ lineHeight: 2 }}>
                    <Box sx={{ lineHeight: 2, display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                        <Typography style={{}}>{item.date}</Typography>
                        <Typography style={{}}>{singelArr.keyword}</Typography>
                    </Box>
                    <Typography style={{}}>{item.snippet}</Typography>
                    <Typography style={{}}>
                        <a href={item.link} target="_blank" style={{ textDecoration: 'none' }}>
                            View
                        </a>
                    </Typography>
                    <Button onClick={handleGenerateReply} variant="contained" sx={{ mt: 2 }}>
                        Generate Reply
                    </Button>
                    {reply && (
                        <div style={{ marginTop: '20px' }}>
                            Generate Reply:
                            <br />
                            {reply}
                        </div>
                    )}
                    {generatingReply && <div style={{ marginTop: '20px' }}>Generating Reply....</div>}
                </Box>
            </CardContent>
        </Card>
    );
};

export default MentionCard;
