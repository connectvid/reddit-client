import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import {
    addingCustomKeywordForSave,
    addingKeywordForSave,
    removingKeywordForSave,
    updateProject,
    removingCustomKeywordForSave
} from 'features/project/projectActions';
import { IconPlus, IconTrash } from 'tabler-icons';
import { useNavigate } from 'react-router-dom';
import { MENTION_PATH } from 'config';
import PropTypes from 'prop-types';

const AddKeyword = () => {
    const { getAccessToken } = useAuth();
    const { project, suggestedKeywords, updateLoading, updateSuccess, customKeywords: cKeys } = useSelector((state) => state.project);
    const [customKeywords, setCustomKeywords] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (updateSuccess) {
            navigate(MENTION_PATH);
        }

        return () => setCustomKeywords([]);
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

                <Box sx={{ color: '#000000', fontWeight: 500 }}>
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
                <AddCustomKeyword {...{ updateLoading, customKeywords, setCustomKeywords }} />
                <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: '15px' }}
                    disabled={
                        (!suggestedKeywords?.length && !Object.values(cKeys || {})?.filter?.((item) => item.trim())?.length) ||
                        updateLoading
                    }
                    onClick={async () => {
                        const token = await getAccessToken();
                        updateProject(token, project._id, {
                            suggestedKeywords: [
                                ...suggestedKeywords.filter((item) => item.trim()),
                                ...Object.values(cKeys).filter((item) => item.trim())
                            ]
                        })();
                        // console.log([
                        //     ...suggestedKeywords.filter((item) => item.trim()),
                        //     ...Object.values(cKeys).filter((item) => item.trim())
                        // ]);
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

const AddCustomKeyword = ({ updateLoading, customKeywords, setCustomKeywords }) => {
    return (
        <Box>
            {customKeywords.map((item) => (
                <Box key={item} sx={{ display: { sm: 'flex' }, alignItems: 'center', mb: 1, gap: 1 }}>
                    <TextField
                        name={item.toString()}
                        sx={{
                            display: 'block',
                            input: {
                                py: '4px',
                                px: 1
                            },
                            fieldset: {
                                borderRadius: '3px'
                            }
                        }}
                        type="text"
                        onChange={({ target: { value = '' } }) => addingCustomKeywordForSave(value, item)()}
                    />
                    <Button
                        type="button"
                        sx={{ py: '4px', borderColor: 'tomato' }}
                        variant="outlined"
                        onClick={() => {
                            removingCustomKeywordForSave(item)();
                            setCustomKeywords((p) => p.filter((im) => im !== item));
                        }}
                    >
                        <IconTrash size={18} color="tomato" />
                    </Button>
                </Box>
            ))}
            <Button
                type="button"
                variant="contained"
                sx={{ mt: '15px', display: 'block', py: '3px' }}
                disabled={updateLoading}
                onClick={() => setCustomKeywords((p) => [...p, p.length])}
            >
                Add New Keyword
            </Button>
        </Box>
    );
};

AddCustomKeyword.propTypes = {
    updateLoading: PropTypes.bool,
    customKeywords: PropTypes.arrayOf(PropTypes.number).isRequired,
    setCustomKeywords: PropTypes.func.isRequired
};
