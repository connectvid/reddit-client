import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import {
    addingCustomKeywordForSave,
    removingCustomKeywordForSave,
    createKeywordsApi,
    clearingCustomKeyword,
    createdKeywordSuccess
} from 'features/project/projectActions';
import { IconPlus } from 'tabler-icons';
import { LiaTimesCircle } from 'react-icons/lia';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import GradinentText from 'ui-component/GradinentText';
import { IconX } from '@tabler/icons';
import { toast } from 'react-toastify';
import BRButton from 'ui-component/bizreply/BRButton';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { MENTION_PATH } from 'config';
// import axios from 'utils/axios';
// import { createKeywords, hasError } from 'features/project/projectSlice';

const AddKeyword = ({ handleClose }) => {
    const { getAccessToken } = useAuth();
    // const { search } = useLocation();
    const {
        project: { project, createKeywordsLoading, customKeywords: cKeys, createKeywordSuccess },
        subscription: { subscription }
    } = useSelector((state) => state);
    // const [customKeywords, setCustomKeywords] = React.useState([]);
    const [value, setValue] = React.useState('');
    // const [createKeywordsLoading, setCreateKeywordsLoading] = React.useState(false);
    const remainingCredit = subscription?.remainingCredit;
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    console.log(remainingCredit);
    const onClose = () => {
        clearingCustomKeyword()();
        // setCustomKeywords([]);
        setValue('');
        handleClose?.();
    };
    useEffect(() => {
        // if (createKeywordSuccess) {
        //     createdKeywordSuccess(false)();
        //     navigate(`${MENTION_PATH}${search}`);
        // }

        return () => {
            onClose();
        };
    }, []); // createKeywordSuccess
    useEffect(() => {
        if (createKeywordSuccess) {
            createdKeywordSuccess(false)();
            onClose();
            // navigate(`${MENTION_PATH}${search}`);
        }
    }, [createKeywordSuccess]); // createKeywordSuccess

    return (
        <Box sx={{ border: '1px solid #ddd', borderRadius: '12px', m: 0, p: 0 }}>
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
                <Typography onClick={onClose}>
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
                                setValue(keyword);
                                // const len = customKeywords?.length;
                                // addingCustomKeywordForSave(keyword, len)();
                                // setCustomKeywords((p) => [...p, p.length]);
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1.5 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Add Keywords</Typography>
                        <GradinentText sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconPlus size={16} color="#0C22E5" />
                            <Typography
                                sx={{ fontWeight: 500, fontSize: '14px', cursor: 'pointer' }}
                                // onClick={() => setCustomKeywords((p) => [...p, p.length])}
                            >
                                Add new keywords
                            </Typography>
                        </GradinentText>
                    </Box>
                    <BRInput2
                        fullWidth
                        // name={item.toString()}
                        // defaultValue={cKeys[item]}
                        type="text"
                        onChange={({ target: { value = '' } }) => {
                            setValue(value);
                        }}
                        value={value}
                        placeholder="Enter keyword"
                        sx={{
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#6E7478',
                            boxShadow: '0px 1px 2px 0px #DEE3E8'
                        }}
                    />
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            background: '#000',
                            color: '#fff',
                            mt: 2,
                            fontSize: '12px',
                            fontWeight: 500,
                            height: '36px',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onClick={() => {
                            if (!value) return;
                            const newKeywrodLen = Object.values(cKeys || {})?.length;
                            console.log(remainingCredit?.keywords - newKeywrodLen, remainingCredit?.keywords, newKeywrodLen);
                            if (!remainingCredit?.keywords || remainingCredit?.keywords - newKeywrodLen < 1) {
                                toast.error(`Keyword limit is over`);
                                return;
                            }
                            if (remainingCredit?.keywords && remainingCredit?.keywords > 0) {
                                const k = Date.now();
                                // setCustomKeywords((p) => [...p, k]);
                                addingCustomKeywordForSave(value, k)();
                                setValue('');
                            }
                        }}
                    >
                        Add keyword
                    </Button>
                </Box>
                <Divider sx={{ borderColor: '#CCD3D9', my: 3 }} />
                <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>Selected Keywords</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, py: 2 }}>
                    {Object.entries(cKeys || {})?.map(([k, keyword], i) => (
                        <Typography
                            onClick={() => {
                                removingCustomKeywordForSave(k)();
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
                            <IconX size={16} /> {keyword}
                        </Typography>
                    ))}
                </Box>

                <Typography sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
                    <Button onClick={onClose} sx={{ width: '156px', background: '#EAEAEA' }}>
                        Cancle
                    </Button>
                    <BRButton
                        disabled={!Object.values(cKeys || {})?.filter?.((item) => item.trim())?.length || createKeywordsLoading}
                        onClick={async () => {
                            const token = await getAccessToken();
                            // setCreateKeywordsLoading(false);
                            const body = {
                                projectId: project._id,
                                suggestedKeywords: [...Object.values(cKeys).filter((item) => item.trim())]
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
    );
};

export default AddKeyword;
