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
import { useLocation, useNavigate } from 'react-router-dom';
import { IconPlus } from 'tabler-icons';
import { toggleShowProjects, setSingleProjectSelect, toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import NewProject from 'views/TwitterDm/projects/NewProject';
import './header.css';
// import React from 'react';
// import { KEYWORD_PATH } from 'config';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const { projects, project, showProjectsList, showProjectCreateModal } = useSelector((state) => state.project);
    // React.useEffect(() => {
    //     if (projectCreated && pathname !== KEYWORD_PATH) {
    //         // projectCreatedStatus(false)();
    //         navigate(KEYWORD_PATH);
    //     }
    // }, [projectCreated]);
    // console.log({ projectCreated }, pathname === KEYWORD_PATH);

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
                <Box component="span" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center' }}>
                    <LogoSection width={30} />{' '}
                    <Box
                        component="span"
                        sx={{ fontWeight: 700, fontSize: '24px', fontFamily: 'Poppins', color: 'rgba(58, 26, 85,1)', ml: '4px' }}
                    >
                        BizReply.co
                    </Box>
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
                    ml: 1,
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
                onBlur={() => {
                    if (showProjectsList)
                        setTimeout(() => {
                            toggleShowProjects(false)();
                        }, 500);
                }}
            >
                <Button variant="outlined" onClick={toggleShowProjects()}>
                    {project ? project.brandName : `Select`}
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                        {showProjectsList ? <FaAngleUp color="rgb(58, 26, 85)" /> : <FaAngleDown color="rgb(58, 26, 85)" />}
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
                    <Box sx={{ maxHeight: '250px', overflowY: 'scroll' }}>
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
                                    navigate(`${pathname}?dp=${_id}`);
                                }}
                            >
                                {brandName}
                            </Box>
                        ))}
                    </Box>

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
