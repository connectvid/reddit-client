import { TextField, FormControl, Typography, Box } from '@mui/material';

const BRForm = ({ values, handleChange, urlPlaceholder }) => {
    return (
        <Box sx={{ width: '545px' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                Brand Name
            </Typography>
            <TextField
                sx={{
                    mb: 4,
                    height: '48px',
                    borderRadius: '10px',
                    color: 'black',
                    width: '100%'
                }}
                fullWidth
                name="brandName"
                value={values.brandName}
                onChange={handleChange}
                placeholder="Brand name"
                type="text"
                inputProps={{ minLength: 3, maxLength: 40 }}
            />
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                Domain
            </Typography>
            <TextField
                sx={{
                    mb: 4,
                    height: '48px',
                    width: '100%'
                }}
                fullWidth
                name="domain"
                value={values.domain}
                onChange={handleChange}
                placeholder={urlPlaceholder}
                type="text"
                inputProps={{ minLength: 5, maxLength: 253 }}
            />
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                Description
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                    name="shortDescription"
                    fullWidth
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
