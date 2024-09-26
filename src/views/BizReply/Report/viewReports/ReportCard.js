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
            style={{
                // maxWidth: 400,
                margin: '20px auto',
                // padding: '20px',
                borderRadius: '15px'
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
                    <Typography variant="body1">{report.status}</Typography>
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
                        SOCIAL MEDIA
                    </Typography>
                    <ShowSocialIcons platforms={report.platforms} />
                </Box>

                {/* Download Report Button */}
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
                        // const link = document.createElement('a');
                        // link.href = report.pdfUrl;
                        // link.download = 'report.pdf';
                        // document.body.appendChild(link);
                        // link.click();
                        // document.body.removeChild(link);
                        window.open(report.pdfUrl, '_blank');
                    }}
                >
                    {/* {report?.pdfUrl ? (
                                        <a
                                            href={report?.pdfUrl}
                                            target="_blank"
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                            rel="noreferrer"
                                        >
                                            Download report
                                        </a>
                                    ) : (
                                        'Download report'
                                    )} */}
                    Download report
                </BRButton>
            </CardContent>
        </Card>
    );
}
