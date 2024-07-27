/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
// material-ui
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { IconArrowUpRight } from '@tabler/icons';
import propTyps from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SingleScrapWithEmail = ({ data, loading }) => {
    return (
        <Box>
            <DataGrid
                sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
                loading={loading}
                autoHeight
                rows={data}
                columns={[
                    {
                        field: 'name',
                        minWidth: 200,
                        headerName: 'Name'
                    },
                    {
                        field: 'username',
                        minWidth: 200,
                        headerName: 'Username',
                        renderCell: ({ row }) => (
                            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                {row.username}
                                <a
                                    style={{ display: 'flex', alignItems: 'center' }}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`https://twitter.com/${row.username}`}
                                >
                                    <IconArrowUpRight />
                                </a>
                            </Typography>
                        )
                    },
                    {
                        field: 'bio',
                        // flex: 10,
                        minWidth: 650,
                        headerName: 'Bio'
                    },
                    {
                        field: 'email',
                        headerName: 'Email',
                        minWidth: 300
                    }
                ]}
                getRowId={({ username }) => username}
                pageSize={100}
            />
        </Box>
    );
};
SingleScrapWithEmail.prototype = {
    loading: propTyps.bool.isRequired,
    data: propTyps.arrayOf(propTyps.object)
}
export default SingleScrapWithEmail;
