import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import SearchBar from './SearchBar';
import ReportsGridView from './ReportsGridView';
import ReportsTableView from './ReportsTableView';
import Empty from 'views/BizReply/Empty';

const ViewReports = ({ reports, loading, handleModal, PDFReportStatusChange }) => {
    const [showComponent, setShowComponent] = useState('gridView');
    const [filteredReports, setFilteredReports] = useState(reports || []);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setSearchInput('');
        setFilteredReports(reports);
    }, [reports?.length, PDFReportStatusChange]);

    return (
        <Box
            style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                height: '100%'
            }}
        >
            {!loading && !reports?.length ? (
                <Empty
                    {...{
                        handleModal,
                        description: `Currently you don’t have any reports yet. Let’s create a report'`,
                        buttonTitle: 'Create a New Report'
                    }}
                />
            ) : (
                ''
            )}
            {reports?.length ? (
                <>
                    <SearchBar {...{ setShowComponent, reports, setFilteredReports, searchInput, setSearchInput }} />
                    {showComponent === 'gridView' ? (
                        <ReportsGridView reports={filteredReports} />
                    ) : (
                        <ReportsTableView reports={filteredReports} />
                    )}
                </>
            ) : (
                ''
            )}
        </Box>
    );
};

export default ViewReports;
