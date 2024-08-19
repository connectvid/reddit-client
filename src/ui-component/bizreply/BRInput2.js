import { TextField, Typography, Box } from '@mui/material';

const BRInput2 = ({ label, labelSx = {}, sx = {}, ...rest }) => {
    return (
        <Box sx={{ width: '100%' }}>
            {(label && <Typography sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 700, ...labelSx }}>{label}</Typography>) ||
                ''}
            <TextField
                sx={{
                    height: '48px',
                    borderRadius: '10px',
                    ...sx
                }}
                {...rest}
            />
        </Box>
    );
};

export default BRInput2;
