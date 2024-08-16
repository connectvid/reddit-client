import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import {
    addingCustomKeywordForSave,
    removingCustomKeywordForSave,
    clearingCustomKeyword,
    createdKeywordSuccess
} from 'features/project/projectActions';
import { IconPlus } from 'tabler-icons';
import BRInput2 from 'ui-component/bizreply3/BRInput2';
import GradinentText from 'ui-component/GradinentText';
import { IconX } from '@tabler/icons';
import { toast } from 'react-toastify';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { MENTION_PATH } from 'config';
// import axios from 'utils/axios';
// import { createKeywords, hasError } from 'features/project/projectSlice';

const AddKeyword = ({ handleClose }) => {
    // const { search } = useLocation();
    const {
        project: { project, customKeywords: cKeys, createKeywordSuccess },
        subscription: { subscription }
    } = useSelector((state) => state);
    const [value, setValue] = React.useState('');
    const remainingCredit = subscription?.remainingCredit;
    const onClose = () => {
        clearingCustomKeyword()();
        setValue('');
        handleClose?.();
    };
    useEffect(() => {
        return () => {
            onClose();
        };
    }, []);
    useEffect(() => {
        if (createKeywordSuccess) {
            createdKeywordSuccess(false)();
            onClose();
            // navigate(`${MENTION_PATH}${search}`);
        }
    }, [createKeywordSuccess]); // createKeywordSuccess

    return (
        <>
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
                                const newKeywrodLen = Object.values(cKeys || {})?.length;
                                console.log(remainingCredit?.keywords - newKeywrodLen, remainingCredit?.keywords, newKeywrodLen);
                                if (!remainingCredit?.keywords || remainingCredit?.keywords - newKeywrodLen < 1) {
                                    toast.error(`Keyword limit is over!`);
                                    return;
                                }
                                const k = Date.now();
                                addingCustomKeywordForSave(keyword, k)();
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pt: 2 }}>
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
            </Box>
        </>
    );
};

export default AddKeyword;
