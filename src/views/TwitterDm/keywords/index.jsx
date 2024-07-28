/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import useAuth from 'hooks/useAuth';
import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { addingKeywordForSave, getProjects, toggleProjectCreateModalCtrl, updateProject } from 'features/project/projectActions';
import { IconPlus, IconTrash } from 'tabler-icons';
import { useNavigate } from 'react-router-dom';

const Keywords = () => {
    const { getAccessToken, dbUser } = useAuth();
    const { project, projects, suggestedKeywords, updateLoading, updateSuccess } = useSelector((state) => state.project);
    const navigate = useNavigate();
    // const handleClose = () => {
    //     setOpen((p) => !p);
    // };
    useEffect(() => {
        // const fetchProjects = async () => {
        //     try {
        //         const token = await getAccessToken();
        //         getProjects(dbUser._id, token)();
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };
        if (updateSuccess) {
            navigate(`/mentions`);
        }
    }, [updateSuccess]);

    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography variant="h2" style={{ marginRight: 'auto' }}>
                            Keywords
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            {/* <ProjectsTable {...{ projects }} /> */}
            {!projects?.length ? (
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
            )}
        </>
    );
};

export default Keywords;
