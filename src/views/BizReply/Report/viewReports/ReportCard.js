import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';
import ShowSocialIcons from './ShowSocialIcons';
import { LuDownloadCloud } from 'react-icons/lu';

export default function ({ report }) {
    function formatTimestampToDate(timestamp) {
        const date = new Date(timestamp);

        // Extracting the date components
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getUTCDate()).padStart(2, '0');

        // Formatting the date as YYYY-MM-DD
        return `${year}-${month}-${day}`;
    }
    return (
        <Card
            variant="outlined"
            sx={{
                margin: '20px auto',
                boxShadow: 3,
                borderRadius: '15px',
                width: '100%'
            }}
        >
            <CardContent>
                {/* Project Name and Date Range */}
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item>
                        <Typography variant="caption" color="textSecondary">
                            PROJECT NAME
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {/* <Avatar
                                src="https://cdn.iconscout.com/icon/free/png-256/clickup-3520910-2944916.png"
                                alt="ClickUp"
                                style={{ width: '20px', height: '20px' }}
                            /> */}
                            <Typography variant="body2">{report.projectName}</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="textSecondary">
                            DATE RANGE
                        </Typography>
                        <Typography variant="body2">
                            {formatTimestampToDate(report.dateRange.from)} - {formatTimestampToDate(report.dateRange.to)}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Post Name */}
                <Box style={{ marginTop: '10px' }}>
                    <Typography variant="caption" color="textSecondary">
                        PROJECT STATUS
                    </Typography>
                    <Typography variant="body1">{report.status === 'succeed' ? 'Successful' : report.status}</Typography>
                </Box>

                {/* Description */}
                <Box style={{ marginTop: '10px', height: '80px', overflow: 'hidden' }}>
                    <Typography variant="caption" color="textSecondary" style={{ marginTop: '15px' }}>
                        DESCRIPTION
                    </Typography>
                    <Typography variant="body2">{report.projectDescription}</Typography>
                </Box>

                {/* Social Media */}
                <Box style={{ marginTop: '10px' }}>
                    <Typography variant="caption" color="textSecondary">
                        SOCIALS
                    </Typography>
                    <ShowSocialIcons platforms={report.platforms} />
                </Box>

                {/* Download Report Button */}
                {report.pdfUrl ? (
                    <BRButton
                        variant="contained"
                        fullWidth
                        startIcon={<LuDownloadCloud />}
                        sx={{
                            marginTop: '20px',
                            opacity: report?.pdfUrl ? 1 : 0.7
                        }}
                        disabled={!report.pdfUrl}
                        onClick={() => {
                            window.open(report.pdfUrl, '_blank');
                        }}
                    >
                        Download report
                    </BRButton>
                ) : (
                    <BRButton
                        variant="contained"
                        fullWidth
                        sx={{
                            marginTop: '20px',
                            opacity: report?.pdfUrl ? 1 : 0.7
                        }}
                    >
                        Processing...
                    </BRButton>
                )}
            </CardContent>
        </Card>
    );
}
