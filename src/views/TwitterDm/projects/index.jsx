/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
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
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { addProject, getProjects, toggleProjectCreateModalCtrl } from 'features/project/projectActions';

const Projects = () => {
    const { getAccessToken, dbUser } = useAuth();
    const [open, setOpen] = React.useState(false);
    const { projects } = useSelector((state) => state.project);
    // const handleClose = () => {
    //     setOpen((p) => !p);
    // };
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = await getAccessToken();
                getProjects(dbUser._id, token)();
            } catch (e) {
                console.log(e);
            }
        };
        // fetchProjects();
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
                        onClick={toggleProjectCreateModalCtrl()}
                        variant="outlined"
                        style={{ background: DEFAULT_BUTTON_COLOR_CODE, color: '#fff' }}
                    >
                        Add Project
                    </Button>
                </CardContent>
            </Card>
            <ProjectsTable {...{ projects }} />

            {/* setProjects */}
            {/* <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <NewProject {...{ handleClose }} />
            </Dialog> */}
        </>
    );
};

export default Projects;

// export const NewProject = ({ handleClose, urlPlaceholder = 'Domain (ex: domain.com)' }) => {
//     const { createLoading } = useSelector((state) => state.project);
//     const [values, setValues] = React.useState({
//         brandName: '',
//         domain: '',
//         shortDescription: ''
//     });
//     const { getAccessToken, dbUser } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!values.brandName || !values?.domain || !values?.shortDescription) {
//             toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'error' });
//             return;
//         }

//         try {
//             const body = {
//                 brandName: values.brandName,
//                 domain: values.domain,
//                 shortDescription: values.shortDescription,
//                 userId: dbUser._id
//             };

//             // console.log(body, values);

//             const token = await getAccessToken();
//             addProject(token, body)();
//             // toast.success(`Project has been added Successfully!`);
//             // handleClose();
//         } catch (e) {
//             // const status = e?.response?.status || 500;
//             const message = `Something Went Wrong!`;
//             // if (status < 500) {
//             //     message = e?.response?.data?.message || e.message;
//             // }
//             toast.error(message);
//             console.log(e);
//         }
//     };
//     const handleChange = ({ target: { name, value } }) => {
//         setValues((p) => ({ ...p, [name]: value }));
//     };

//     const isSubmitDisabled = !values.brandName || !values.domain || !values.shortDescription;

//     return (
//         <form onSubmit={handleSubmit}>
//             <DialogTitle id="alert-dialog-title">Add Project</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     sx={{ mb: 2, mt: 2 }}
//                     fullWidth
//                     label="Brand Name"
//                     name="brandName"
//                     onChange={handleChange}
//                     placeholder="Enter brand name"
//                     type="text"
//                 />
//                 <TextField
//                     fullWidth
//                     name="domain"
//                     label={`${urlPlaceholder}`}
//                     onChange={handleChange}
//                     placeholder={`${urlPlaceholder}`}
//                     type="text"
//                 />
//                 <FormControl fullWidth sx={{ mt: 2 }}>
//                     <TextField
//                         name="shortDescription"
//                         fullWidth
//                         label="Short Description"
//                         multiline
//                         rows={4}
//                         placeholder="Enter A short description of your project"
//                         onChange={handleChange}
//                     />
//                 </FormControl>
//             </DialogContent>
//             <DialogActions>
//                 <Button
//                     disabled={createLoading}
//                     onClick={() => {
//                         if (!createLoading) handleClose();
//                     }}
//                 >
//                     Cancel
//                 </Button>
//                 <Button disabled={createLoading || isSubmitDisabled} variant="contained" type="submit">
//                     Submit {createLoading && <CircularProgress sx={{ ml: 1, height: `24px !important`, width: `24px !important` }} />}
//                 </Button>
//             </DialogActions>
//         </form>
//     );
// };
