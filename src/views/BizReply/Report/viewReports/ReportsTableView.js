/* eslint-disable react/button-has-type */
import { LuDownloadCloud } from 'react-icons/lu';
// import { Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';
import ShowSocialIcons from './ShowSocialIcons';

export default function ({ reports }) {
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
        <TableContainer component={Paper} style={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 1000 }}>
                <TableHead style={{ backgroundColor: '#F1F1F1' }}>
                    <TableRow>
                        <TableCell sx={{ width: '15%' }}>Project Name</TableCell>
                        {/* <TableCell>Post Status</TableCell> */}
                        <TableCell sx={{ width: '30%' }}>Description</TableCell>
                        <TableCell sx={{ width: '25%' }}>Date Range</TableCell>
                        <TableCell sx={{ width: '10%' }}>Social Media</TableCell>
                        <TableCell align="center" sx={{ width: '20%' }}>
                            Download Report
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report._id}>
                            <TableCell component="th" scope="row">
                                {report.projectName}
                            </TableCell>
                            {/* <TableCell>{report.status}</TableCell> */}
                            <TableCell>{report.projectDescription}</TableCell>
                            <TableCell>
                                {formatTimestampToDate(report.dateRange.from)} - {formatTimestampToDate(report.dateRange.to)}
                            </TableCell>
                            <TableCell>
                                <ShowSocialIcons platforms={report.platforms} />
                            </TableCell>
                            <TableCell align="center">
                                <BRButton
                                    variant="contained"
                                    fullWidth
                                    startIcon={<LuDownloadCloud />}
                                    style={{
                                        marginTop: '20px',
                                        opacity: report?.pdfUrl ? 1 : 0.7
                                    }}
                                >
                                    {report?.pdfUrl ? (
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
                                    )}
                                </BRButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
