/* eslint-disable consistent-return */
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { createdKeywordSuccess, createKeywordsApi } from 'features/project/projectActions';
import AddNegativeKeywords from 'ui-component/Keyword/AddNegativeKeywords';
import AddKeyword from 'ui-component/bizreply/steps/AddKeyword';
import { LiaTimesCircle } from 'react-icons/lia';
import BRButton from 'ui-component/bizreply/BRButton';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';

export default function ({ modalClose }) {
    const { getAccessToken } = useAuth();
    const {
        project: { project, createKeywordSuccess, createKeywordsLoading }
        // subscription: { subscription }
    } = useSelector((state) => state);
    const [suggestedKeywords, setSuggestedKeywords] = React.useState([]);
    const [addedKeywords, setAddedKeywords] = React.useState([]);
    React.useEffect(() => {
        if (project?.keywords) {
            setSuggestedKeywords(project?.keywords);
        }
    }, []);

    const [negativeKeywords, setNegativeKeywords] = React.useState([]);

    const handleNegativeKeyword = (keyword) => {
        if (negativeKeywords.includes(keyword)) {
            setNegativeKeywords((p) => p.filter((item) => item !== keyword));
        } else {
            setNegativeKeywords((p) => [...p, keyword]);
        }
    };

    const commonClonse = () => {
        setSuggestedKeywords([]);
        setAddedKeywords([]);
        setNegativeKeywords([]);
    };
    const onClose = () => {
        commonClonse();
        modalClose?.();
    };
    useEffect(() => {
        return commonClonse;
    }, []);
    useEffect(() => {
        if (createKeywordSuccess) {
            createdKeywordSuccess(false)();
            onClose();
        }
    }, [createKeywordSuccess]); // createKeywordSuccess

    return (
        <>
            <Box
                sx={{
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    m: 0,
                    p: 0
                }}
            >
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
                    <Typography onClick={modalClose} sx={{ cursor: 'pointer' }}>
                        <LiaTimesCircle color="#000" size={24} />
                    </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                    <AddKeyword {...{ suggestedKeywords, addedKeywords, setAddedKeywords }} />
                    <AddNegativeKeywords {...{ negativeKeywords, handleNegativeKeyword }} />
                    <Typography sx={{ display: 'flex', gap: '10px', justifyContent: 'end', mt: 2 }}>
                        <Button onClick={modalClose} sx={{ width: '156px', background: '#EAEAEA' }}>
                            Cancel
                        </Button>
                        <BRButton
                            onClick={async () => {
                                if (!addedKeywords.length && !negativeKeywords.length) {
                                    toast.warn('Please add some keywords or negative keywords!');
                                    return;
                                }
                                if (createKeywordsLoading) {
                                    return;
                                }
                                // console.log(customKeywords, customNegativeKeywords);
                                // return 0;
                                const token = await getAccessToken();
                                const body = {
                                    projectId: project._id,
                                    suggestedKeywords: addedKeywords,
                                    negativeKeywords
                                };
                                createKeywordsApi(token, body)();
                            }}
                            variant="contained"
                            sx={{ fontSize: '14px', fontWeight: 500, width: '196px' }}
                        >
                            Save Keyword {(createKeywordsLoading && <CircularProgress sx={{ maxWidth: 16, maxHeight: 16, ml: 1 }} />) || ''}
                        </BRButton>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
