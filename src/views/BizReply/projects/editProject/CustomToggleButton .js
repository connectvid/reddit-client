import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';
import { fontWeight, textAlign } from '@mui/system';
import GradinentText from 'ui-component/GradinentText';

const CustomToggleButton = ({ selected, setSelected }) => {
    const notSelectedStyle = {
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#f1f1f1',
        textTransform: 'none',
        padding: '6px 12px',
        border: 'none'
        // background: 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)',
        // WebkitTextFillColor: 'transparent',
        // WebkitBackgroundClip: 'text'
    };
    const selectedStyle = {
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'blue',
        backgroundColor: '#fff',
        textTransform: 'none',
        padding: '6px 12px',
        border: 'none'
    };

    return (
        <ButtonGroup
            disableElevation
            style={{ dixplay: 'flex', gap: '10px', width: '100%', padding: '10px', background: '#f1f1f1', borderRadius: '50px' }}
        >
            <Button
                sx={{ flex: 1 }}
                onClick={() => setSelected('brandDetails')}
                style={selected === 'brandDetails' ? selectedStyle : notSelectedStyle}
            >
                {selected === 'brandDetails' ? (
                    <GradinentText sx={{ fontWeight: 'bold', fontSize: '16px' }}>Brand details</GradinentText>
                ) : (
                    <span>Brand details</span>
                )}
            </Button>
            <Button
                sx={{ flex: 1 }}
                onClick={() => setSelected('keywords')}
                style={selected === 'keywords' ? selectedStyle : notSelectedStyle}
            >
                {selected === 'keywords' ? (
                    <GradinentText sx={{ fontWeight: 'bold', fontSize: '16px' }}>Keywords</GradinentText>
                ) : (
                    <span>Keywords</span>
                )}
            </Button>
            <Button
                sx={{ flex: 1 }}
                onClick={() => setSelected('mentions')}
                style={selected === 'mentions' ? selectedStyle : notSelectedStyle}
            >
                {selected === 'mentions' ? (
                    <GradinentText sx={{ fontWeight: 'bold', fontSize: '16px' }}>Mentions</GradinentText>
                ) : (
                    <span>Mentions</span>
                )}
            </Button>
        </ButtonGroup>
    );
};

export default CustomToggleButton;
