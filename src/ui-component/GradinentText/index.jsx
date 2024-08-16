import { Typography } from '@mui/material';

export default function GradinentText({ sx = {}, children, ...rest }) {
    return (
        <Typography
            sx={{
                background: 'linear-gradient(92.84deg, #0c22e5 0%, #2a98d5 96.82%)',
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                ...sx
            }}
            {...rest}
        >
            {children}
        </Typography>
    );
}
