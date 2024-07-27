/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import ProjectsTable from './ProjectsTable';
import project, { getProducts } from 'features/project/project';
import { useSelector } from 'react-redux';

const Projects = () => {
    const { getAccessToken, dbUser } = useAuth();
    const [open, setOpen] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);
    const [pro, setProjects] = React.useState(null);
    const { loading, projects } = useSelector((state) => state.project);
    const handleClose = () => {
        setOpen((p) => !p);
    };
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = await getAccessToken();
                getProducts(dbUser._id, token)();
            } catch (e) {
                console.log(e);
            }
        };
        fetchProjects();
    }, []);

    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography variant="h2" style={{ marginRight: 'auto' }}>
                            Add Project
                        </Typography>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        variant="outlined"
                        style={{ background: DEFAULT_BUTTON_COLOR_CODE, color: '#fff' }}
                    >
                        Add Project
                    </Button>
                </CardContent>
            </Card>
            <ProjectsTable {...{ projects, setProjects }} />
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <NewProject {...{ setProjects, handleClose }} />
            </Dialog>
        </>
    );
};

export default Projects;

export const NewProject = ({ setProjects, handleClose, urlPlaceholder = 'Domain (ex: domain.com)' }) => {
    const [values, setValues] = React.useState({
        brandName: '',
        domain: '',
        shortDescription: ''
    });
    const [loading, setLoading] = React.useState(false);
    const { getAccessToken, dbUser } = useAuth();

    const handleSubmit = async (e) => {
        const token = await getAccessToken();
        e.preventDefault();
        if (!values.brandName) {
            toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'error' });
            return;
        }

        const body = {
            brandName: values.brandName,
            domain: values.domain,
            shortDescription: values.shortDescription,
            userId: dbUser._id
        };

        // console.log(body, values);

        try {
            setLoading(true);
            const {
                data: { item }
            } = await axios.post(`projects`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects((p) => [...p, item]);
            toast.success(`Project has been added Successfully!`);
            handleClose();
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
                    disabled={loading}
                    onClick={() => {
                        if (!loading) handleClose();
                    }}
                >
                    Cancel
                </Button>
                <Button disabled={loading || isSubmitDisabled} variant="contained" type="submit">
                    Submit {loading && <CircularProgress sx={{ ml: 1, height: `24px !important`, width: `24px !important` }} />}
                </Button>
            </DialogActions>
        </form>
    );
};
