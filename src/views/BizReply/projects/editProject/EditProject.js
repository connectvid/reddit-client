/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import crossIcon from '../../../../assets/images/cross.svg';
import CustomToggleButton from './CustomToggleButton ';
import BrandDetails from './editScreens/BrandDetails';
import Keywords from './editScreens/Keywords';
import Mentions from './editScreens/Mentions';

const EditProject = ({ projectToEdit, setProjectToEdit }) => {
    console.log(projectToEdit, ' projectToEdit');
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const [selectedPlatforms, setselectedPlatforms] = useState([]);
    const [addedKeywords, setAddedKeywords] = useState([]);
    const [values, setValues] = useState({
        brandName: '',
        domain: '',
        shortDescription: ''
    });
    const [showModal, setshowModal] = useState(true);
    // const [showComponent, setShowComponent] = useState('brandDetails');
    const [selected, setSelected] = useState('brandDetails');
    const onClostModal = () => {
        setProjectToEdit({});
        setshowModal(false);
    };
    return (
        <Modal open={showModal} onClose={onClostModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '12px',
                    width: '40%',
                    minWidth: '300px',
                    color: '#000'
                }}
            >
                <Box
                    style={{
                        backgroundColor: '#f1f1f1',
                        borderRadius: '12px 12px 0 0',
                        padding: '0px 30px',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        borderBottom: `2px solid #f0f0f0`,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <p className="mr-2">Edit project</p>
                    <img
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={onClostModal}
                        src={crossIcon}
                        alt="icon"
                    />
                </Box>
                <Box style={{ padding: '25px' }}>
                    <CustomToggleButton {...{ selected, setSelected }} />
                    {selected === 'brandDetails' && (
                        <Box>
                            <BrandDetails {...{ values, setValues }} />
                        </Box>
                    )}
                    {selected === 'keywords' && (
                        <Box>
                            <Keywords {...{ suggestedKeywords, addedKeywords, setAddedKeywords }} />
                        </Box>
                    )}
                    {selected === 'mentions' && (
                        <Box>
                            <Mentions {...{ selectedPlatforms, setselectedPlatforms }} />
                        </Box>
                    )}
                </Box>

                {/* {step === 4 && (
                    <Box style={{ padding: '30px', marginTop: '-10px' }}>
                        <Step4 {...{ setStep }} />
                    </Box>
                )} */}
            </Box>
        </Modal>
    );
};

export default EditProject;
