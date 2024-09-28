import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import ShowSocialIcons from './ShowSocialIcons';
import DemoData from './DemoData';
import DateRangeDisplay from './DateRangeDisplay';

const ReportPreview = ({ values, keywordsData }) => {
    function getTitleById(id) {
        const foundObject = keywordsData.find((obj) => obj._id === id);
        return foundObject ? foundObject.title : '';
    }
    return (
        <Box style={{ background: '#f1f2f2', padding: '15px 15px 0', borderRadius: '10px', height: '100%' }}>
            <Typography style={{ color: '#6E7478', marginBottom: '15px' }}>Preview</Typography>
            <Box style={{ background: '#fff' }}>
                <Box style={{ background: values.reportColor || '#000', color: '#fff', padding: '10px', height: '150px' }}>
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Report</Typography>
                        <Typography>
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    style={{
                        background: '#fff',
                        width: '95%',
                        margin: '-100px auto 20px',
                        padding: '15px',
                        borderRadius: '10px'
                    }}
                    sx={{
                        boxShadow: 3
                    }}
                >
                    <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Box>
                            <Typography style={{ color: '#6e7478' }}>{values.companyName}</Typography>
                            {values.companyLogo && (
                                <img
                                    style={{ maxWidth: '120px', maxHeight: '120px', margin: '20px 0' }}
                                    src={values.companyLogo}
                                    alt="companyLogo"
                                />
                            )}
                        </Box>
                        <Box>
                            <Typography style={{ color: '#6e7478' }}>{values.agencyName}</Typography>
                            {values.agencyLogo && (
                                <img
                                    style={{ maxWidth: '120px', maxHeight: '120px', margin: '20px 0' }}
                                    src={values.agencyLogo}
                                    alt="agencyLogo"
                                />
                            )}
                        </Box>
                    </Box>
                    <Box
                        style={{
                            border: '1px solid #1D62DD',
                            background: '#E9F0FB',
                            padding: '15px',
                            borderRadius: '10px',
                            width: '100%'
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Box style={{ width: '30%', marginRight: '3.3333%', overflow: 'auto', flexWrap: 'wrap' }}>
                                <Typography style={{ color: '#6E7478' }}>Project Name</Typography>
                                <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '5px' }}>
                                    {values.projectName}
                                </Typography>
                            </Box>
                            <Box style={{ width: '30%', marginRight: '3.3333%', overflow: 'auto', flexWrap: 'wrap' }}>
                                <Typography style={{ color: '#6E7478' }}>Project Domain</Typography>
                                <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '5px' }}>
                                    {values.projectDomain.startsWith('https://')
                                        ? values.projectDomain.replace('https://', '')
                                        : values.projectDomain}
                                </Typography>
                            </Box>
                            <Box style={{ width: '33.3333%', overflow: 'auto', flexWrap: 'wrap' }}>
                                <Typography style={{ color: '#6E7478' }}>Date Ranges</Typography>
                                <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '5px' }}>
                                    <DateRangeDisplay values={values} />
                                </Typography>
                            </Box>
                        </Box>
                        <Box style={{ width: '100%', marginTop: '10px' }}>
                            <Typography style={{ color: '#6E7478' }}>Project Description</Typography>
                            <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '5px' }}>
                                {values.projectDescription}
                            </Typography>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                marginTop: '10px',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Box style={{ width: '30%', marginRight: '3.3333%', overflow: 'auto', flexWrap: 'wrap' }}>
                                <Typography style={{ color: '#6E7478' }}>Socials</Typography>
                                <ShowSocialIcons platforms={values.platforms} />
                            </Box>
                            <Box style={{ width: '30%', marginRight: '3.3333%', overflow: 'auto', flexWrap: 'wrap' }}>
                                <Typography style={{ color: '#6E7478' }}>Keywords</Typography>
                                <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '5px', flexWrap: 'wrap' }}>
                                    {values?.keywords?.map((keyword, index) => (
                                        <span key={index}>{getTitleById(keyword)}, </span>
                                    ))}
                                </Typography>
                            </Box>
                            <Box style={{ width: '33.3333%', overflow: 'auto', flexWrap: 'wrap' }}>
                                <Typography style={{ color: '#6E7478' }}>Replies Generated</Typography>
                                <Typography style={{ color: '#000', fontWeight: 'bold', marginTop: '5px' }}>30</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <DemoData />
            </Box>
            <Box style={{ background: '#F6F6F6', color: '#6E7478', textAlign: 'center', padding: '8px' }}>
                <Typography>
                    <i>Powered by Bizreply.Co</i>
                </Typography>
            </Box>
        </Box>
    );
};

export default ReportPreview;
