/* eslint-disable jsx-a11y/alt-text */
// import { useTheme } from '@mui/material/styles';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconChevronDown } from '@tabler/icons';
import { setSingleProjectSelect } from 'features/project/projectActions';
import { useLocation, useNavigate } from 'react-router-dom';

const AllProjects = ({ projectListWidth = '210px' }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {
        project: { projects, project }
    } = useSelector((state) => state);
    const options = projects?.map?.(({ brandName: label, _id }) => ({ label, _id }));

    return (
        <>
            {options?.length ? (
                <Autocomplete
                    id="all_project_select_breadcrubm_area"
                    defaultValue={{ label: project?.brandName, _id: project?._id }}
                    options={options || []}
                    fullWidth
                    sx={{ width: projectListWidth }}
                    // getOptionLabel={(item) => item.brandName}
                    popupIcon={<IconChevronDown size={20} />}
                    onChange={(_, data) => {
                        const id = data?._id;
                        if (id) {
                            setSingleProjectSelect(id)();
                            navigate(`${pathname}?dp=${id}`);
                        }
                        console.log(data);
                        return data;
                    }}
                    renderInput={(params) => (
                        <TextField
                            fullWidth
                            {...params}
                            sx={{
                                height: '40px',
                                input: {
                                    px: '20px!important',
                                    py: `1px!important`
                                },
                                fieldset: {
                                    borderRadius: '10px',
                                    borderColor: '#CCD3D9 !important'
                                }
                            }}
                            placeholder="Project"
                        />
                    )}
                    disableClearable
                />
            ) : (
                ''
            )}
            {/* <FormControl
                sx={{
                    width: 180,
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
                    {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select> </FormControl>*/}
        </>
    );
};

export default AllProjects;
