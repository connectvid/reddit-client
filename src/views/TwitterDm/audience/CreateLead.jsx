/* eslint-disable camelcase */
import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const CreateLead = ({ loading, handleSubmit, handleChange, handleClose }) => (
    <form onSubmit={handleSubmit}>
        <DialogTitle id="alert-dialog-title">Add Lead List</DialogTitle>
        <DialogContent>
            <TextField
                required
                sx={{ mb: 2, mt: 2 }}
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                placeholder="Enter lead name"
                type="text"
            />
            <TextField
                multiline
                fullWidth
                name="description"
                label="Description"
                onChange={handleChange}
                placeholder="Enter description"
                type="text"
                rows={3}
            />
        </DialogContent>
        <DialogActions>
            <Button
                disabled={loading}
                onClick={() => {
                    if (!loading) handleClose();
                }}
            >
                Cancel
            </Button>
            <Button disabled={loading} variant="contained" type="submit">
                Submit {loading && <CircularProgress sx={{ ml: 1, height: `24px !important`, width: `24px !important` }} />}
            </Button>
        </DialogActions>
    </form>
);

export default CreateLead;
