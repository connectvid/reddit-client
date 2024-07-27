/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import AddProxy from './AddProxy';
import ProxyTable from './ProxyTable';

const ProxyPage = () => {
    const [addProxy, setAddProxy] = useState(false);
    const [proxies, setProxies] = useState([]);

    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2" style={{ marginRight: 'auto' }}>
                        Added Proxies
                    </Typography>
                    <Button
                        onClick={() => setAddProxy(true)}
                        variant="outlined"
                        style={{ background: DEFAULT_BUTTON_COLOR_CODE, color: '#fff' }}
                    >
                        Add New Proxy
                    </Button>
                </CardContent>
            </Card>
            <ProxyTable proxies={proxies} setProxies={setProxies} />
            <AddProxy addProxy={addProxy} setAddProxy={setAddProxy} setProxies={setProxies} />
            <p>No Proxy found!</p>
            <p>This feature is not complete, we are still working on it</p>
        </>
    );
};

export default ProxyPage;
