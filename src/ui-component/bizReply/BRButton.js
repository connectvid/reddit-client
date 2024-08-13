import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fontSize, fontWeight } from '@mui/system';

const BRButton = ({ sx = {}, children, buttonType = 'primary', type = 'button', variant, ...rest }) => {
    const theme = useTheme();
    const { button } = theme.palette.background;
    console.log(theme.palette);
    if (buttonType === 'primary') {
        const bgOps = { fontSize: '14px', fontWeight: 500, py: '10.25px' };
        if (variant === 'contained') {
            bgOps.variant = variant;
            bgOps.color = 'white';
            bgOps.background = button?.primaryLight || 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)';
        } else if (variant) {
            bgOps.variant = variant;
            bgOps.color = 'white';
        }

        return (
            <>
                <Button sx={{ ...bgOps, ...sx }} type={type} {...rest}>
                    {children}
                </Button>
            </>
        );
    }
    return <></>;
};

export default BRButton;
