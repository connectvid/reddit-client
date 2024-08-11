import { Box, Card, CardContent, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
import AddKeyword from './AddKeyword';

const AddNewKeyword = () => {
    // const { project, projects } = useSelector((state) => state.project);

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
