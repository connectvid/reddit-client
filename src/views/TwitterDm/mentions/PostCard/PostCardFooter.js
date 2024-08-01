/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { IconBrandLinkedin, IconBrandReddit, IconExternalLink } from 'tabler-icons';
import { FaQuora, FaXTwitter } from 'react-icons/fa6';

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
                href={link}
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
            >
                View <IconExternalLink />
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
