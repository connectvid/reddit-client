/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Button, Card, CardContent, Typography } from '@mui/material';
import { DEFAULT_BUTTON_COLOR_CODE } from 'config';
import ProjectsTable from './ProjectsTable';
import { useSelector } from 'react-redux';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';

const Projects = () => {
    const { projects } = useSelector((state) => state.project);

    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography variant="h2" style={{ marginRight: 'auto' }}>
                            Projects
                        </Typography>
                    </div>
                    <Button
                        onClick={toggleProjectCreateModalCtrl()}
                        variant="outlined"
                        style={{ background: DEFAULT_BUTTON_COLOR_CODE, color: '#fff' }}
                    >
                        Add Project
                    </Button>
                </CardContent>
            </Card>
            <ProjectsTable {...{ projects }} />
        </>
    );
};

export default Projects;
