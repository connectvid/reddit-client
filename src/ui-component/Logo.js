/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
// material-ui
import { useTheme } from '@mui/material/styles';
import logoDark from 'assets/images/logo-black.svg';
// import logo from 'assets/images/logo.svg';
import logo from 'assets/images/logo-white.svg';
// import logo from 'assets/images/newMacrodm.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

// eslint-disable-next-line no-use-before-define
const Logo = ({ width, src }) => {
    const theme = useTheme();
    return <img src={src || theme.palette.mode === 'dark' ? logoDark : logo} alt="BizReply" width={width ? width : 250} />;
};

export default Logo;
