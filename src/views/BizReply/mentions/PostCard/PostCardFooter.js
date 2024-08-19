import { Box, CircularProgress } from '@mui/material';
import removeEndingSubstring from 'utils/removeEndingSubstring';
import { useSelector } from 'react-redux';
import BRButton from 'ui-component/bizreply/BRButton';
import { Link } from 'react-router-dom';

const PostCardFooter = ({ generatingReply, handleGenerateReply, link }) => {
    // platform
    const { subscription } = useSelector((state) => state.subscription);
    const repliesCredits = subscription?.remainingCredit?.replies;
    // const icons = {
    //     'reddit.com': <RedditIcon />,
    //     'linkedin.com': <IconBrandLinkedin size={22} color="#0a66c2" />,
    //     'quora.com': <FaQuora size={17} color="rgb(245, 41, 54)" />,
    //     'twitter.com': <FaXTwitter size={16} />
    // };

    return (
        <Box sx={{ mt: '23px', display: 'flex', alignItems: 'center', gap: 2 }}>
            <BRButton
                onClick={handleGenerateReply}
                variant="contained"
                disabled={generatingReply || (repliesCredits !== 'Unlimited' && repliesCredits < 1)}
                sx={{ height: '46px', width: '183px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                Generate Reply {generatingReply && <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px', ml: 1 }} />}
            </BRButton>

            <BRButton
                variant="outlined"
                sx={{
                    height: '46px',
                    width: '183px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: 500
                }}
                childSx={{ justifyContent: 'center' }}
            >
                <Link to={link} target="_blank" rel="noreferrer">
                    View Post
                </Link>
            </BRButton>
        </Box>
    );
};

export default PostCardFooter;

// export const RedditIcon = () => (
//     <Typography
//         component="span"
//         sx={{
//             height: '18px',
//             width: '18px',
//             borderRadius: '50%',
//             bgcolor: '#ff4500',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center'
//         }}
//     >
//         <IconBrandReddit size={12} color="#fff" />
//     </Typography>
// );
