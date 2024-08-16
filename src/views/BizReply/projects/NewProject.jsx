import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from 'hooks/useAuth';
import { addProject, projectCreatedStatus } from 'features/project/projectActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { KEYWORD_PATH } from 'config';
import BRForm from 'ui-component/bizreply/BRForm';

const NewProject = ({ urlPlaceholder = 'ex: facebook.com' }) => {
    const { projectCreated, project } = useSelector((state) => state.project);
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
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    // const isSubmitDisabled = !values.brandName || !values.domain || !values.shortDescription;

    return (
        <form onSubmit={handleSubmit}>
            {/* <DialogTitle
                id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold', // Make the text bold
                    fontSize: '1.5rem', // Increase the font size
                    background: 'rgba(241, 241, 241, 1)', // Set background color
                    padding: '16px' // Optional: Add some padding for better spacing
                }}
            >
                Add Project
                <IconButton onClick={() => toggleProjectCreateModalCtrl()()}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle> */}

            {/* <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
                <Stepper alternativeLabel>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={() => step.icon}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <span>{step.label}</span>
                                </Box>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box> */}

            {/* <Modal open={isModalOpen}> */}
            <BRForm {...{ values, handleChange, urlPlaceholder }} />
            {/* </Modal> */}

            {/* <DialogActions sx={{ justifyContent: 'end' }}>
                <BRButton
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        width: '184px',
                        height: '45px',
                        borderRadius: '10px',
                        background: 'linear-gradient(90deg, #007BFF, #0056b3)'
                    }}
                >
                    Next Step {createLoading && <CircularProgress sx={{ ml: 1, height: `24px !important`, width: `24px !important` }} />}
                </BRButton>
            </DialogActions> */}
        </form>
    );
};

export default NewProject;
