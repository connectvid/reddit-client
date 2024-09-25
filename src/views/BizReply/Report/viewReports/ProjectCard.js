import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';
import ShowSocialIcons from './ShowSocialIcons';
import { LuDownloadCloud } from 'react-icons/lu';

const ProjectCard = ({ project }) => {
    function formatTimestampToDate(timestamp) {
        const date = new Date(timestamp);

        // Extracting the date components
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getUTCDate()).padStart(2, '0');

        // Formatting the date as YYYY-MM-DD
        return `${year}-${month}-${day}`;
    }
    console.log(project);
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
                            <Typography variant="body2">{project.projectName}</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="textSecondary">
                            DATE RANGE
                        </Typography>
                        <Typography variant="body2">
                            {formatTimestampToDate(project.dateRange.from)} - {formatTimestampToDate(project.dateRange.to)}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Post Name */}
                <Box style={{ marginTop: '10px' }}>
                    <Typography variant="caption" color="textSecondary">
                        PROJECT STATUS
                    </Typography>
                    <Typography variant="body1">{project.status}</Typography>
                </Box>

                {/* Description */}
                <Box style={{ marginTop: '10px', height: '80px', overflow: 'hidden' }}>
                    <Typography variant="caption" color="textSecondary" style={{ marginTop: '15px' }}>
                        DESCRIPTION
                    </Typography>
                    <Typography variant="body2">{project.projectDescription}</Typography>
                </Box>

                {/* Social Media */}
                <Box style={{ marginTop: '10px' }}>
                    <Typography variant="caption" color="textSecondary">
                        SOCIAL MEDIA
                    </Typography>
                    <ShowSocialIcons platforms={project.platforms} />
                </Box>

                {/* Download Report Button */}
                <BRButton
                    variant="contained"
                    fullWidth
                    startIcon={<LuDownloadCloud />}
                    style={{
                        marginTop: '20px'
                        // backgroundColor: '#1976d2',
                        // color: 'white',
                        // borderRadius: '25px',
                        // textTransform: 'none'
                    }}
                >
                    Download report
                </BRButton>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
