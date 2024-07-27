/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { IconTrash } from '@tabler/icons';

import useAuth from 'hooks/useAuth';
import React from 'react';
import { toast } from 'react-toastify';
import axios from 'utils/axios';

const ProxyTable = ({ proxies, setProxies }) => {
    const { getAccessToken, dbUser } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const deleteProxy = async (id) => {
        const token = await getAccessToken();
        axios
            .delete(`proxy/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                toast('Proxy deleted successfully!', { autoClose: 2500, type: 'success' });
                const filteredData = proxies.filter((data) => data._id !== id);
                setProxies(filteredData);
            })
            .catch(async (e) => {
                console.log(e);
                toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
            });
    };

    const getProxies = async () => {
        try {
            setLoading(!loading);
            const token = await getAccessToken();
            const response = await axios.get(`proxy/${dbUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProxies(response?.data?.proxies || []);
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
        getProxies();
    }, []);
    return (
        <DataGrid
            sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
            autoHeight
            rows={proxies || []}
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
                    field: 'proxy',
                    flex: 1,
                    headerName: 'Proxy',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'actions',
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'Actions',
                    sortable: false,
                    renderCell: ({ row }) => (
                        <Box sx={{ textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            <div style={{ cursor: 'pointer' }} onClick={() => deleteProxy(row._id)}>
                                <IconTrash />
                            </div>
                        </Box>
                    )
                }
            ]}
            getRowId={({ _id }) => _id}
        />
    );
};

export default ProxyTable;
