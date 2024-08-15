/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import BRButton from 'ui-component/bizreply/BRButton';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, Select, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

const BRProjectSelection = ({ toggleProjectCreateModalCtrl }) => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <Box style={{ marginBottom: 10, marginTop: '-20px' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h2" style={{ marginRight: 'auto' }}>
                        Projects
                    </Typography>
                </Box>
                <Box style={{ display: 'flex', gap: '10px' }}>
                    <Box>
                        <Box>
                            <FormControl
                                sx={{
                                    m: 1,
                                    width: 180,
                                    mt: 3,
                                    border: '1px solid #ccd3d9',
                                    borderRadius: '10px',
                                    height: '43px',
                                    padding: '0px !important',
                                    '& .MuiSelect-select': {
                                        padding: '0 0 0 10px'
                                    }
                                }}
                            >
                                <Select
                                    multiple
                                    displayEmpty
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                        }

                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ height: '43px', padding: '0px !important' }}
                                >
                                    <MenuItem sx={{ padding: '0px', height: '10px' }} disabled value="">
                                        <em>Placeholder</em>
                                    </MenuItem>
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <BRButton
                        sx={{ height: '40px', marginTop: '25px', width: '180px' }}
                        variant="contained"
                        onClick={toggleProjectCreateModalCtrl()}
                    >
                        Add Project
                    </BRButton>
                </Box>
            </Box>
        </Box>
    );
};

export default BRProjectSelection;
