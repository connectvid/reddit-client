/* eslint-disable one-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { IconCheck, IconCopy, IconPencil, IconTrash } from 'tabler-icons';
import PropTypes from 'prop-types';

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
    showMarkRepliedBtn
}) => (
    <Box style={{ marginTop: '20px' }}>
        Generated Reply:
        <Box
            sx={{
                borderRadius: 4,
                position: 'relative',
                p: 2,
                border: '2px solid #ddd'
            }}
        >
            {editOpen ? (
                <EditReply {...{ editReply, setEditReply, updatingReply, handleUpdateReply }} />
            ) : (
                <Box>
                    {editReply &&
                        editReply.split('\n\n').map((item, i) => (
                            <Typography
                                key={i}
                                sx={{
                                    color: '#000',
                                    fontSize: '16px',
                                    mb: 1
                                }}
                            >
                                {item}
                            </Typography>
                        ))}
                </Box>
            )}

            <Box
                display={{ sm: 'flex' }}
                sx={{ mt: 0, justifyContent: 'end', bottom: '-37px', position: 'absolute', right: '15px', gap: 1 }}
            >
                <Button
                    variant="outlined"
                    sx={{
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        borderColor: '#ddd',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <CopyToClipboard text={reply} onCopy={() => toast.success(`Coppied!`)}>
                        <Typography component="span" display="flex">
                            <IconCopy size={18} /> Copy
                        </Typography>
                    </CopyToClipboard>
                </Button>

                {(showMarkRepliedBtn || markReply === 'marked') && <MarkBtn {...{ handleUpdateReply, markReply, updatingReply }} />}

                <Button
                    variant="outlined"
                    sx={{
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        borderColor: '#ddd',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    onClick={() => setEditOpen(true)}
                >
                    <IconPencil size={18} /> Edit
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        borderColor: '#ddd',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    disabled={updatingReply}
                    onClick={() => {
                        if (!updatingReply) handleUpdateReply({ isDelete: true });
                    }}
                >
                    <Typography sx={{ color: 'tomato', display: 'flex', alignItems: 'center' }}>
                        {/* {updatingReply ? <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px', ml: 1 }} /> : <IconTrash size={18} />}{' '} */}
                        Remove
                    </Typography>
                </Button>
            </Box>
        </Box>
    </Box>
);
export default GeneretedReply;

const MarkBtn = ({ handleUpdateReply, markReply, updatingReply }) => (
    <Button
        variant="outlined"
        sx={{
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            borderColor: '#ddd',
            color: markReply === 'marked' ? '' : '#00000080',
            display: 'flex',
            alignItems: 'center'
        }}
        disabled={updatingReply}
        onClick={() => handleUpdateReply({ update_on: 'markReply', markReply: markReply === 'marked' ? null : 'marked' })}
    >
        <IconCheck size={18} /> Mark Replied
    </Button>
);
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
