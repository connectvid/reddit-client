import { Button } from '@mui/material';
import React from 'react';

const ExtensionLink = ({ sx = {} }) => (
    <Button
        variant="a"
        href="https://chrome.google.com/webstore/detail/leadforestio-1-twitter-sc/fongbnpplbbkkoapkimchaffgjmpgdmc"
        target="_blank"
        sx={{ fontSize: 24, color: '#009dea', ...sx }}
    >
        Install Leadforest Extension
    </Button>
);

export default ExtensionLink;
