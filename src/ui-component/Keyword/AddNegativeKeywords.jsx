/* eslint-disable consistent-return */
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
// import ProjectsTable from './ProjectsTable';
import { IconX } from '@tabler/icons';
import BRInput from 'ui-component/bizreply/BRInput';
// import { toast } from 'react-toastify';

export default function ({
    negativeKeywords,
    handleNegativeKeyword //, handleNegativeKeywordExistChecker
}) {
    const [value, setValue] = React.useState('');
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Add Negative Keywords</Typography>
                </Box>

                <BRInput
                    fullWidth
                    type="text"
                    onChange={({ target: { value = '' } }) => {
                        setValue(value);
                    }}
                    value={value}
                    placeholder="Enter Negative keyword"
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
                        // mt: 1,
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
                        // if (handleNegativeKeywordExistChecker(value)) {
                        //     toast.warn(`The requested negative keyword exists in keywords!`)
                        //     return;
                        // }

                        handleNegativeKeyword(value);
                        setValue('');
                    }}
                >
                    Add Negative keyword
                </Button>
            </Box>
            <Divider sx={{ borderColor: '#CCD3D9', my: 1 }} />
            <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>Selected Negative Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 2 }}>
                {negativeKeywords?.map?.((keyword, i) => (
                    <Typography
                        onClick={() => {
                            handleNegativeKeyword(keyword);
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
}
