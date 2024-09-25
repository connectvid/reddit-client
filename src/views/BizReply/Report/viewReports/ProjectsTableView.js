/* eslint-disable react/button-has-type */
import React from 'react';
import DownloadIcon from '../../../../assets/images/svgIcons/reports/download.svg';
// import { Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';
import ShowSocialIcons from './ShowSocialIcons';

const ProjectsTableView = ({ projects }) => {
    function formatTimestampToDate(timestamp) {
        const date = new Date(timestamp);

        // Extracting the date components
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getUTCDate()).padStart(2, '0');

        // Formatting the date as YYYY-MM-DD
        return `${year}-${month}-${day}`;
    }
    console.log(projects);
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
                    {projects.map((project) => (
                        <TableRow key={project._id}>
                            <TableCell component="th" scope="row">
                                {project.projectName}
                            </TableCell>
                            {/* <TableCell>{project.status}</TableCell> */}
                            <TableCell>{project.projectDescription}</TableCell>
                            <TableCell>
                                {formatTimestampToDate(project.dateRange.from)} - {formatTimestampToDate(project.dateRange.to)}
                            </TableCell>
                            <TableCell>
                                <ShowSocialIcons platforms={project.platforms} />
                            </TableCell>
                            <TableCell align="center">
                                <BRButton
                                    variant="contained"
                                    fullWidth
                                    startIcon={<img src={DownloadIcon} alt="DownloadIcon" />}
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectsTableView;
