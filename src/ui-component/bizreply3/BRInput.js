import { TextField, Typography, Box } from '@mui/material';

const BRInput = ({ label, value = '', handleChange, placeholder, type }) => {
    return (
        <Box sx={{ width: '100%' }}>
            {' '}
            {/* Set the width of the form */}
            {(label && (
                <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
                >
                    {label}
                </Typography>
            )) ||
                ''}
            <TextField
                sx={{
                    mb: 2,
                    height: '48px',
                    borderRadius: '10px',
                    color: 'black',
                    width: '100%'
                }}
                fullWidth
                value={value}
                onChange={handleChange}
                placeholder={placeholder || 'Brand name'}
                type={type || 'text'}
                inputProps={{ minLength: 3, maxLength: 40 }}
            />
        </Box>
    );
};

export default BRInput;