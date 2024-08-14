import { Box, Typography } from '@mui/material';
import { changePlatform } from 'features/project/projectActions';
import reddit from 'assets/images/platforms/reddit.png';
import linkedin from 'assets/images/platforms/linkedin.png';
import quora from 'assets/images/platforms/quora.png';
import twitter from 'assets/images/platforms/twitter.png';

export const platformsSrc = {
    'reddit.com': reddit,
    'linkedin.com': linkedin,
    'quora.com': quora,
    'twitter.com': twitter
};
const PlatformSelection = ({ platforms = [], selectedPlatform, loading, haveData }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* width: { xs: '100%', md: '50%' } */}
            {platforms?.map?.((platform) => (
                <Typography
                    key={platform}
                    component="div"
                    sx={{
                        cursor: 'pointer',
                        p: 0,
                        maxWidth: '125px',
                        border: selectedPlatform === platform && '1px solid rgb(33, 150, 243)',
                        minHeight: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '5px'
                    }}
                    onClick={() => {
                        if (selectedPlatform !== platform && loading === false && haveData) changePlatform(platform)();
                    }}
                >
                    <img
                        src={platformsSrc[platform]}
                        alt={platform}
                        style={{
                            width: '85%'
                        }}
                    />
                </Typography>
            )) || ''}
        </Box>
    );
};
export default PlatformSelection;
