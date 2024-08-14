import { TextField, FormControl, Typography, Box } from '@mui/material';

const BRForm = ({ values, handleChange, urlPlaceholder }) => {
    return (
        <Box sx={{ width: '545px' }}>
            {' '}
            {/* Set the width of the form */}
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
            >
                Brand Name
            </Typography>
            <TextField
                sx={{
                    mb: 4,
                    height: '48px',
                    borderRadius: '10px',
                    color: 'black',
                    width: '100%' // Ensure the TextField takes the full width
                }}
                fullWidth
                // label="Brand Name"
                // name="brandName"
                value={values.brandName}
                onChange={handleChange}
                placeholder="Brand name"
                type="text"
                inputProps={{ minLength: 3, maxLength: 40 }}
            />
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
            >
                Domain
            </Typography>
            <TextField
                sx={{
                    mb: 4,
                    height: '48px',
                    width: '100%' // Ensure the TextField takes the full width
                }}
                fullWidth
                // name="domain"
                // label="Domain"
                value={values.domain}
                onChange={handleChange}
                placeholder={urlPlaceholder}
                type="text"
                inputProps={{ minLength: 5, maxLength: 253 }}
            />
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
            >
                Description
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                    // name="shortDescription"
                    fullWidth
                    // label="Description"
                    value={values.shortDescription}
                    multiline
                    rows={4}
                    placeholder="Write a description"
                    onChange={handleChange}
                    inputProps={{ minLength: 5, maxLength: 500 }}
                />
                <Typography variant="caption" sx={{ mt: 1, color: 'black' }}>
                    Please write the description in detail.
                </Typography>
            </FormControl>
        </Box>
    );
};

export default BRForm;
