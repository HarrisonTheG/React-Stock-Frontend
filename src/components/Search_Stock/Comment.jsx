import {useState} from 'react'
import { Paper, Grid, Typography, Box, Button, IconButton } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';

const ButtonStyle = {
        flex: 5,
        textTransform: 'none',
        margin: '4px',
}

const Comment = ({ stock }) => {

    const [isCommentShown, setShow] = useState(false)

    const buttonClick = () => {

        if(!isCommentShown){
            //retrieve all comments on specific stock
        }

        setShow(!isCommentShown);
    }

    return (
        <Box style={{width: '55%', marginTop: '24px', padding: '12px'}}>
            <Box display='flex' style={{marginBottom: '16px', m: '8px'}} >
        <Typography style={{flex: 30, textAlign: 'left', fontSize: 24}}>Comments </Typography>
        <IconButton style={{flex: 1, marginRight: '16px'}} color='primary'><AddCommentOutlinedIcon /></IconButton>
        {isCommentShown ? <Button onClick={buttonClick} style={ButtonStyle} color='primary' variant='outlined'>
            Hide Comment</Button> : <Button onClick={buttonClick} style={ButtonStyle} color='primary' variant='contained'>
            Show Comment</Button> }
            </Box>
        {isCommentShown && <Paper style={{padding: '16px'}} elevation={2} >
            <Grid container wrap="nowrap" spacing={2} >
                <Grid item>
                    <AccountCircleIcon />
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Typography style={{ margin: 0, textAlign: "left" }}>Donald MF Trump</Typography>
                    <p style={{ textAlign: "left", textAlign: 'justify', fontSize: '14px', marginRight: '16px' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray", fontSize: '12px' }}>
                        posted 1 minute ago
                    </p>
                </Grid>
            </Grid>
        </Paper>}
        
        </Box>
    )
}

export default Comment
