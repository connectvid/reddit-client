import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';

const ColorPicker = () => {
    const [color, setColor] = useState('#0A0626');

    const handleColorChange = (event) => {
        setColor(event.target.value);
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
                Choose report header colour
            </Typography>

            <TextField
                variant="outlined"
                value={color}
                onChange={handleColorChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            {/* <input
                                type="color"
                                value={color}
                                onChange={handleColorChange}
                                style={{
                                    border: 'none',
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    padding: 0,
                                    background: 'transparent',
                                    borderRadius: '50%'
                                }}
                            /> */}
                            <input
                                style={{ height: '24px', width: '24px', borderRadius: '50%', background: color, border: 'none' }}
                                type="color"
                                id="colorPicker"
                                value={color}
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
