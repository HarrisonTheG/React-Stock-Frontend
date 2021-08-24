import { useEffect, useState } from 'react'
import { Typography, Box, Button } from '@material-ui/core'
import RemoveRedEyeTwoToneIcon from '@material-ui/icons/RemoveRedEyeTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import protobuf from 'protobufjs'

import WatchlistService from '../../services/WatchlistService'
import SessionDataService from '../../services/SessionDataService';

//configure toast message for this app
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const { Buffer } = require('buffer/');

function formatPrice(price) {
    return `${price.toFixed(2)}`;
}

function resetStock(latestPrice) {
    const stockPrice = document.getElementById('stockPrice')
    const stockChange = document.getElementById('stockChange')
    const stockIcon = document.getElementById('stockIcon')
    
    if (stockPrice !== null)
        stockPrice.innerHTML = `<Typography>${latestPrice} </Typography>`;

    if (stockIcon !== null)
        stockIcon.style.display = 'none';

    if (stockChange !== null)
        stockChange.innerHTML = ""
}

const StockHeader = ({stock, initialPrice, sentiment, companyName, user}) => {

    //need to pass in stock ticker as parameter to websocket
    //Customise and design stock header
    const [wsStock, setStockPrice] = useState(null)
    const [isWatched, setIsWatched] = useState(false)

    const onWatchChange = async () => {
        
        if (!isWatched){
            //post stock add to db
            await WatchlistService.addStockWatchlist(stock, user, companyName);
            SessionDataService.addStockToWatchlist(stock, companyName);
            
            toast.info('Added To Watchlist', { autoClose: 2500, position: toast.POSITION.BOTTOM_RIGHT })
        }

        setIsWatched(true);
    }

    //Will execute everytime this component re-renders. Should change to only if stock ticker changes (add stock dependency)
    useEffect(() => {
        //console.log("stock has changed")
        //check if this stock has been in user watchlist
        if(user !== null) {
        if(SessionDataService.checkIsStockWatched(stock)){
            
            setIsWatched(true)
            console.log(stock + ' is watched')
            }
        }
        //reset stock price info whenever stock changes and get the latest closing price of stock to display
        if(initialPrice !== null)
            resetStock(formatPrice(initialPrice));

        const ws = new WebSocket('wss://streamer.finance.yahoo.com');
        const root = protobuf.load('/YPricingData.proto', (error, root) => {

            if (error) {
                console.log(error);
            }

            const Yaticker = root.lookupType('yaticker');

            ws.onopen = function open() {
                console.log('connected');
                ws.send(JSON.stringify({
                    subscribe: [stock]
                }));
            };

            ws.onclose = function close() {
                console.log('disconnected');
            };

            ws.onmessage = function incoming(message) {
                console.log('coming message')
                //console.log(Yaticker.decode(new Buffer(message.data, 'base64')))
                const nextPrice = Yaticker.decode(new Buffer(message.data, 'base64'))
                setStockPrice(nextPrice);
                const stockIcon = document.getElementById('stockIcon')

                if (stockIcon !== null)
                    stockIcon.style.display = 'block'
            };
        });

        return function cleanup() {
            
            ws.close();
            
        };

    }, [stock])

    const watchEnabled = {
        marginTop: 12, textTransform: 'none' 
    }

    return (
    <Box display='flex' flexDirection='column' width='55%' height='60px' marginTop='32px' >
        <Box display='flex'>
        <Box align='left' flex={2}><Typography variant='caption' >{companyName}</Typography></Box>
        <Box align='right' flex={1}><Typography variant='caption' color='textSecondary'>Data from Yahoo Finance</Typography></Box>
        </Box>
        <Box display='flex'>   
            <Box display='flex' flex={6} flexDirection='row' >
                <Typography variant='h3' style={{ fontWeight: 700, fontSize: '40sp' }}>{stock}</Typography> &nbsp; &nbsp;

                {wsStock ? <Typography id='stockPrice' variant='h3' style={{ fontSize: '40sp' }}>{formatPrice(wsStock.price)}</Typography> 
                : <Typography id='stockPrice' variant='h3' style={{ fontSize: '40sp' }}>{initialPrice && formatPrice(initialPrice)}</Typography>} &nbsp; &nbsp;
                {wsStock && (<Typography id='stockIcon'> {(wsStock.change < 0.0) ? <ArrowDownwardTwoToneIcon style={{ fill: 'red', marginTop: '16px' }} /> :
                    <ArrowUpwardTwoToneIcon style={{ fill: 'green', marginTop: '16px' }} />}</Typography>)}

                {wsStock && <Typography id='stockChange' variant='subtitle1' style={{ marginTop: '16px', color: (wsStock.change < 0.0) ? 'red' : 'green' }}>{formatPrice(wsStock.change) + ' (' + formatPrice(wsStock.change / wsStock.price * 100) + '%)'}</Typography>}
            </Box >
            {isWatched ? <Button disabled onClick={onWatchChange} variant='outlined' color='primary' size='small' flex={1} style={watchEnabled}>
                <RemoveRedEyeTwoToneIcon /> &nbsp; Watching</Button> : 
                <div> {user == null ?  
                    <Button disabled variant='outlined' size='small' flex={1} style={watchEnabled}>
                    <RemoveRedEyeTwoToneIcon /> &nbsp; Watch</Button>
                    : 
                <Button onClick={onWatchChange} variant='contained' color='primary' size='small' flex={1} style={watchEnabled}>
                    <RemoveRedEyeTwoToneIcon /> &nbsp; Watch</Button>} </div> }

        </Box>
        <Box align="left" display='flex' flexDirection='row'>
                <Typography>{'Sentiment: '} &nbsp; </Typography>
                {(sentiment === 'neutral') ? 
                <Typography color='textSecondary' style={{fontWeight: '700'}}>{sentiment.toUpperCase()}</Typography> : 
                ((sentiment === 'negative') ? 
                <Typography color='error' style={{fontWeight: '700'}}>{sentiment.toUpperCase()}</Typography> :
                <span style={{color: 'green', fontWeight: '700'}}>{sentiment.toUpperCase()} </span>)}
        </Box>
    </Box>
    )


}

export default StockHeader
