/* eslint-disable react/no-children-prop */
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Dialog, Typography } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'features/menu/menuSlice';

// assets
import { IconArrowLeft } from '@tabler/icons';
// import useAuth from 'hooks/useAuth';
// import { useLocation } from 'react-router-dom';
import { IconPlus, IconTriangle } from 'tabler-icons';
import { toggleShowProjects, setSingleProjectSelect, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import NewProject from 'views/TwitterDm/projects/NewProject';
// import { CopyAll } from '@mui/icons-material';

const Header = () => {
    // const { pathname } = useLocation();
    // const { dbUser } = useAuth();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const { projects, project, showProjectsList, showProjectCreateModal } = useSelector((state) => state.project);

    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection width={180} />
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                        '&:hover': {
                            background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                        }
                    }}
                    onClick={() => dispatch(openDrawer(!drawerOpen))}
                    color="inherit"
                >
                    <IconArrowLeft style={{ transform: `rotate(${drawerOpen ? `` : '18'}0deg)` }} />
                </Avatar>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Button variant="outlined" onClick={toggleShowProjects()}>
                    {project ? project.brandName : `Select`}
                    <Box component="span">
                        <IconTriangle
                            style={{
                                transform: 'rotate(180deg)',
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark
                            }}
                            size={10}
                        />
                    </Box>
                </Button>

                <Box
                    sx={{
                        display: showProjectsList ? 'block' : 'none',
                        position: 'absolute',
                        minWidth: '200px',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        borderRadius: '4px',
                        py: '4px',
                        mt: '4px'
                    }}
                >
                    <Typography sx={{ padding: '0.25rem 1rem' }}>Your Projects</Typography>
                    {projects?.map?.(({ _id, brandName }) => (
                        <Box
                            key={_id}
                            component="div"
                            sx={{
                                flexGrow: 1,
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                '&:hover': {
                                    background: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.dark.main,
                                    color: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                                    transition: 'all 0.3s ease-in-out'
                                }
                            }}
                            onClick={() => {
                                setSingleProjectSelect(_id)();
                                toggleShowProjects()();
                            }}
                        >
                            {/*  display: 'flex', justifyContent: 'center', alignItems: 'center', */}
                            {brandName}
                        </Box>
                    ))}

                    <Typography
                        onClick={() => {
                            toggleShowProjects()();
                            toggleProjectCreateModalCtrl()();
                        }}
                        sx={{ padding: '0.25rem 1rem', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <IconPlus size={14} />{' '}
                        <Box component="span" sx={{ ml: '4px' }}>
                            Add Project
                        </Box>
                    </Typography>
                </Box>
            </Box>

            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Box sx={{ marginRight: 1, flexGrow: 1, pl: 2 }} />
            <ProfileSection />
            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
            {/* <NewProject /> */}
            <Dialog open={showProjectCreateModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <NewProject />
            </Dialog>
        </>
    );
};

export default Header;
