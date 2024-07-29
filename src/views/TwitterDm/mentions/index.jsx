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
import MentionCard from './MentionCard';

const Mentions = () => {
    const { getAccessToken, dbUser } = useAuth();
    const [mentionsData, setMentionsData] = useState([]);
    const { project, projects, suggestedKeywords, updateLoading } = useSelector((state) => state.project);
    const { user } = useSelector((state) => state.auth);
    // const handleClose = () => {
    //     setOpen((p) => !p);
    // };
    console.log(mentionsData, 'mentionsData');
    useEffect(() => {
        const projectId = project?._id;
        const fetchProjectMentions = async (projectid) => {
            try {
                const token = await getAccessToken();
                const { data } = await axios.get(`projects/${projectid}/${user._id}/mentions`, {
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
                        Mentions
                    </Typography>
                </CardContent>
            </Card>
            {mentionsData?.map?.((singelArr, idx) => {
                return singelArr.datas?.map((item, i) => (
                    <MentionCard key={`${idx}.${i}`} item={item} singelArr={singelArr} />
                    // <Card sx={{ mb: 4 }} key={`${idx}.${i}`}>
                    //     <CardContent style={{}}>
                    //         <Box sx={{ lineHeight: 2 }}>
                    //             <Box sx={{ lineHeight: 2, display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                    //                 <Typography style={{}}>{item.date}</Typography>
                    //                 <Typography style={{}}>{singelArr.keyword}</Typography>
                    //             </Box>
                    //             <Typography style={{}}>{item.snippet}</Typography>
                    //             <Typography style={{}}>
                    //                 <a href={item.link} target="_blank" style={{ textDecoration: 'none' }}>
                    //                     View
                    //                 </a>
                    //             </Typography>
                    //             <Button variant="contained" sx={{ mt: 2 }}>
                    //                 Generate Reply
                    //             </Button>
                    //         </Box>
                    //     </CardContent>
                    // </Card>
                ));
            })}
            {/* {!projects?.length ? (
                <Typography>
                    <span onClick={toggleProjectCreateModalCtrl()}>Create a project</span>
                </Typography>
            ) : (
                <>
                    {!project ? (
                        <Typography>Please Select a Project</Typography>
                    ) : (
                        <Box sx={{ display: { md: 'flex', sm: 'block' } }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography component="h3">Add keywords</Typography>

                                <Box sx={{ pl: '50px' }}>
                                    {suggestedKeywords?.map((keyword, i) => (
                                        <Typography sx={{ cursor: 'pointer', lineHeight: 1.8 }} key={i} component="h5">
                                            {keyword} <IconTrash size={14} />
                                        </Typography>
                                    ))}
                                </Box>
                                <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ mt: '15px' }}
                                    disabled={!suggestedKeywords?.length || updateLoading}
                                    onClick={async () => {
                                        const token = await getAccessToken();
                                        updateProject(token, project._id, { suggestedKeywords })();
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Typography component="h3" sx={{ fontWeight: 'bold' }}>
                                    AI suggested keywords
                                </Typography>
                                <Box sx={{ pl: '50px', mt: '10px' }}>
                                    {project?.keywords?.map((keyword, i) => (
                                        <Typography
                                            onClick={() => {
                                                addingKeywordForSave(keyword)();
                                            }}
                                            sx={{ cursor: 'pointer', lineHeight: 1.8 }}
                                            key={i}
                                            component="h5"
                                        >
                                            <IconPlus size={14} /> {keyword}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </>
            )} */}
        </>
    );
};

export default Mentions;
