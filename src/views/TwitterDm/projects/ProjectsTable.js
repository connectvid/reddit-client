/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { IconTrash } from '@tabler/icons';
// import TwitterDMConfig from 'TwitterDMConfig';

import useAuth from 'hooks/useAuth';
import React from 'react';
import { toast } from 'react-toastify';
import axios from 'utils/axios';

const ProjectTable = ({ setProjects, projects = [] }) => {
    // const BASE_URL = TwitterDMConfig.getNodeUrl();
    const { getAccessToken, dbUser } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const deleteProject = async (id) => {
        const token = await getAccessToken();
        axios
            .delete(`projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                toast('Project deleted successfully!', { autoClose: 2500, type: 'success' });
                const filteredData = projects.filter((data) => data._id !== id);
                setProjects(filteredData);
            })
            .catch(async (e) => {
                console.log(e);
                toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
            });
    };

    const getAccounts = async () => {
        try {
            setLoading(!loading);
            const token = await getAccessToken();
            const {
                data: { items = [] }
            } = await axios.get(`accounts/${dbUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(items);
            setProjects(items);
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
        getAccounts();
    }, []);
    return (
        <DataGrid
            sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
            autoHeight
            rows={projects || []}
            loading={loading}
            columns={[
                {
                    field: 'brandName',
                    minWidth: 200,
                    headerName: 'Brand Name',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'domain',
                    minWidth: 200,
                    headerName: 'Domain',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'shortDescription',
                    minWidth: 200,
                    headerName: 'Short Description',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                // {
                //     field: 'status',
                //     flex: 0.5,
                //     align: 'center',
                //     headerAlign: 'center',
                //     headerName: 'Status',
                //     minWidth: 200,
                //     sortable: false
                // },
                {
                    field: 'actions',
                    flex: 0.5,
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'Actions',
                    minWidth: 200,
                    sortable: false,
                    renderCell: ({ row }) => (
                        <Box sx={{ textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            {/* <Link to={`/campaigns/${row._id}`} style={{}}>
                                <IconEye />
                            </Link>
                            <Link onClick={() => handleEditCampaign(row)}>
                                <IconSettings />
                            </Link> */}
                            {/* <div style={{ cursor: 'pointer' }} onClick={() => showWorkingPopup(row._id)}>
                                <IconEye />
                            </div> */}
                            <div style={{ cursor: 'pointer' }} onClick={() => deleteProject(row._id)}>
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

export default ProjectTable;
