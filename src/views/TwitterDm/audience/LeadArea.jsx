import React from 'react';
import LeadsTable from './AudienceTable';
import { toast } from 'react-toastify';
import { Box, Button, Dialog, Typography } from '@mui/material';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';
import CreateLead from './CreateLead';

const LeadArea = ({ setFilterLeads, filteredLeads }) => {
    const { getAccessToken } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [leadIDs, setLeadIDs] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [createLeadBasic, setCreateLeadBasic] = React.useState(null);

    const handleClose = () => {
        setCreateLeadBasic({});
        setOpen((p) => !p);
    };

    const filderedDataUpload = async (e) => {
        e.preventDefault();
        // console.log(createLeadBasic);
        const token = await getAccessToken();
        try {
            const leadFiltering = filteredLeads.filter((lead) => leadIDs.includes(lead.pk_id));
            // console.log({ leads, leadFiltering, leadIDs });
            const body = { ...createLeadBasic, leads: leadFiltering };
            if (!leadFiltering?.length) return;
            setLoading(true);

            const data = await axios.post(`list`, body, {
                // } = await axios.post(`audiences/lead-upload`, searchObj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log({ data });
            handleClose?.([]);
            toast.success(`Successfully lead uploaded!`);
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

    const handleChange = ({ target: { name, value } }) => {
        setCreateLeadBasic((p) => ({ ...p, [name]: value }));
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: `flex`, justifyContent: `space-between`, alignItems: 'center', mb: 2 }}>
                <Typography variant="h2">Leads data: </Typography>
                <Button
                    variant="outlined"
                    disabled={loading || !leadIDs?.length}
                    onClick={() => {
                        if (loading) return;
                        handleClose();
                    }}
                >
                    Save Filtered Data
                </Button>
            </Box>
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <CreateLead {...{ handleClose, handleChange, handleSubmit: filderedDataUpload, loading }} />
            </Dialog>
            <LeadsTable {...{ setLeadIDs, setFilterLeads, filteredLeads }} />
        </Box>
    );
};
export default LeadArea;
