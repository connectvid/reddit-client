import { Box, Card, CardContent, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
import AddKeyword from './AddKeyword';
import React from 'react';
import { MENTION_PATH } from 'config';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createdKeywordSuccess } from 'features/project/projectActions';

const AddNewKeyword = () => {
    const { createKeywordSuccess } = useSelector((state) => state.project);
    const { search } = useLocation();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (createKeywordSuccess) {
            navigate(`${MENTION_PATH}${search}`, { state: { socket: true } });
            createdKeywordSuccess(false)();
        }
    }, [createKeywordSuccess]);
    console.log({ createKeywordSuccess });

    return (
        <>
            <Card sx={{ mb: 5, minHeight: '75vh' }}>
                <CardContent style={{}}>
                    <Box mb={4}>
                        <Typography
                            variant="h2"
                            style={{
                                marginRight: 'auto'
                            }}
                        >
                            Keywords
                        </Typography>
                    </Box>
                    <AddKeyword />
                </CardContent>
            </Card>
        </>
    );
};

export default AddNewKeyword;
