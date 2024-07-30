import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { addingKeywordForSave, removingKeywordForSave, updateProject } from 'features/project/projectActions';
import { IconPlus, IconTrash } from 'tabler-icons';
import { useNavigate } from 'react-router-dom';
import { MENTION_PATH } from 'config';

const AddKeyword = () => {
    const { getAccessToken } = useAuth();
    const { project, suggestedKeywords, updateLoading, updateSuccess } = useSelector((state) => state.project);
    const navigate = useNavigate();
    useEffect(() => {
        if (updateSuccess) {
            navigate(MENTION_PATH);
        }
    }, [updateSuccess]);
    return (
        <Box sx={{ display: { md: 'flex', xs: 'block' } }}>
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
                        <Typography
                            sx={{
                                cursor: 'pointer',
                                lineHeight: 1.8,
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: { sm: '50%', xs: '100%' }
                            }}
                            key={i}
                            component="h5"
                            onClick={() => removingKeywordForSave(keyword)()}
                        >
                            <span>{keyword}</span>
                            <IconTrash size={14} />
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
                                if (suggestedKeywords?.includes?.(keyword)) return;
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
    );
};

export default AddKeyword;
