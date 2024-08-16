import { Box, Typography } from '@mui/material';

export default function Breadcrumb({ title = 'Projects', children, sx = {}, titleSx = {}, contentSx = {} }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, ...sx }}>
            <Typography variant="h2" sx={titleSx}>
                {title}
            </Typography>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', ...contentSx }}>
                {children}
            </Box>
        </Box>
    );
}
