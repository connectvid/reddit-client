import { Autocomplete, Box, TextField } from '@mui/material';

const PostFilter = ({ keywords, label = 'Choose Your Keyword', setSelectedKeyword, loading }) => {
    return (
        <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            {(!loading && keywords?.length && (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={keywords}
                    sx={{
                        py: 0
                    }}
                    // defaultValue={keywords[0]}
                    fullWidth
                    getOptionLabel={(item) => item.title}
                    onChange={(_, v) => {
                        const title = v || { title: 'All' };
                        setSelectedKeyword(title);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            sx={
                                {
                                    // '.MuiOutlinedInput-root': { py: '0 !important' },
                                    // py: '0 !important',
                                    // label: {
                                    //     mt: '-9px',
                                    //     '&:focus': {
                                    //         mt: 0
                                    //     }
                                    // },
                                    // input: {
                                    //     py: 0
                                    // },
                                    // fieldset: {
                                    //     py: 0
                                    // }
                                }
                            }
                        />
                    )}
                />
            )) ||
                ''}
        </Box>
    );
};
export default PostFilter;
