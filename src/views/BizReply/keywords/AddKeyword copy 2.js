import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import {
    addingCustomKeywordForSave,
    removingKeywordForSave,
    removingCustomKeywordForSave,
    createKeywordsApi
} from 'features/project/projectActions';
import { IconPlus, IconTrash } from 'tabler-icons';
import PropTypes from 'prop-types';
import { LiaTimesCircle } from 'react-icons/lia';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import GradinentText from 'ui-component/GradinentText';
import { fontSize, fontWeight } from '@mui/system';
// import { useLocation, useNavigate } from 'react-router-dom';
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
        <Box sx={{ border: '1px solid #ddd', borderRadius: '12px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '54px',
                    alignItems: 'center',
                    background: '#F1F1F1',
                    px: '20px',
                    borderRadius: '12px 12px 0 0'
                }}
            >
                <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Create a new keyword</Typography>
                <Typography>
                    <LiaTimesCircle color="#fff" size={13.33} />
                </Typography>
            </Box>
            <Box
                sx={{
                    p: '20px'
                }}
            >
                <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>AI Suggested Keywords</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, py: 2 }}>
                    {project?.keywords?.map((keyword, i) => (
                        <Typography
                            onClick={() => {
                                const len = customKeywords?.length;
                                addingCustomKeywordForSave(keyword, len)();
                                setCustomKeywords((p) => [...p, p.length]);
                            }}
                            sx={{
                                cursor: 'pointer',
                                px: '14px',
                                border: '1px solid #2A53E5',
                                borderRadius: '38px',
                                color: '#2A53E5',
                                display: 'flex',
                                alignItems: 'center',
                                height: '33px',
                                fontSize: '14px',
                                fontWeight: 400
                            }}
                            key={i}
                            component="h5"
                        >
                            <IconPlus size={16} /> {keyword}
                        </Typography>
                    ))}
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Add Keywords</Typography>
                        <GradinentText sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconPlus size={16} color="#0C22E5" />
                            <Typography
                                sx={{ fontWeight: 500, fontSize: '14px', cursor: 'pointer' }}
                                onClick={() => setCustomKeywords((p) => [...p, p.length])}
                            >
                                Add new keywords
                            </Typography>
                        </GradinentText>
                    </Box>
                    {customKeywords.map((item) => (
                        <Box key={item} sx={{ display: { sm: 'flex' }, alignItems: 'center', mt: 2, gap: 1 }}>
                            <BRInput2
                                fullWidth
                                name={item.toString()}
                                defaultValue={cKeys[item]}
                                type="text"
                                onChange={({ target: { value = '' } }) => addingCustomKeywordForSave(value, item)()}
                                placeholder="Enter keyword"
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    color: '#6E7478'
                                }}
                            />

                            {/* <Button
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
                            </Button> */}
                        </Box>
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
