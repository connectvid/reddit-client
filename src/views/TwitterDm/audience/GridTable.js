/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { DataGrid } from '@mui/x-data-grid';

// import useAuth from 'hooks/useAuth';
import React from 'react';

const GridTable = ({ items = [], columns = [], sx = {}, ID = 'id', ...rest }) => {
    // const { getAccessToken } = useAuth();
    const [loading, setLoading] = React.useState(false);

    return (
        <DataGrid
            sx={{ minHeight: { md: '70vh', sm: '50vh' }, ...sx }}
            autoHeight
            rows={items || []}
            loading={loading}
            columns={columns}
            getRowId={(d) => d[ID]}
            {...rest}
        />
    );
};

export default GridTable;
