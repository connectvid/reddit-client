/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import useAuth from 'hooks/useAuth';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import ShowLeads from './ShowLeads';

const ListsPage = () => {
    const { getAccessToken, dbUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [lists, setLists] = useState([]);

    const getLeads = async () => {
        try {
            setLoading(!loading);
            const token = await getAccessToken();
            const data = await axios.get(`list/${dbUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data.data.lists);
            setLists(data.data.lists);
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

    useEffect(() => {
        getLeads();
    }, []);
    return (
        <>
            <ShowLeads lists={lists} setLists={setLists} loading={loading} />
        </>
    );
};

export default ListsPage;
