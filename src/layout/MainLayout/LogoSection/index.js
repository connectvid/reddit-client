/* eslint-disable react/prop-types */
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
import { useSelector } from 'react-redux';
import src from 'assets/images/logo.svg';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ width }) => {
    const { drawerOpen } = useSelector((state) => state.menu);
    return (
        <Link component={RouterLink} to={DASHBOARD_PATH} sx={{ display: 'flex', textDecoration: 'none', marginBottom: '30px' }}>
            {drawerOpen ? <Logo width={width || 180} /> : <Logo src={src} width="auto" />}
        </Link>
    );
};

export default LogoSection;
