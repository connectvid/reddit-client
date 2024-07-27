/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { IconEye } from '@tabler/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function ScrapTable({ data, isLoading, Action }) {
    return (
        <DataGrid
            sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
            autoHeight
            rows={data}
            loading={isLoading}
            columns={[
                {
                    field: 'scrapeReference',
                    minWidth: 200,
                    headerName: 'Name',
                    sortable: false
                },
                {
                    field: 'importType',
                    minWidth: 120,
                    headerName: 'Type',
                    sortable: false
                },
                {
                    field: 'totalScraped',
                    minWidth: 120,
                    align: 'center',
                    headerName: 'Total Scraped',
                    sortable: false
                },
                // { ...column },
                {
                    field: 'foundEmailCount',
                    minWidth: 120,
                    align: 'center',
                    headerName: 'Found Email',
                    sortable: false
                },

                {
                    field: 'status',
                    headerName: 'Status',
                    flex: 1,
                    minWidth: 180,
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'Action',
                    flex: Action ? 0.5 : 0.4,
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'Action',
                    minWidth: 300,
                    sortable: false,
                    renderCell: ({ row }) => (
                        <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                            <Link to={`/single-campaign/${row._id}/${row.importType}`} style={{ display: 'flex', alignItems: 'center' }}>
                                <IconEye />
                            </Link>
                            {Action && <Action {...{ id: row._id, status: row.status, keye: 'key' }} />}
                        </Box>
                    )
                },
                {
                    field: 'createdAt',
                    flex: 1,
                    headerName: 'Date',
                    valueGetter: ({ row }) => moment(row.createdAt).format('YYYY-MM-DD, HH:mm'),
                    minWidth: 180
                }
            ]}
            getRowId={({ _id }) => _id}
        />
    );
}
