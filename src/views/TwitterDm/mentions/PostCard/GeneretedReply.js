/* eslint-disable no-undef */
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { IconCheck, IconCopy, IconExternalLink, IconPencil, IconTrash } from 'tabler-icons';

const EditReply = ({ editReply, setEditReply, updatingReply, handleUpdateReply }) => (
    <form
        style={{}}
        onSubmit={(e) => {
            e.preventDefault();
            handleUpdateReply();
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

const GeneretedReply = ({ editReply, setEditReply, reply, updatingReply, handleUpdateReply, editOpen, setEditOpen, link }) => (
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
                {/* <Button
                    variant="outlined"
                    sx={{
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        borderColor: '#ddd',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
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
                        rel="noreferrer"
                    >
                        <IconExternalLink size={18} /> Publish
                    </a>
                </Button> */}
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
                    <IconCheck size={18} /> Mark Published
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
                        if (!updatingReply) handleUpdateReply(true);
                    }}
                >
                    <Typography sx={{ color: 'tomato', display: 'flex', alignItems: 'center' }}>
                        {updatingReply ? <CircularProgress sx={{ maxWidth: '20px', maxHeight: '20px', ml: 1 }} /> : <IconTrash size={18} />}{' '}
                        Remove
                    </Typography>
                </Button>
            </Box>
        </Box>
    </Box>
);
export default GeneretedReply;
