/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-children-prop */
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog, Typography } from '@mui/material';

// project imports
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import { useSelector } from 'react-redux';
// import { openDrawer } from 'features/menu/menuSlice';
// import { IconArrowLeft } from '@tabler/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconPlus } from 'tabler-icons';
import { toggleShowProjects, setSingleProjectSelect, toggleProjectCreateModalCtrl, clearingError } from 'features/project/projectActions';
import NewProject from 'views/BizReply/projects/NewProject';
// import './header.css';
import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    // const dispatch = useDispatch();
    const {
        // menu: { drawerOpen },
        // subscription: { subscription },
        project: { projects, project, showProjectsList, showProjectCreateModal, error }
    } = useSelector((state) => state);
    // const repliesCredits = subscription?.remainingCredit;
    React.useEffect(() => {
        if (error) {
            toast.error(error);
            clearingError()();
        }
    }, [error]);

    // React.useEffect(() => {
    //     if (createKeywordSuccess) {
    //         navigate(`${MENTION_PATH}${search}`, { state: { socket: true } });
    //         createdKeywordSuccess(false)();
    //         // setTimeout(() => {
    //         // }, 500);
    //     }
    // }, [createKeywordSuccess]);

    return (
        <>
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

            <Box sx={{ marginRight: 1, flexGrow: 1, pl: 2 }} />
            {/* <Box
                sx={{
                    // position: 'relative',
                    ml: 1,
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    },
                    border: `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: '8px'
                }}
            >
                {(repliesCredits &&
                    Object.keys(repliesCredits).map((item) => {
                        const val = repliesCredits[item];
                        if (item !== 'searches')
                            return (
                                <Button key={item} variant="">
                                    <strong>{item}: </strong> <Typography ml={1}>{val}</Typography>
                                </Button>
                            );
                    })) ||
                    ''}
            </Box> */}

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