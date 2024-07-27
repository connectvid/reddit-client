/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { Button, Card, CardContent, Typography } from '@mui/material';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import CreateCampaign from './CreateCampaign';
import { useState } from 'react';
import CampaignTable from './CampaignTable';

const DmPage = () => {
    const [createCampaign, setCreateCampaign] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    return (
        <div>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2" style={{ marginRight: 'auto' }}>
                        Current Campaigns
                    </Typography>
                    <Button
                        onClick={() => setCreateCampaign(true)}
                        variant="outlined"
                        style={{ background: DEFAULT_BUTTON_COLOR_CODE, color: '#fff' }}
                    >
                        Create New Campaign
                    </Button>
                </CardContent>
            </Card>
            <CampaignTable campaigns={campaigns} setCampaigns={setCampaigns} />
            <CreateCampaign
                campaigns={campaigns}
                setCampaigns={setCampaigns}
                createCampaign={createCampaign}
                setCreateCampaign={setCreateCampaign}
            />
        </div>
    );
};

export default DmPage;
