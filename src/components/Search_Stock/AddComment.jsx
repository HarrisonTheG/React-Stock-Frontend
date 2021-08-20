import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from '@material-ui/core'
import StockService from '../../services/StockService'


const AddComment = ({open, setAddComment, addComments, stock, user}) => {

    const handleSubmissionAndClose = async () => {
        //handle posting of comment here
        
        const commentContent = document.getElementById('addComment').value;
        const postComment = {username: user, commentDateTime: Math.floor(Date.now()/1000), stockticker: stock, comment: commentContent}

        try{
            const Resp = await StockService.postStockComment(stock, postComment)
            const data = Resp.data;
            //console.log(Resp.data)
            const comment = {...data, user: data.username, timestamp: data.commentDateTime, content: data.comment}
            //console.log(comment);
            addComments(comment);
        }catch (error){
          console.log(error)
        }

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

