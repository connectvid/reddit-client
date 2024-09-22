import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { borderRadius, Box } from '@mui/system';
import filterIcon from '../../../../assets/images/svgIcons/reports/filter.svg';
import searchIcon from '../../../../assets/images/svgIcons/reports/search.svg';
import gridViewIcon from '../../../../assets/images/svgIcons/reports/gridView.svg';
import listViewIcon from '../../../../assets/images/svgIcons/reports/listView.svg';

const SearchBar = ({ setShowComponent, projects, setFilteredProjectes }) => {
    const [searchInput, setSearchInput] = useState('');
    let timeoutId;
    const handleChangeSearchInput = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        // Clear the previous timeout
        clearTimeout(timeoutId);

        // Set a new timeout
        timeoutId = setTimeout(() => {
            console.log(1234, 'executing search');
            const filtered = projects.filter((project) => project.projectName.toLowerCase().includes(value.toLowerCase()));
            setFilteredProjectes(filtered);
        }, 1000);
    };

    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                margin: '0 auto' // Center the container horizontally
            }}
        >
            {/* Search and Filter Section */}
            <div style={{ display: 'flex', flex: 1, maxWidth: '50%', gap: '10px' }}>
                {/* Search Field */}
                <TextField
                    variant="outlined"
                    placeholder="Search reports"
                    size="small"
                    fullWidth
                    value={searchInput}
                    onChange={handleChangeSearchInput}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {/* <SearchIcon /> */}
                                <img src={searchIcon} alt="searchIcon" style={{ width: '20px' }} />
                            </InputAdornment>
                        ),
                        style: { borderRadius: '25px', borderColor: '#CCD3D9' }
                    }}
                />

                {/* Filter Button */}
                <Button
                    variant="outlined"
                    startIcon={<img style={{ width: '20px' }} src={filterIcon} alt="text" />}
                    size="small"
                    sx={{
                        borderRadius: '5px',
                        border: '1px solid #CCD3D9',
                        padding: '0 20px',
                        color: '#6E7478'
                    }}
                >
                    Filter
                </Button>
            </div>

            {/* View Mode Icons Section */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                    maxWidth: '100px',
                    gap: '5px',
                    border: '1px solid #CCD3D9',
                    textAlign: 'center',
                    borderRadius: '5px'
                }}
            >
                <IconButton onClick={() => setShowComponent('gridView')}>
                    <img style={{ background: '#F5F6FA', padding: '5px', borderRadius: '3px' }} src={gridViewIcon} alt="grid" />
                </IconButton>
                <IconButton onClick={() => setShowComponent('tableView')}>
                    {/* <ViewListIcon /> */}
                    <img style={{ background: '#F5F6FA', padding: '5px', borderRadius: '3px' }} src={listViewIcon} alt="list" />
                </IconButton>
            </div>
        </Box>
    );
};

export default SearchBar;
