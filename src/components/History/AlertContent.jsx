import React from 'react'
import { Typography, Box, Paper} from '@material-ui/core'

const fontCandleStyle = {
    green : {
        color: 'green', fontWeight: 700
    },
    red : {
        color: 'red', fontWeight: 700
    }
}
const candleTypes = ['Bullish Engulfing', 'Bearish Engulfing', 'Morning Star', 'Evening Star'];
//candleHistory = {candle: , datetime: , stockname: , stockticker: , username: } 
const AlertContent = ({candleHistory}) => {
    
    return (
        <Box display='flex' flexDirection='column'>
        { candleHistory ? <div>{ candleHistory.map((x, index) => (
            <Paper key={index} style={{padding: 16, marginBottom: 12}}>
            <Box display='flex' flexDirection='column'>
                <Box display='flex'>
                <Typography variant='subtitle2' style={{marginBottom: 12, fontWeight: 700}}>{x.stockticker + ' alert on'} &nbsp;</Typography>
                <Typography variant='subtitle2' style={{fontWeight: 700}} color='primary'>{x.datetime}</Typography></Box>
                {x.candle === candleTypes[0] ? <Typography>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={fontCandleStyle.green}>Bullish </span>Engulfing Pattern has appeared!</Typography> : 
                    (x.candle === candleTypes[1] ? 
                    <Typography>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={fontCandleStyle.red}>Bearish </span>Engulfing Pattern has appeared!</Typography> : 
                        (x.candle === candleTypes[2] ? 
                        <Typography>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style={fontCandleStyle.green}>Bullish </span>Morning Star Pattern has appeared!</Typography> : 
                        <Typography>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style={fontCandleStyle.red}>Bearish </span>Evening Star Pattern has appeared!</Typography>
                        )
                    )
                    }
            </Box>
            </Paper> 
        ))}</div>
              :   
        <Box> <Typography>There is no selected stock candle occurences or no active candles in Watchlist!</Typography></Box>
    }
        
        
        </Box>
    )
}

export default AlertContent
