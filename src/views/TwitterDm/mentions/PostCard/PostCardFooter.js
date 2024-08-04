import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { IconBrandLinkedin, IconBrandReddit, IconExternalLink } from 'tabler-icons';
import { FaQuora, FaXTwitter } from 'react-icons/fa6';
import removeEndingSubstring from 'utils/removeEndingSubstring';

const PostCardFooter = ({ generatingReply, handleGenerateReply, link, platform }) => {
    const icons = {
        'reddit.com': <RedditIcon />,
        'linkedin.com': <IconBrandLinkedin size={22} color="#0a66c2" />,
        'quora.com': <FaQuora size={17} color="rgb(245, 41, 54)" />,
        'twitter.com': <FaXTwitter size={16} />
    };

    return (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button onClick={handleGenerateReply} variant="contained" disabled={generatingReply}>
                Generate Reply {generatingReply && <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px', ml: 1 }} />}
            </Button>
            {platform && icons[platform]}
            <a
                // title={link}
                href={removeEndingSubstring(link)}
                target="_blank"
                style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    padding: '5px 18px',
                    borderRadius: '4px',
                    gap: '4px'
                }}
                rel="noreferrer"
            >
                Visit post <IconExternalLink />
            </a>
        </Box>
    );
};

export default PostCardFooter;

export const RedditIcon = () => (
    <Typography
        component="span"
        sx={{
            height: '18px',
            width: '18px',
            borderRadius: '50%',
            bgcolor: '#ff4500',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <IconBrandReddit size={12} color="#fff" />
    </Typography>
);
