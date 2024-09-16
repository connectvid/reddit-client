import { Box } from '@mui/system';
import BRInput from 'ui-component/bizreply/BRInput';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Autocomplete,
    TextField,
    Typography
} from '@mui/material';
import BRButton from 'ui-component/bizreply/BRButton';

const TeamSettings = () => {
    const roleOptions = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Editor', value: 'Editor' },
        { label: 'Guest', value: 'Guest' }
    ];
    return (
        <Box>
            <Box
                sx={{
                    maxWidth: '800px',
                    width: '100%',
                    position: 'relative',
                    '&::after': {
                        position: 'absolute',
                        content: '""',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '10px'
                        // zIndex: 999
                    }
                }}
            >
                <BRButton
                    sx={{
                        position: 'absolute',
                        width: '130px',
                        height: '40px',
                        zIndex: 999,
                        top: '0 !important',
                        right: '0 !important',
                        left: '0 !important',
                        bottom: '0 !important',

                        margin: 'auto'
                    }}
                    variant="contained"
                >
                    Coming soon
                </BRButton>
                <Box
                    sx={{
                        background: '#fff',
                        p: 3,
                        mt: 4,
                        borderRadius: '10px',
                        width: '100%',
                        maxWidth: '800px'
                    }}
                >
                    <Typography sx={{ fontWeight: '700' }} variant="h4">
                        Invite team members
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <Box sx={{ flex: 2 }}>
                            <BRInput label="Email" placeholder="Enter email address" />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ mb: 1, color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
                            >
                                Role
                            </Typography>
                            <Autocomplete
                                id="all_project_select_breadcrubm_area"
                                defaultValue={{ label: 'Admin', value: 'Admin' }}
                                options={roleOptions || []}
                                fullWidth
                                // sx={{ width: projectListWidth }}
                                onChange={(_, data) => {
                                    console.log(data);
                                    return data;
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        {...params}
                                        sx={{
                                            height: '40px',
                                            input: {
                                                px: '20px!important',
                                                py: `3px!important`
                                            },
                                            fieldset: {
                                                borderRadius: '10px',
                                                borderColor: '#CCD3D9 !important'
                                            }
                                        }}
                                        placeholder="Role"
                                    />
                                )}
                                disableClearable
                            />
                        </Box>
                    </Box>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        background: '#fff',
                        p: 3,
                        mt: 4,
                        borderRadius: '10px',
                        width: '100%',
                        maxWidth: '800px'
                    }}
                >
                    <Typography sx={{ fontWeight: '700', marginBottom: '20px' }} variant="h4">
                        Roles and permissions
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: '700 !important', fontSize: '18px', borderRight: '1px solid #F0F0F0' }}>
                                    Role
                                </TableCell>
                                <TableCell sx={{ fontWeight: '700 !important', fontSize: '18px' }}>Permissions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700 !important', borderRight: '1px solid #F0F0F0' }}>Owner</TableCell>
                                <TableCell>
                                    Access to everything (Add, View, Edit, Delete, Generate Reply, Mark As Replied, Fetch Mentions)
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700 !important', borderRight: '1px solid #F0F0F0' }}>Add</TableCell>
                                <TableCell>Access to everything except Add & Delete</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700 !important', borderRight: '1px solid #F0F0F0' }}>Contributor</TableCell>
                                <TableCell>Can view, Fetch Mentions, Generate Reply, and mark as complete.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700 !important', borderRight: '1px solid #F0F0F0' }}>Client</TableCell>
                                <TableCell>Can View Only</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default TeamSettings;
