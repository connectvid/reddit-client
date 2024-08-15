/* eslint-disable one-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FiCheckCircle } from 'react-icons/fi';
import { LuCopy, LuPencil } from 'react-icons/lu';
import { LiaTimesCircle } from 'react-icons/lia';

const EditReply = ({ editReply, setEditReply, updatingReply, handleUpdateReply }) => (
    <form
        style={{}}
        onSubmit={(e) => {
            e.preventDefault();
            handleUpdateReply({ update_on: 'reply' });
        }}
    >
        <TextField
            value={editReply}
            required
            fullWidth
            multiline
            onChange={(e) => setEditReply(e.target.value || '')}
            sx={{ mb: 2, borderRadius: `0 !important`, textarea: { borderRadius: `0 !important`, fontSize: '16px' } }}
        />
        <Button type="submit" variant="contained" disabled={updatingReply}>
            Save {updatingReply && <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px', ml: 1 }} />}
        </Button>
    </form>
);

const styles = {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    color: '#6E7478',
    p: 0,
    m: 0,
    'span.MuiTouchRipple-root': {
        p: 0,
        m: 0
    },
    cursor: 'pointer'
};
const GeneretedReply = ({
    editReply,
    setEditReply,
    reply,
    updatingReply,
    handleUpdateReply,
    editOpen,
    setEditOpen,
    link,
    markReply,
    showMarkRepliedBtn,
    markReplyPosition = 'reply-section' // generate-reply-top
}) => (
    <Box style={{ marginTop: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#6E7478', mb: '10px' }}>
                Generated Reply
            </Typography>
            {(markReplyPosition === 'generate-reply-top' && <MarkBtn {...{ handleUpdateReply, markReply, updatingReply }} />) || ''}
        </Box>
        <Box
            sx={{
                borderRadius: '10px',
                position: 'relative',
                p: '20px',
                border: '1px solid #CCD3D9'
            }}
        >
            <Box>
                {(editReply && (
                    <>
                        {editOpen ? (
                            <>
                                <EditReply {...{ editReply, setEditReply, updatingReply, handleUpdateReply }} />
                            </>
                        ) : (
                            editReply.split('\n\n').map((item, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        color: '#000',
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        lineHeight: '22px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            lineHeight: '22px',
                                            m: 0,
                                            p: 0
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Box>
                            ))
                        )}
                        <Box display={{ sm: 'flex' }} sx={{ mt: '18px', justifyContent: 'space-between' }}>
                            <Box display={{ sm: 'flex' }} sx={{ mt: 0, gap: '20px' }}>
                                <CopyToClipboard text={reply.split(`\n`).join('\n')} onCopy={() => toast.success(`Coppied!`)}>
                                    <Typography component="span" sx={styles}>
                                        <LuCopy size={13.33} /> Copy
                                    </Typography>
                                </CopyToClipboard>

                                {(markReplyPosition === 'reply-section' && (
                                    <MarkBtn {...{ handleUpdateReply, markReply, updatingReply }} />
                                )) ||
                                    ''}

                                <Typography sx={styles} onClick={() => setEditOpen(true)}>
                                    <LuPencil size={13.33} /> Edit
                                </Typography>
                            </Box>
                            <Typography
                                sx={styles}
                                disabled={updatingReply}
                                onClick={() => {
                                    if (!updatingReply) handleUpdateReply({ isDelete: true });
                                }}
                            >
                                <Typography sx={styles}>
                                    <LiaTimesCircle size={13.33} /> Cancle
                                </Typography>
                            </Typography>
                        </Box>
                    </>
                )) ||
                    ''}
            </Box>
        </Box>
    </Box>
);
export default GeneretedReply;

const MarkBtn = ({ handleUpdateReply, markReply, updatingReply }) => {
    // const { pathname } = useLocation();
    const color = markReply === 'marked' ? '#218913' : styles.color;
    return (
        <Typography
            sx={{
                ...styles,
                color
            }}
            disabled={updatingReply}
            onClick={() => handleUpdateReply({ update_on: 'markReply', markReply: markReply === 'marked' ? null : 'marked' })}
        >
            <FiCheckCircle color={color} size={13.33} /> {markReply === 'marked' ? 'Mark replied' : 'Mark as replied'}
        </Typography>
    );
};

const markReply = PropTypes.oneOf(['marked', 'unmarked', null, undefined]),
    updatingReply = PropTypes.bool.isRequired,
    handleUpdateReply = PropTypes.func.isRequired,
    editReply = PropTypes.oneOfType([PropTypes.oneOf([null, undefined, '']), 'string']),
    setEditReply = PropTypes.func.isRequired;

EditReply.propTypes = { editReply, setEditReply, updatingReply, handleUpdateReply };

GeneretedReply.propTypes = {
    editReply,
    setEditReply,
    reply: PropTypes.oneOfType([PropTypes.oneOf([null, undefined, '']), 'string']),
    showMarkRepliedBtn: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.bool]),
    setEditOpen: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
    updatingReply: PropTypes.bool.isRequired,
    editOpen: PropTypes.bool.isRequired,
    handleUpdateReply: PropTypes.func.isRequired,
    markReply
};
MarkBtn.propTypes = {
    updatingReply: PropTypes.bool.isRequired,
    handleUpdateReply: PropTypes.func.isRequired,
    markReply
};
