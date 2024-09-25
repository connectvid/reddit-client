import ReportCard from './ReportCard';
import { Grid } from '@mui/material';

export default function ({ reports }) {
    return (
        <Grid container spacing={2} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {reports.map((report) => (
                <Grid key={report._id} item xs={12} sm={6} md={4} lg={4} style={{ display: 'flex' }}>
                    <ReportCard {...{ report }} style={{ flex: 1 }} />
                </Grid>
            ))}
            <Grid />
        </Grid>
    );
}
