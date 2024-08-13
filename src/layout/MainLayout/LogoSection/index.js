/* eslint-disable react/prop-types */
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
// import Logo from 'ui-component/Logo';
import { useSelector } from 'react-redux';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ logo, width }) => {
    const { drawerOpen } = useSelector((state) => state.menu);
    return (
        <Link component={RouterLink} to={DASHBOARD_PATH} sx={{ display: 'flex', textDecoration: 'none', marginBottom: '10px' }}>
            {/* <Logo logo={logo} width={width} /> */}
            {drawerOpen ? (
                <Typography
                    component="span"
                    sx={{ fontWeight: 700, fontSize: '36px', fontFamily: 'Gemunu Libre', color: '#fff', ml: '4px' }}
                >
                    BizReply.Co
                </Typography>
            ) : (
                ''
            )}
        </Link>
    );
};

export default LogoSection;
