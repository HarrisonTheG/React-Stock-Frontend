import {useState, useEffect} from 'react'
import { Paper, Grid, Typography, Box, Button, IconButton } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import AddComment from './AddComment'
import StockService from '../../services/StockService'
import ChartService from '../../services/ChartService'

const ButtonStyle = {
        flex: 5,
        textTransform: 'none',
        margin: '4px',
}

const Comment = ({ stock, companyName, user }) => {
    
    const [isCommentShown, setShow] = useState(false)
    const [isAddComment, setIsAddComment] = useState(false)
    const [comments, setComments] = useState([null])
    const [commentSentiment, setCommentSentiment] = useState(null)
    //comments is array of object {user: , timestamp: , content: }

    const addComments = (newComment) => {
        setComments([newComment, ...comments]);
    }
    
    const fetchComments = async (ticker) => {
        
        try{
            const req = await StockService.getStockComments(ticker);
            const commentData = req.data;
            // console.log(commentData)
          
            setComments(commentData.map((x) => {
                return ({user: x.username, timestamp: x.commentDateTime, content: x.comment});
            }))

        }catch(error){
            console.log(error)
        }
    }

    const fetchCommentSentiment = async (ticker) => {
        try {
            const commentSentimentReq = await ChartService.getLatestStockCommentSentiment(ticker);
            const commentSentimentData = commentSentimentReq.data;
            // console.log(commentSentimentData);
            setCommentSentiment(commentSentimentData);
        } catch(error) {
            console.log(error)
        }
    }

    const fetchSentimentAndComment = async (stock) => {
        await fetchComments(stock);
        await fetchCommentSentiment(stock);
    }

    useEffect( () => {
        //fetchComments(stock)
        fetchSentimentAndComment(stock);
    }, [stock])

    // useEffect( () => {
    //     fetchCommentSentiment(stock)
    // }, [stock])

    const showButtonClick = () => {

        if(!isCommentShown){
            //retrieve all comments on specific stock
        }

        setShow(!isCommentShown);
    }

    const addCommentClick = () => {
        setIsAddComment(!isAddComment);
    }

    return (
        <Box style={{width: '55%', marginTop: '24px', padding: '12px'}}>
            <Box display='flex' style={{marginBottom: '16px', m: '8px'}} >
        <Typography style={{flex: 30, textAlign: 'left', fontSize: 24}}>Comments </Typography>
        {user == null ? <IconButton disabled style={{flex: 1, marginRight: '16px'}}><AddCommentOutlinedIcon /></IconButton> : 
        <IconButton onClick={addCommentClick} style={{flex: 1, marginRight: '16px'}} color='primary'><AddCommentOutlinedIcon /></IconButton>
        }
        {isCommentShown ? <Button onClick={showButtonClick} style={ButtonStyle} color='primary' variant='outlined'>
            Hide</Button> : <Button onClick={showButtonClick} style={ButtonStyle} color='primary' variant='contained'>
            Show</Button> }
            </Box>
        {isCommentShown && (commentSentiment !== null) && (comments.length !== 0 ? 
        <Box align="left" display='flex' flexDirection='row'>
        <Typography>{'Comments Sentiment: '} &nbsp; </Typography>
        {(commentSentiment === 'neutral') ? 
        <Typography color='textSecondary' style={{fontWeight: '700'}}>{commentSentiment.toUpperCase()}</Typography> : 
        ((commentSentiment === 'negative') ? 
        <Typography color='error' style={{fontWeight: '700'}}>{commentSentiment.toUpperCase()}</Typography> :
        <span style={{color: 'green', fontWeight: '700'}}>{commentSentiment.toUpperCase()} </span>)}
        <p></p>
        </Box>
        : <div></div>)}
        {isCommentShown && (comments.length !== 0 ?
        <div>{comments.map((comment, index) => ( <Paper key={index} style={{padding: '16px', marginBottom: '16px'}} elevation={2} >
        <Grid container wrap="nowrap" spacing={2} >
            <Grid item>
                <AccountCircleIcon />
            </Grid>
            <Grid item xs zeroMinWidth>
                <Typography style={{ margin: 0, textAlign: "left" }}>{comment.user}</Typography>
                <p style={{ textAlign: "left", textAlign: 'justify', fontSize: '14px', marginRight: '16px' }}>
                    {comment.content}
                </p>
                <p style={{ textAlign: "left", color: "gray", fontSize: '12px' }}>
                    {'posted on ' + comment.timestamp}
                </p>
            </Grid>
        </Grid>
    </Paper>))}</div>
        : <Typography>There are no comments yet!</Typography>) }

        <AddComment open={isAddComment} setAddComment={addCommentClick} addComments={addComments} stock={stock} user={user} companyName={companyName}/>

        </Box>
    )
}

export default Comment
