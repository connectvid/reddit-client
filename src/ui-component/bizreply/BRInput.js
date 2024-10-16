import { TextField, Typography, Box } from '@mui/material';

const BRInput = ({
    label,
    value = '',
    handleChange,
    type = 'text',
    disabled = false,
    sx = {},
    wrapperSx = {},
    fullWidth = true,
    ...rest
}) => {
    return (
        <Box sx={{ width: '100%', wrapperSx }}>
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
                fullWidth={fullWidth}
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
                disabled={disabled}
                value={value}
                onChange={handleChange}
                type={type}
                // inputProps={{ minLength: 3, maxLength: 40 }}
                {...rest}
            />
        </Box>
    );
};

export default BRInput;
