/* eslint-disable consistent-return */
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
// import ProjectsTable from './ProjectsTable';
import { addingNegativeCustomKeywordForSave, removingNegativeCustomKeywordForSave } from 'features/project/projectActions';
import { IconPlus } from 'tabler-icons';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import GradinentText from 'ui-component/GradinentText';
import { IconX } from '@tabler/icons';

const AddNegativeKeywords = ({ nCKeys }) => {
    const [value, setValue] = React.useState('');
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Add Negative Keywords</Typography>
                    <GradinentText sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconPlus size={16} color="#0C22E5" />
                        <Typography
                            sx={{ fontWeight: 500, fontSize: '14px', cursor: 'pointer' }}
                            // onClick={() => setCustomKeywords((p) => [...p, p.length])}
                        >
                            Add new negative keywords
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
                    placeholder="Enter Negative keyword"
                    sx={{
                        fontSize: '16px',
                        fontWeight: 500,
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
                        const k = Date.now();
                        addingNegativeCustomKeywordForSave(value, k)();
                        setValue('');
                    }}
                >
                    Add Negative keyword
                </Button>
            </Box>
            <Divider sx={{ borderColor: '#CCD3D9', my: 3 }} />
            <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>Selected Negative Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pt: 2 }}>
                {Object.entries(nCKeys || {})?.map(([k, keyword], i) => (
                    <Typography
                        onClick={() => {
                            removingNegativeCustomKeywordForSave(k)();
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
                            fontWeight: 500
                        }}
                        key={i}
                        component="h5"
                    >
                        <IconX size={16} /> {keyword}
                    </Typography>
                ))}
            </Box>
        </>
    );
};

export default AddNegativeKeywords;
