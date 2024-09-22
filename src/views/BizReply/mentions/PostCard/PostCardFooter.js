import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import BRButton from 'ui-component/bizreply/BRButton';

const PostCardFooter = ({ generatingReply, handleGenerateReply, link, handleDeletePost, deletePost }) => {
    const { subscription } = useSelector((state) => state.subscription);
    const repliesCredits = subscription?.remainingCredit?.replies;

    return (
        <Box sx={{ mt: '23px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BRButton
                    onClick={handleGenerateReply}
                    variant="contained"
                    disabled={generatingReply || (repliesCredits !== 'Unlimited' && repliesCredits < 1)}
                    sx={{ height: '46px', width: '183px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    Generate Reply {generatingReply && <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px', ml: 1 }} />}
                </BRButton>

                <a href={link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
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
                        // onClick={() => window.open(link, '_blank', 'noreferrer')}
                        childSx={{ justifyContent: 'center' }}
                    >
                        {/* <Link to={link} target="_blank" rel="noreferrer"> */}
                        View Post
                        {/* </Link> */}
                    </BRButton>
                </a>
            </Box>
            <BRButton
                onClick={handleDeletePost}
                variant="contained"
                disabled={deletePost}
                sx={{ height: '46px', width: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                Skip {(deletePost && <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px' }} />) || ''}
            </BRButton>
        </Box>
    );
};

export default PostCardFooter;
