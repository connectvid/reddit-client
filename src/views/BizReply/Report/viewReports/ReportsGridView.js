import ReportCard from './ReportCard';
import { Grid } from '@mui/material';

export default function ({ reports }) {
    return (
        <Grid container spacing={3} sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
            {reports.map((report) => (
                <Grid key={report._id} item xs={12} sm={6} md={4} lg={4} sx={{ display: 'flex' }}>
                    <ReportCard {...{ report }} />
                </Grid>
            ))}
            <Grid />
        </Grid>
    );
}
