import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const BRButton = ({ sx = {}, children, buttonType = 'primary', type = 'button', variant, childSx = {}, grandChildSx = {}, ...rest }) => {
    const theme = useTheme();
    const { button } = theme.palette.background;
    // console.log(theme.palette);
    if (buttonType === 'primary') {
        let bgOps = {
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            py: '10.25px',
            backgroundImage: button?.primaryLight || 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)',
            display: 'flex',
            alignItems: 'center'
        };

        if (variant === 'contained') {
            const contained = {
                color: 'white'
            };
            bgOps = { ...bgOps, ...contained };
        } else if (variant === 'outlined') {
            const outlined = {
                border: 'none',
                boxSizing: 'border-box',
                display: 'block',
                padding: '1px'
            };
            bgOps = { ...bgOps, ...outlined };
            const child = {
                background: 'white',
                borderRadius: bgOps.borderRadius,
                ...childSx
            };
            if (sx?.backgroundColor || sx?.background) {
                child.background = sx?.backgroundColor || sx?.background;
            }
            delete sx.backgroundColor;
            delete sx.background;
            return (
                <Button sx={{ ...bgOps, ...sx }} type={type} {...rest} variant={variant}>
                    <Typography
                        className="outlined_child_wrapper"
                        component="span"
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            // justifyContent: 'center',
                            height: '100%',
                            width: '100%',
                            ...child
                        }}
                        id="child"
                    >
                        <Typography
                            component="span"
                            sx={{
                                background: bgOps.backgroundImage,
                                WebkitTextFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                display: 'flex',
                                alignItems: 'center',
                                ...grandChildSx
                            }}
                            id="grandChild"
                        >
                            {children}
                        </Typography>
                    </Typography>
                </Button>
            );
        } else {
            bgOps.color = '';
        }

        return (
            <>
                <Button sx={{ ...bgOps, ...sx }} type={type} variant={variant} {...rest}>
                    {children}
                </Button>
            </>
        );
    }
    return <></>;
};

export default BRButton;
