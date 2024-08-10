import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
// import ProjectsTable from './ProjectsTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    addingCustomKeywordForSave,
    addingKeywordForSave,
    removingKeywordForSave,
    removingCustomKeywordForSave,
    createKeywordsApi
} from 'features/project/projectActions';
import { IconPlus, IconTrash } from 'tabler-icons';
// import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { MENTION_PATH } from 'config';
// import axios from 'utils/axios';
// import { createKeywords, hasError } from 'features/project/projectSlice';

const AddKeyword = () => {
    const { getAccessToken } = useAuth();
    // const { search } = useLocation();
    const {
        project,
        suggestedKeywords,
        updateLoading,
        createKeywordsLoading,
        customKeywords: cKeys
    } = useSelector((state) => state.project);
    const [customKeywords, setCustomKeywords] = React.useState([]);
    // const [createKeywordsLoading, setCreateKeywordsLoading] = React.useState(false);

    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(() => {
        // if (createKeywordSuccess) {
        //     createdKeywordSuccess(false)();
        //     navigate(`${MENTION_PATH}${search}`);
        // }

        return () => setCustomKeywords([]);
    }, []); // createKeywordSuccess

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
                                my: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: { sm: '50%', xs: '100%' }
                            }}
                            key={i}
                            component="h5"
                        >
                            <Typography component="span">{keyword}</Typography>
                            <Typography component="span" onClick={() => removingKeywordForSave(keyword)()}>
                                <IconTrash size={14} />
                            </Typography>
                        </Typography>
                    ))}
                </Box>
                <AddCustomKeyword {...{ updateLoading, customKeywords, setCustomKeywords, createKeywordsLoading, defaultValues: cKeys }} />
                <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: '15px' }}
                    disabled={
                        (!suggestedKeywords?.length && !Object.values(cKeys || {})?.filter?.((item) => item.trim())?.length) ||
                        createKeywordsLoading
                    }
                    onClick={async () => {
                        const token = await getAccessToken();
                        // setCreateKeywordsLoading(false);
                        const body = {
                            projectId: project._id,
                            suggestedKeywords: [
                                ...suggestedKeywords.filter((item) => item.trim()),
                                ...Object.values(cKeys).filter((item) => item.trim())
                            ]
                        };
                        createKeywordsApi(token, body)();
                    }}
                >
                    Save {(createKeywordsLoading && <CircularProgress sx={{ maxWidth: 16, maxHeight: 16, ml: 1 }} />) || ''}
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
                                // addingKeywordForSave(keyword)();
                                const len = customKeywords?.length;
                                addingCustomKeywordForSave(keyword, len)();
                                setCustomKeywords((p) => [...p, p.length]);
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

const AddCustomKeyword = ({ createKeywordsLoading, customKeywords, setCustomKeywords, defaultValues = {} }) => {
    return (
        <Box>
            {customKeywords.map((item) => (
                <Box key={item} sx={{ display: { sm: 'flex' }, alignItems: 'center', mb: 1, gap: 1 }}>
                    <TextField
                        name={item.toString()}
                        defaultValue={defaultValues[item]}
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
                        disabled={createKeywordsLoading}
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
                disabled={createKeywordsLoading}
                onClick={() => setCustomKeywords((p) => [...p, p.length])}
            >
                Add New Keyword
            </Button>
        </Box>
    );
};

AddCustomKeyword.propTypes = {
    createKeywordsLoading: PropTypes.bool,
    customKeywords: PropTypes.arrayOf(PropTypes.number).isRequired,
    setCustomKeywords: PropTypes.func.isRequired
};
