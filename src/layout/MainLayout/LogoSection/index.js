/* eslint-disable react/prop-types */
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ logo, width }) => (
    <Link component={RouterLink} to={DASHBOARD_PATH}>
        <Logo logo={logo} width={width} />
    </Link>
);

export default LogoSection;
