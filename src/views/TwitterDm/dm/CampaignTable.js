/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { IconEye, IconTrash } from '@tabler/icons';
import TwitterDMConfig from 'TwitterDMConfig';

import useAuth from 'hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'utils/axios';

const CampaignTable = ({ campaigns, setCampaigns }) => {
    const BASE_URL = TwitterDMConfig.getNodeUrl();
    const { getAccessToken, dbUser } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const deleteCampaign = async (id) => {
        toast('We are working on this feature!', { autoClose: 2500, type: 'warning' });
    };

    const getCampaigns = async () => {
        try {
            setLoading(!loading);
            const token = await getAccessToken();
            const response = await axios.get(`campaign/${dbUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCampaigns(response?.data?.campaigns || []);
        } catch (e) {
            const status = e?.response?.status || 500;
            let message = `Something Went Wrong!`;
            if (status < 500) {
                message = e?.response?.data?.message || e.message;
            }
            toast.error(message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getCampaigns();
    }, []);
    return (
        <DataGrid
            sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
            autoHeight
            rows={campaigns || []}
            loading={loading}
            columns={[
                {
                    field: 'name',
                    minWidth: 200,
                    headerName: 'Name',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'message',
                    flex: 0.5,
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'Message',
                    minWidth: 200,
                    sortable: false
                },
                {
                    field: 'status',
                    minWidth: 200,
                    headerName: 'Status',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'actions',
                    flex: 0.5,
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'Actions',
                    maxWidth: 200,
                    sortable: false,
                    renderCell: ({ row }) => (
                        <Box sx={{ textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            {/* 
                            <Link onClick={() => handleEditCampaign(row)}>
                                <IconSettings />
                            </Link> */}
                            {/* <div style={{ cursor: 'pointer' }} onClick={() => showWorkingPopup(row._id)}>
                                <IconEye />
                            </div> */}
                            <div style={{ cursor: 'pointer' }} onClick={() => deleteCampaign(row._id)}>
                                <IconTrash />
                            </div>
                            <Link to={`/dm/${row._id}`} style={{}}>
                                <IconEye />
                            </Link>
                        </Box>
                    )
                }
            ]}
            getRowId={({ _id }) => _id}
        />
    );
};

export default CampaignTable;
