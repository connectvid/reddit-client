import { Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconX } from '@tabler/icons';
import { SETTING_PATH } from 'config';
import BRButton from './bizreply/BRButton';

// ==============================|| Expired PAGE ||============================== //

export default function ({ handleClose }) {
    const navigate = useNavigate();

    return (
        <>
            <Dialog open>
                <Typography
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 5, top: 5, '&:hover': { cursor: 'pointer' }, color: 'red' }}
                >
                    <IconX stroke={1.5} size="1.3rem" />
                </Typography>

                <DialogTitle id="alert-dialog-title">Please Add Your OpenAI Key To Generate Replies</DialogTitle>

                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description">Your Subscription has been Expired!</DialogContentText>
                </DialogContent> */}
                <DialogActions sx={{ px: 3 }}>
                    <BRButton variant="contained" onClick={() => navigate(`${SETTING_PATH}/#add-open-ai-key`, { replace: true })}>
                        Go to Settings
                    </BRButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
