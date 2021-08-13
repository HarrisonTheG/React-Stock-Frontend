import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, TextField } from '@material-ui/core'


const AddComment = ({open, setAddComment}) => {

    const handleSubmissionAndClose = () => {
        //handle posting of comment here

        setAddComment();
    }

    return (
        
    <Dialog open={open} onClose={setAddComment} aria-labelledby="form-dialog-title" fullWidth maxWidth='xs'>
        <DialogTitle id="form-dialog-title">Post Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="addComment"
            label="Comment"
            type="text"
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setAddComment} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmissionAndClose} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
     
    )
}

export default AddComment

