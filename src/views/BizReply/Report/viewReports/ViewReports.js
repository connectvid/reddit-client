import { useState } from 'react';
import { Box } from '@mui/system';
import SearchBar from './SearchBar';
import ProjectsGridView from './ProjectsGridView';
import ProjectsTableView from './ProjectsTableView';

const ViewReports = ({ projects }) => {
    const [showComponent, setShowComponent] = useState('gridView');
    const [filteredProjectes, setFilteredProjectes] = useState(projects || []);
    return (
        <Box
            style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px'
            }}
        >
            <SearchBar {...{ setShowComponent, projects, setFilteredProjectes }} />
            {showComponent === 'gridView' ? (
                <ProjectsGridView projects={filteredProjectes} />
            ) : (
                <ProjectsTableView projects={filteredProjectes} />
            )}
        </Box>
    );
};

export default ViewReports;
