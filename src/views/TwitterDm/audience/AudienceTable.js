/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { DataGrid } from '@mui/x-data-grid';

const AudienceTable = ({ filteredLeads, setLeadIDs }) => {
    // const { getAccessToken } = useAuth();
    // const [loading, setLoading] = React.useState(false);
    // const deleteAccount = async (id) => {};

    return (
        <DataGrid
            sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
            autoHeight
            rows={filteredLeads || []}
            // loading={loading}
            checkboxSelection
            onSelectionModelChange={(ids) => setLeadIDs?.(ids)}
            columns={[
                {
                    field: 'pk',
                    minWidth: 200,
                    headerName: 'pk',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'username',
                    minWidth: 200,
                    headerName: 'username',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'full_name',
                    minWidth: 200,
                    headerName: 'full_name',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'is_private',
                    minWidth: 200,
                    headerName: 'is_private',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'is_verified',
                    minWidth: 200,
                    headerName: 'is_verified',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'profile_pic_url',
                    flex: 0.5,
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'profile_pic_url',
                    minWidth: 200,
                    sortable: false
                }
            ]}
            getRowId={({ pk_id }) => pk_id}
        />
    );
};

export default AudienceTable;
