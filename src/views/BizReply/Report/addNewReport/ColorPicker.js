/* eslint-disable react/button-has-type */
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import React from 'react';

const ColorPicker = ({ values, handleChange }) => {
    // const [color, setColor] = useState('#0A0626');
    const colorRef = React.useRef();
    const handleColorChange = (event) => {
        // setColor(event.target.value);
        handleChange({ target: { name: 'reportColor', value: event.target.value } });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '50%',
                marginTop: '10px'
                // margin: '0 auto'
            }}
        >
            <Typography variant="subtitle2" sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                Choose Report Header Color
            </Typography>

            <TextField
                variant="outlined"
                value={values.reportColor}
                onChange={handleColorChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            position="start"
                            onClick={() => {
                                colorRef.current.click();
                            }}
                            sx={{
                                width: '26px',
                                height: '23px',
                                borderRadius: '50%',
                                background: values.reportColor,
                                m: 0,
                                cursor: 'pointer'
                            }}
                        >
                            <input
                                ref={colorRef}
                                style={{
                                    height: 0,
                                    width: 0,
                                    zIndex: -1
                                }}
                                type="color"
                                id="colorPicker"
                                value={values.reportColor}
                                onChange={handleColorChange}
                            />
                        </InputAdornment>
                    )
                }}
                sx={{
                    input: {
                        paddingLeft: '8px'
                    }
                }}
            />
        </Box>
    );
};

export default ColorPicker;
