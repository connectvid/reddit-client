/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { addingKeywordForSave, toggleProjectCreateModalCtrl, updateProject } from 'features/project/projectActions';
import { IconPlus, IconTrash } from 'tabler-icons';
import { useNavigate } from 'react-router-dom';
import { MENTION_PATH } from 'config';
// import { useTheme } from '@mui/material/styles';

const Keywords = () => {
    // const theme = useTheme();
    const { getAccessToken } = useAuth();
    const { project, projects, suggestedKeywords, updateLoading, updateSuccess } = useSelector((state) => state.project);
    const navigate = useNavigate();

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
            navigate(MENTION_PATH);
        }
    }, [updateSuccess]);

    return (
        <>
            <Card sx={{ mb: 5, minHeight: '75vh' }}>
                <CardContent style={{}}>
                    <Box mb={4}>
                        <Typography
                            variant="h2"
                            style={{
                                marginRight: 'auto'
                            }}
                        >
                            Keywords
                        </Typography>
                    </Box>
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
                                        <Typography
                                            component="h3"
                                            sx={{
                                                // color:  theme.palette.secondary.dark
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                                mb: 2
                                            }}
                                        >
                                            Add keywords
                                        </Typography>

                                        <Box sx={{ pl: '50px', color: '#000000', fontWeight: 500 }}>
                                            {suggestedKeywords?.map((keyword, i) => (
                                                <Typography sx={{ cursor: 'pointer', lineHeight: 1.8 }} key={i} component="h5">
                                                    {keyword}
                                                    {/* <IconTrash size={14} /> */}
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
                                        <Typography
                                            component="h3"
                                            sx={{
                                                // color:  theme.palette.secondary.dark
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                                mb: 2
                                            }}
                                        >
                                            AI suggested keywords
                                        </Typography>
                                        <Box sx={{ pl: '50px', mt: '10px', color: '#000000', fontWeight: 500 }}>
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
                </CardContent>
            </Card>
        </>
    );
};

export default Keywords;
