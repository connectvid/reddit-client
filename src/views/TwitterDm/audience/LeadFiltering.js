/* eslint-disable one-var */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */

import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import React from 'react';

const LeadFiltering = ({ haveLeads, leads, setFilterLeads }) => {
    const [filterObj, setFilterObj] = React.useState({});
    // console.log(filterObj);
    // React.useEffect(() => {
    //     // const IS_FILTERED = Object.values(filterObj || {})?.filter((d) => d?.toString?.().length);
    //     // setFilterLeads(Boolean(IS_FILTERED));
    //     console.log(filterObj, 'changeing');
    // }, [Object.values(filterObj || {})?.filter((d) => d?.toString?.()?.length)]);
    const handleFilter = () => {
        if (!leads?.length) {
            return [];
        }
        let dataFilter = leads || [];
        if (filterObj.full_name) {
            dataFilter = dataFilter.filter((d) => d.full_name?.toLowerCase?.()?.includes?.(filterObj.full_name?.toLowerCase?.()));
        }
        const YES_VERIFIED = filterObj.is_verified === true,
            NO_VERIFIED = filterObj.is_verified === false,
            YES_PRIVATE = filterObj.is_private === true,
            NO_PRIVATE = filterObj.is_private === false;

        if (YES_VERIFIED || NO_VERIFIED)
            dataFilter = dataFilter.filter((d) => {
                const allow = YES_VERIFIED === true ? YES_VERIFIED : false;
                console.log({ allow, YES_VERIFIED, NO_VERIFIED });
                return d.is_verified === allow;
            });
        if (YES_PRIVATE || NO_PRIVATE)
            dataFilter = dataFilter.filter((d) => {
                const allow = YES_PRIVATE === true ? YES_PRIVATE : false;
                console.log({ allow, YES_PRIVATE, NO_PRIVATE });
                return d.is_private === allow;
            });
        // return dataFilter;
        setFilterLeads(dataFilter);
    };
    const handleChange = ({ value, name }) => {
        setFilterObj((p) => {
            const d = { ...p, [name]: value };
            console.log(Object.values(d || {}), 'change');
            return d;
        });
    };

    return (
        <Box sx={{ display: { lg: 'flex' }, gap: 1, mt: 3 }}>
            <Box sx={{ width: `100%`, display: { md: `flex` }, gap: 1 }}>
                <TextField
                    fullWidth
                    name="full_name"
                    onChange={({ target: { name, value = '' } }) => handleChange({ name, value })}
                    placeholder="Full Name..."
                />
                <Box
                    sx={{
                        width: `100%`,
                        display: `flex`,
                        alignItems: `center`,
                        border: `1px solid rgba(0,0,0,0.3)`,
                        borderRadius: '5px',
                        mt: { md: 0, sm: 2, xs: 1 }
                    }}
                >
                    <Typography sx={{ minWidth: { md: `50%`, sm: '50%', xs: '50%' }, pl: 2 }}>Is Private</Typography>
                    <FormGroup sx={{ display: `flex`, width: `100%`, flexDirection: `row` }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="is_private"
                                    checked={filterObj?.is_private === true}
                                    onChange={({ target: { name, checked } }) => handleChange({ name, value: checked || '' })}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="is_private"
                                    checked={filterObj?.is_private === false}
                                    onChange={({ target: { name, checked } }) => handleChange({ name, value: checked ? !checked : '' })}
                                />
                            }
                            label="No"
                        />
                    </FormGroup>
                </Box>
            </Box>
            <Box sx={{ width: `100%`, display: { md: `flex` }, gap: 1, mt: { sm: 2, md: 2, lg: 0, xs: 1 } }}>
                <Box
                    sx={{
                        width: `100%`,
                        display: `flex`,
                        alignItems: `center`,
                        border: `1px solid rgba(0,0,0,0.3)`,
                        borderRadius: '5px'
                    }}
                >
                    <Typography sx={{ minWidth: { md: `50%`, sm: '50%', xs: '50%' }, pl: 2 }}>Is Verified</Typography>
                    <FormGroup sx={{ display: `flex`, width: `100%`, flexDirection: `row` }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="is_verified"
                                    checked={filterObj?.is_verified === true}
                                    onChange={({ target: { name, checked } }) => handleChange({ name, value: checked || '' })}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="is_verified"
                                    checked={filterObj?.is_verified === false}
                                    onChange={({ target: { name, checked } }) => handleChange({ name, value: checked ? !checked : '' })}
                                />
                            }
                            label="No"
                        />
                    </FormGroup>
                </Box>
                <Button
                    sx={{ px: 0, mt: { md: 0, sm: 2, xs: 1 } }}
                    fullWidth
                    variant="contained"
                    disabled={!haveLeads}
                    onClick={handleFilter}
                >
                    Filter
                </Button>
            </Box>
        </Box>
    );
};

export default LeadFiltering;
