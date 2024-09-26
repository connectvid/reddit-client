/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@mui/material';
import { useRef } from 'react';
import uploadIcon from 'assets/images/svgIcons/upload.svg';
import BRButton from 'ui-component/bizreply/BRButton';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';

const ImageUpload = ({ name, handleFormInputChange }) => {
    const { getAccessToken } = useAuth();
    const inputRef = useRef(null); // Reference for the file input

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const processFiles = async (files) => {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     setImage(reader.result); // Set the image URL to state
            // };
            // reader.readAsDataURL(file);

            const token = await getAccessToken();
            const formData = new FormData();
            formData.append('file', files[0]);
            const {
                data: {
                    item: { secure_url }
                }
            } = await axios.post('reports/file-upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(secure_url);
            handleFormInputChange({ target: { name, value: secure_url } });
        } else {
            alert('Please upload an image file.');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };

    const handleClick = () => {
        inputRef.current.click(); // Trigger click on the hidden input
    };

    return (
        <Box
            sx={{
                // border: '2px dashed #2583D8',
                // borderRadius: '12px',
                // padding: '20px',
                // textAlign: 'center',
                // backgroundColor: '#F1F5FD',
                // width: '100%',
                // maxWidth: '600px',
                // margin: '0 auto 20px',
                // cursor: 'pointer',
                // height: '30px',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center'
                width: '130px'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick} // Click to open file dialog
        >
            <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }} // Hide the input
                accept="image/*" // Accept only image files
                onChange={handleChange}
            />
            <BRButton style={{ color: '#fff', width: '100%' }}>
                <img style={{ marginRight: '10px' }} src={uploadIcon} alt="upload icon" /> Upload logo
            </BRButton>
            {/* <Box
                color="primary"
                aria-label="upload logo"
                component="span"
                style={{
                    display: 'flex',
                    // flexDirection: 'column',
                    // alignItems: 'center',
                    color: '#2196f3',
                    gap: '10px'
                }}
            >
                <img src={uploadIcon} alt="upload icon" />
                <GradinentText style={{ marginTop: '5px' }} variant="body1">
                    Upload logo
                </GradinentText>
            </Box> */}
        </Box>
    );
};

export default ImageUpload;
