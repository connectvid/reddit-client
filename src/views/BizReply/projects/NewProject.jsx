import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import React from 'react';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { addProject, projectCreatedStatus, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { KEYWORD_PATH } from 'config';

const NewProject = ({ urlPlaceholder = 'Domain (ex: domain.com)' }) => {
    const { createLoading, projectCreated, project } = useSelector((state) => state.project);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [values, setValues] = React.useState({
        brandName: '',
        domain: '',
        shortDescription: ''
    });
    const { getAccessToken, dbUser } = useAuth();
    React.useEffect(() => {
        if (projectCreated && pathname !== KEYWORD_PATH) {
            projectCreatedStatus(false)();
            navigate(`${KEYWORD_PATH}?dp=${project._id}`);
        }
    }, [projectCreated]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.brandName || !values?.domain || !values?.shortDescription) {
            toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'error' });
            return;
        }
        let domainValue = values.domain;
        if (!domainValue.startsWith('https://')) {
            domainValue = `https://${domainValue}`;
        }

        try {
            const body = {
                brandName: values.brandName,
                domain: domainValue,
                shortDescription: values.shortDescription,
                userId: dbUser._id
            };

            console.log(body, values);

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
                    inputProps={{ minLength: 3, maxLength: 40 }}
                />

                <TextField
                    fullWidth
                    name="domain"
                    label={`${urlPlaceholder}`}
                    onChange={handleChange}
                    placeholder={`${urlPlaceholder}`}
                    type="text"
                    inputProps={{ minLength: 5, maxLength: 253 }}
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
                        inputProps={{ minLength: 5, maxLength: 500 }}
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

export default NewProject;
