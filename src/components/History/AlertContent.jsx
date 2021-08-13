import React from 'react'
import { Typography, Box, Button, Paper} from '@material-ui/core'

const fontCandleStyle = {
    green : {
        color: 'green', fontWeight: 700
    },
    red : {
        color: 'red', fontWeight: 700
    }
}


const AlertContent = () => {
    return (
        <Box display='flex' flexDirection='column'>

        <Paper style={{padding: 16, marginBottom: 12}}>
            <Box display='flex' flexDirection='column'>
                <Box display='flex'>
                <Typography variant='subtitle2' style={{marginBottom: 12, fontWeight: 700}}>Alerts from &nbsp; </Typography>
                <Typography variant='subtitle2' style={{fontWeight: 700}} color='primary'>2/2/2001</Typography></Box>
                <Typography>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={fontCandleStyle.green}>Bullish </span>Engulfing Pattern has appeared!</Typography>
                <Typography>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={fontCandleStyle.red}>Bearish </span>Engulfing Pattern has appeared!</Typography>
            </Box>
        </Paper>
        
        </Box>
    )
}

export default AlertContent
