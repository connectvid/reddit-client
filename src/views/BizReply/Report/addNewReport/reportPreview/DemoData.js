import { Card, CardContent, Typography } from '@mui/material';
import SocialIcon from '../../viewReports/SocialIcon';
import { Box } from '@mui/system';

const platformData = [
    {
        date: '14/09/2024',
        category: 'PRODUCTIVITY',
        platform_url: 'reddit.com',
        color: '#C7FCEB',
        post_url: 'www.theposturlwillbehere.com/post',
        generated_reply:
            "If you're exploring alternatives to Microsoft 365 or Google, you might want to consider how your chosen email provider integrates with other tools. For example, Lemlist offers seamless outreach features that can enhance your email strategy without the bloat of larger services. Check out more at https://Lemlist.com. Have you given Zoho a try for that purpose?"
    },
    {
        date: '14/09/2024',
        category: 'TASK MANAGEMENT',
        platform_url: 'linkedin.com',
        color: '#C7FCEB',
        post_url: 'www.theposturlwillbehere.com/post',
        generated_reply:
            "If you're exploring alternatives to Microsoft 365 or Google, you might want to consider how your chosen email provider integrates with other tools. For example, Lemlist offers seamless outreach features that can enhance your email strategy without the bloat of larger services. Check out more at https://Lemlist.com. Have you given Zoho a try for that purpose?"
    },
    {
        date: '14/09/2024',
        category: 'MAIL',
        platform_url: 'facebook.com',
        color: '#C7FCEB',
        post_url: 'www.theposturlwillbehere.com/post',
        generated_reply:
            "If you're exploring alternatives to Microsoft 365 or Google, you might want to consider how your chosen email provider integrates with other tools. For example, Lemlist offers seamless outreach features that can enhance your email strategy without the bloat of larger services. Check out more at https://Lemlist.com. Have you given Zoho a try for that purpose?"
    }
];

const DemoData = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
            {platformData.map((item, index) => (
                <Card key={index} style={{ border: '1px solid #CCD3D9', borderRadius: '15px' }}>
                    <CardContent>
                        {/* Category with Colored Badge */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography style={{ color: '#6E7478' }}>{item.date}</Typography>
                            <Box style={{ display: 'flex', gap: '10px' }}>
                                <Typography style={{ background: item.color, borderRadius: '5px', padding: '5px 20px' }}>
                                    {item.category}
                                </Typography>
                                <SocialIcon platform={item.platform_url} />
                            </Box>
                        </div>

                        <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '10px' }}>Post URL</Typography>
                        <Typography style={{}}>{item.post_url}</Typography>

                        <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '15px' }}>Generated Reply</Typography>
                        <Typography style={{}}>{item.generated_reply}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DemoData;
