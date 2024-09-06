/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Modal } from '@mui/material';
import crossIcon from '../../../../assets/images/cross.svg';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';

const VariableModal = ({ showVariableModal, setShowVariableModal }) => {
    return (
        <Modal open={showVariableModal} onClose={() => setShowVariableModal(false)} className="-----------------------------">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '12px',
                    width: '50%',
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
                    <p className="mr-2">Variables</p>
                    <img
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => setShowVariableModal(false)}
                        src={crossIcon}
                        alt="icon"
                    />
                </Box>
                <Box sx={{ p: 2, height: '100px' }}>vabiables</Box>
            </Box>
        </Modal>
    );
};

export default VariableModal;
