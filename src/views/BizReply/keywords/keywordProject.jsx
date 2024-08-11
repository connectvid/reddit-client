/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import React from 'react';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { addProject, toggleProjectCreateModalCtrl } from 'features/project/projectActions';

const KeywordProject = ({ handleClose, urlPlaceholder = 'Domain (ex: domain.com)' }) => {
    const { createLoading } = useSelector((state) => state.project);
    const [values, setValues] = React.useState({
        brandName: '',
        domain: '',
        shortDescription: ''
    });
    const { getAccessToken, dbUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.brandName || !values?.domain || !values?.shortDescription) {
            toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'error' });
            return;
        }

        try {
            const body = {
                brandName: values.brandName,
                domain: values.domain,
                shortDescription: values.shortDescription,
                userId: dbUser._id
            };

            // console.log(body, values);

            const token = await getAccessToken();
            addProject(token, body)();
        } catch (e) {
            const message = e.message;
            toast.error(message);
            console.log(e);
        }
    };
    const handleChange = ({ target: { name, value } }) => {
        setValues((p) => ({ ...p, [name]: value }));
    };

    const isSubmitDisabled = !values.brandName || !values.domain || !values.shortDescription;

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">Add Project</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ mb: 2, mt: 2 }}
                    fullWidth
                    label="Brand Name"
                    name="brandName"
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    type="text"
                />
                <TextField
                    fullWidth
                    name="domain"
                    label={`${urlPlaceholder}`}
                    onChange={handleChange}
                    placeholder={`${urlPlaceholder}`}
                    type="text"
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                        name="shortDescription"
                        fullWidth
                        label="Short Description"
                        multiline
                        rows={4}
                        placeholder="Enter A short description of your project"
                        onChange={handleChange}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={createLoading}
                    onClick={() => {
                        if (!createLoading) toggleProjectCreateModalCtrl()();
                    }}
                >
                    Cancel
                </Button>
                <Button disabled={createLoading || isSubmitDisabled} variant="contained" type="submit">
                    Submit {createLoading && <CircularProgress sx={{ ml: 1, height: `24px !important`, width: `24px !important` }} />}
                </Button>
            </DialogActions>
        </form>
    );
};

export default KeywordProject;
