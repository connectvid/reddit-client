/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { FormControl, TextField, Select, MenuItem, Button, Box, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';
import CampaignBasicInfo from './CampaignBasicInfo';
import CampaignSettings from './CampaignSettings';
import MessageTemplates from './MessageTemplates';

const CreateNewCampaign = () => {
    const { getAccessToken, dbUser } = useAuth();
    const [selectedList, setSelectedList] = useState('');
    const [selectedInstagramAccount, setSelectedInstagramAccount] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const handleCreateCampaign = async (e) => {
        e.preventDefault();
        if (!selectedList || !message || !name || !selectedInstagramAccount) {
            toast.error('Please select a list, provide a message, and enter campaign name.');
            return;
        }

        const body = {
            name,
            message,
            status: 'processing',
            listId: selectedList,
            userId: dbUser._id,
            instagramAccountId: selectedInstagramAccount
        };
        console.log(body);

        // const token = await getAccessToken();
        // axios
        //     .post(`campaign`, body, {
        //         headers: { Authorization: `Bearer ${token}` }
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         toast.success('Your campaign has been started, please check your inbox.');
        //         setName('');
        //         setMessage('');
        //         setSelectedList('');
        //         setSelectedInstagramAccount('');
        //     })
        //     .catch(async (e) => {
        //         console.log(e);
        //         toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
        //     });
    };

    const [intros, setIntros] = useState([]);
    const [bodies, setBodies] = useState([]);
    const [outros, setOutros] = useState([]);

    // const inputFields = [
    //     {
    //         title: `Intors`,
    //         name: `intros`,
    //         fields: [
    //             {
    //                 defaultValue: `Hey there,`
    //             },
    //             {
    //                 defaultValue: `Hello (user.firstname),`
    //             },
    //             {
    //                 defaultValue: `Hi{user.firstname),`
    //             },
    //             {
    //                 defaultValue: `Good day (user.firstname),`
    //             }
    //         ]
    //     },
    //     {
    //         title: `Bodies`,
    //         name: `bodies`,
    //         fields: [
    //             {
    //                 defaultValue: `this is an automated cold outreach message sent with AutolGDM.`
    //             },
    //             {
    //                 defaultValue: `did you know that this messages was automatically created & sent to you with`
    //             },
    //             {
    //                 defaultValue: `this is an Al generated message to inform you about our new tool.`
    //             }
    //         ]
    //     },
    //     {
    //         title: `Outros`,
    //         name: `outros`,
    //         fields: [
    //             {
    //                 defaultValue: `Try it out yourself, just go to AutoIGDM.com`
    //             },
    //             {
    //                 defaultValue: `It's free to use and you can try it yourself on AutoIGDM.com`
    //             }
    //         ]
    //     }
    // ];

    return (
        <>
            <CampaignBasicInfo
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                selectedInstagramAccount={selectedInstagramAccount}
                setSelectedInstagramAccount={setSelectedInstagramAccount}
                message={message}
                setMessage={setMessage}
                name={name}
                setName={setName}
                handleCreateCampaign={handleCreateCampaign}
            />
            <MessageTemplates
                intros={intros}
                setIntros={setIntros}
                bodies={bodies}
                setBodies={setBodies}
                outros={outros}
                setOutros={setOutros}
            />
            <CampaignSettings />
            <Button
                onClick={handleCreateCampaign}
                type="submit"
                variant="contained"
                color="primary"
                style={{ float: 'right', marginTop: '50px', marginBottom: '100px' }}
            >
                Create Campaign
            </Button>
        </>
    );
};

export default CreateNewCampaign;
