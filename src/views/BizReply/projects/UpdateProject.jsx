import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import React from 'react';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateProjectAPI, projectCreatedStatus, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { KEYWORD_PATH } from 'config';

const UpdateProject = ({ urlPlaceholder = 'Domain (ex: domain.com)', brandName, domain, shortDescription }) => {
    const { updateProjectLoading, projectCreated, project } = useSelector((state) => state.project);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [values, setValues] = React.useState({
        // brandName: '',
        // domain: '',
        shortDescription
    });
    const { getAccessToken, dbUser } = useAuth();
    React.useEffect(() => {
        if (projectCreated && pathname !== KEYWORD_PATH) {
            projectCreatedStatus(false)();
            // navigate(`${KEYWORD_PATH}?dp=${project._id}`);
        }
    }, [projectCreated]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.brandName || !values?.domain || !values?.shortDescription) {
            toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'warning' });
            return;
        }
        let domainValue = values.domain;
        if (!domainValue.startsWith('https://')) {
            domainValue = `https://${domainValue}`;
        }

        try {
            const body = {
                // brandName: values.brandName,
                // domain: domainValue,
                shortDescription: values.shortDescription,
                userId: dbUser._id
            };

            console.log(body, values);

            const token = await getAccessToken();
            updateProjectAPI(token, body)();
        } catch (e) {
            const message = e.message;
            toast.warning('Failed to update the project. Please try again later.');
            console.log(e);
        }
    };
    const handleChange = ({ target: { name, value } }) => {
        setValues((p) => ({ ...p, [name]: value }));
    };

    const isSubmitDisabled = !values.brandName || !values.domain || !values.shortDescription;

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">Update Project</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ mb: 2, mt: 2 }}
                    fullWidth
                    label="Brand Name"
                    name="brandName"
                    // onChange={handleChange}
                    placeholder="Enter brand name"
                    type="text"
                    value={brandName}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    fullWidth
                    name="domain"
                    label={`${urlPlaceholder}`}
                    // onChange={handleChange}
                    placeholder={`${urlPlaceholder}`}
                    value={domain || ''}
                    type="text"
                    InputProps={{ readOnly: true }}
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
                    disabled={updateProjectLoading}
                    onClick={() => {
                        // if (!updateProjectLoading) toggleProjectCreateModalCtrl()();
                    }}
                >
                    Cancel
                </Button>
                <Button disabled={updateProjectLoading || isSubmitDisabled} variant="contained" type="submit">
                    Update{' '}
                    {updateProjectLoading && <CircularProgress sx={{ ml: 1, height: `24px !important`, width: `24px !important` }} />}
                </Button>
            </DialogActions>
        </form>
    );
};

export default UpdateProject;
