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

    // React.useEffect(() => {
    //     if (projectCreated && pathname !== KEYWORD_PATH) {
    //         projectCreatedStatus(false)();
    //         navigate(`${KEYWORD_PATH}?dp=${project._id}`);
    //     }
    // }, [projectCreated]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!values.brandName || !values?.domain || !values?.shortDescription) {
    //         toast('Please Enter Project Name, domain and short description', { autoClose: 2500, type: 'error' });
    //         return;
    //     }
    //     let domainValue = values.domain;
    //     if (!domainValue.startsWith('https://')) {
    //         domainValue = `https://${domainValue}`;
    //     }

    //     try {
    //         const body = {
    //             brandName: values.brandName,
    //             domain: domainValue,
    //             shortDescription: values.shortDescription,
    //             userId: dbUser._id
    //         };

    //         console.log(body, values);

    //         const token = await getAccessToken();
    //         addProject(token, body)();
    //     } catch (e) {
    //         const message = e.message;
    //         toast.error(message);
    //         console.log(e);
    //     }
    // };

    // const handleChange = ({ target: { name, value } }) => {
    //     setValues((prev) => ({ ...prev, [name]: value }));
    // };

    // const isSubmitDisabled = !values.brandName || !values.domain || !values.shortDescription;

    return <BRForm />;
};

export default NewProject;
