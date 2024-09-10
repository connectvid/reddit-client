/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Button, Typography, ButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AccountSettings from './AccountSettings';
import MentionSettings from './MentionSettings';
import TeamSettings from './TeamSettings';
// ==============================|| SETTINGS PAGE ||============================== //

const Settings = () => {
    const notSelectedStyle = {
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#fff',
        textTransform: 'none',
        padding: '6px 12px',
        border: 'none'
    };
    const selectedStyle = {
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'blue',
        backgroundColor: '#f1f1f1',
        textTransform: 'none',
        padding: '6px 12px',
        border: 'none',
        background: 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)'
    };
    const [selectedComponent, setSelectedComponent] = useState('account');
    let Tab = () => <></>;
    if (selectedComponent === 'account') {
        Tab = AccountSettings;
    } else if (selectedComponent === 'mention') {
        Tab = MentionSettings;
    }else if (selectedComponent === 'team') {
        Tab = TeamSettings;
    }
    return (
        <Box>
            <Typography sx={{ mb: 3, fontSize: '25px', fontWeight: '700' }}>Settings</Typography>
            <ButtonGroup
                disableElevation
                style={{ dixplay: 'flex', gap: '10px', padding: '10px', background: '#fff', borderRadius: '50px' }}
            >
                <Button
                    sx={{ flex: 1, width: '200px' }}
                    onClick={() => setSelectedComponent('account')}
                    style={selectedComponent === 'account' ? selectedStyle : notSelectedStyle}
                >
                    {selectedComponent === 'account' ? (
                        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>Account settings</span>
                    ) : (
                        <span>Account settings</span>
                    )}
                </Button>
                <Button
                    sx={{ flex: 1, width: '200px' }}
                    onClick={() => setSelectedComponent('mention')}
                    style={selectedComponent === 'mention' ? selectedStyle : notSelectedStyle}
                >
                    {selectedComponent === 'mention' ? (
                        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>Mention settings</span>
                    ) : (
                        <span>Mention settings</span>
                    )}
                </Button>
                <Button
                    sx={{ flex: 1, width: '200px' }}
                    onClick={() => setSelectedComponent('team')}
                    style={selectedComponent === 'team' ? selectedStyle : notSelectedStyle}
                >
                    {selectedComponent === 'team' ? (
                        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>Team members</span>
                    ) : (
                        <span>Team members</span>
                    )}
                </Button>
            </ButtonGroup>
            <Tab />
        </Box>
    );
};

export default Settings;
