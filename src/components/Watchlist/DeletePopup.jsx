import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core'

const DeletePopup = ({open, setIsDeleteBox, stockUser}) => {

    const handleDeletionAndClose = () => {
        //delete stock watchlist from user and remove all alert settings

        setIsDeleteBox();
    }

    return (
        <Dialog open={open} onClose={setIsDeleteBox} aria-labelledby="form-dialog-title" fullWidth maxWidth='xs'>
        <DialogTitle id="form-dialog-title" style={{color: 'red'}}>{'Delete ' + stockUser.ticker + ' from Watchlist?'}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            *Note that your notification settings for this stock will be deleted as well!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setIsDeleteBox} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletionAndClose} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default DeletePopup
