import { TextField, Typography, Box } from '@mui/material';

const BRInput = ({ label, value = '', handleChange, placeholder, type, disabled = false, sx = {}, fullWidth = true, ...rest }) => {
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
                    mb: 1.5,
                    height: '50px',
                    borderRadius: '10px',
                    color: 'black',
                    width: '100%',
                    overflow: 'hidden',
                    input: { pt: '10px', fontSize: '16px', fontWeight: 400 },
                    fieldset: { height: '50px', borderRadius: '10px' },
                    ...sx
                }}
                fullWidth={fullWidth}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                placeholder={placeholder || 'Brand name'}
                type={type || 'text'}
                inputProps={{ minLength: 3, maxLength: 40 }}
                {...rest}
            />
        </Box>
    );
};

export default BRInput;