/* eslint-disable consistent-return */
import { Box, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';
// import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { IconPlus } from 'tabler-icons';
import BRInput from 'ui-component/bizreply/BRInput';
import GradinentText from 'ui-component/GradinentText';
import { IconX } from '@tabler/icons';
import { toast } from 'react-toastify';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { MENTION_PATH } from 'config';
// import axios from 'utils/axios';
// import { createKeywords, hasError } from 'features/project/projectSlice';

const AddKeyword = ({ suggestedKeywords, addedKeywords, setAddedKeywords }) => {
    const {
        subscription: { subscription }
    } = useSelector((state) => state);
    const [value, setValue] = useState('');
    const remainingCredit = subscription?.remainingCredit;
    const selectKeyword = (keyword) => {
        if (!addedKeywords.includes(keyword)) {
            setAddedKeywords([...addedKeywords, keyword]);
            // console.log(`${keyword} added`);
        } else {
            toast('Keyword already exists. Please choose a different one.', { autoClose: 2500, type: 'warning' });
        }
    };
    const removeFromAddedKeyword = (keyword) => {
        setAddedKeywords(addedKeywords.filter((item) => item !== keyword));
    };

    return (
        <>
            <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>AI Suggested Keywords</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pt: 1, pb: 2 }}>
                    {suggestedKeywords?.map((keyword, i) => (
                        <Typography
                            onClick={() => {
                                const newKeywrodLen = addedKeywords.length;
                                // console.log(remainingCredit?.keywords - newKeywrodLen, remainingCredit?.keywords, newKeywrodLen);
                                if (!remainingCredit?.keywords || remainingCredit?.keywords - newKeywrodLen < 1) {
                                    toast.warning(`Keyword limit is over!`);
                                    return;
                                }
                                selectKeyword(keyword);
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
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
                    <BRInput
                        fullWidth
                        type="text"
                        onChange={({ target: { value = '' } }) => {
                            setValue(value);
                        }}
                        value={value}
                        placeholder="Enter keyword"
                        sx={{
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#6E7478'
                        }}
                    />
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            background: '#000',
                            color: '#fff',
                            mt: 1,
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
                            const newKeywrodLen = addedKeywords?.length;
                            console.log(remainingCredit?.keywords - newKeywrodLen, remainingCredit?.keywords, newKeywrodLen);
                            if (!remainingCredit?.keywords || remainingCredit?.keywords - newKeywrodLen < 1) {
                                toast.warning(`Keyword limit is over`);
                                return;
                            }
                            if (remainingCredit?.keywords && remainingCredit?.keywords > 0) {
                                // const k = Date.now();
                                // addingCustomKeywordForSave(value, k)();
                                setValue('');
                                selectKeyword(value);
                            }
                        }}
                    >
                        Add keyword
                    </Button>
                </Box>
                <Divider sx={{ borderColor: '#CCD3D9', my: 2 }} />
                <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>Selected Keywords</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pt: 0.5, pb: 1 }}>
                    {addedKeywords?.map((keyword, i) => (
                        <Typography
                            onClick={() => {
                                removeFromAddedKeyword(keyword);
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
