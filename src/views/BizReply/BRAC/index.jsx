import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';

export default function ({ placeholder, wrapperSx = {}, sx = {}, textFieldSx = {}, title, ...rest }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                // justifyContent: 'center',
                border: '1px solid #CCD3D9 !important',
                borderRadius: '8px',
                background: '#fff',
                ...wrapperSx
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pl: 1.5 }}>
                <Typography sx={{ color: '#BFBFBF', fontSize: '14px', fontWeight: 400, width: '100%' }}>
                    {title} <span style={{ marginLeft: '5px' }}>|</span>{' '}
                </Typography>
            </Box>

            <Autocomplete
                popupIcon={<IconChevronDown size={20} />}
                sx={{
                    background: 'transparent',
                    '.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot':
                        { background: 'transparent', px: '0px!important' },
                    px: '0px!important',
                    width: '100%',
                    ...sx,
                    fontSize: '12px !important'
                }}
                {...rest}
                renderInput={(params) => (
                    <TextField
                        fullWidth
                        {...params}
                        sx={{
                            height: '40px',
                            px: '0px!important',
                            input: {
                                px: '0px!important',
                                py: `1px!important`,
                                background: 'transparent',
                                fontSize: '14px !important'
                            },
                            fieldset: {
                                // borderRadius: '10px',
                                // borderColor: '#CCD3D9 !important'
                                border: 'none',
                                background: 'transparent'
                            },
                            ...textFieldSx
                        }}
                        placeholder={placeholder}
                    />
                )}

                // options={options}
                // options={[{ title: 'All Keywords' }, ...keywords]}

                // defaultValue={keywords[0]}
                // getOptionLabel={(item) => item.title}
                // onChange={(_, v) => {
                //     const title = v || { title: 'All Keywords' };
                //     setSelectedKeyword(title);
                // }}
            />
        </Box>
    );
}