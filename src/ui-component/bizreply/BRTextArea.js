import { Typography, Box } from '@mui/material';

const BRTextArea = ({
    label,
    value = '',
    handleChange,
    disabled = false,
    sx = {},
    rows = 4, // Default number of rows
    ...rest
}) => {
    return (
        <Box sx={{ width: '100%' }}>
            {label && (
                <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
                >
                    {label}
                </Typography>
            )}
            <textarea
                value={value}
                onChange={handleChange}
                disabled={disabled}
                rows={rows}
                style={{
                    width: '100%',
                    height: 'auto',
                    padding: '10px',
                    borderRadius: '10px',
                    border: '2px solid #2583D8',
                    fontSize: '16px',
                    fontWeight: 400,
                    resize: 'vertical', // Allow vertical resizing only
                    ...sx // Apply additional styles passed via props
                }}
                {...rest}
            />
        </Box>
    );
};

export default BRTextArea;
