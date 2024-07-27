/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { IconTrash, IconEye, IconEdit } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import EditList from './EditList';

const ShowLeads = ({ lists, setLists, loading }) => {
    const { getAccessToken } = useAuth();
    const [showEditList, setShowEditList] = useState(false);
    const [listToEdit, setListToEdit] = useState(null);

    const editList = (list) => {
        setListToEdit(list);
        setShowEditList(true);
    };

    const deleteList = async (listId) => {
        const token = await getAccessToken();
        axios
            .delete(`list/${listId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                toast('List deleted successfully!', { autoClose: 2500, type: 'success' });
                const filteredData = lists.filter((data) => data._id !== listId);
                setLists(filteredData);
            })
            .catch(async (e) => {
                console.log(e);
                toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
            });
    };

    return (
        <>
            <DataGrid
                sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
                autoHeight
                rows={lists || []}
                loading={loading}
                columns={[
                    {
                        field: 'name',
                        minWidth: 200,
                        headerName: 'List name',
                        align: 'center',
                        headerAlign: 'center',
                        sortable: false
                    },
                    {
                        field: 'description',
                        flex: 0.5,
                        align: 'center',
                        headerAlign: 'center',
                        headerName: 'Description',
                        minWidth: 200,
                        sortable: false,
                        renderCell: ({ row }) => (
                            <Box sx={{ textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                {row.description ? <>{row.description}</> : <>N/A</>}
                            </Box>
                        )
                    },
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
                                <div style={{ cursor: 'pointer' }} onClick={() => deleteList(row._id)}>
                                    <IconTrash />
                                </div>
                                <div style={{ cursor: 'pointer' }}>
                                    <Link to={`/list/${row._id}`} style={{}}>
                                        <IconEye />
                                    </Link>
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={() => editList(row)}>
                                    <IconEdit />
                                </div>
                            </Box>
                        )
                    }
                ]}
                getRowId={({ _id }) => _id}
            />
            <EditList
                setLists={setLists}
                showEditList={showEditList}
                setShowEditList={setShowEditList}
                listToEdit={listToEdit}
                setListToEdit={setListToEdit}
            />
        </>
    );
};

export default ShowLeads;
