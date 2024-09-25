import { useState } from 'react';
import { Box } from '@mui/system';
import SearchBar from './SearchBar';
import ReportsGridView from './ReportsGridView';
import ReportsTableView from './ReportsTableView';

const ViewReports = ({ reports }) => {
    const [showComponent, setShowComponent] = useState('gridView');
    const [filteredReports, setFilteredReports] = useState(reports || []);
    return (
        <Box
            style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px'
            }}
        >
            <SearchBar {...{ setShowComponent, reports, setFilteredReports }} />
            {showComponent === 'gridView' ? <ReportsGridView reports={filteredReports} /> : <ReportsTableView reports={filteredReports} />}
        </Box>
    );
};

export default ViewReports;
