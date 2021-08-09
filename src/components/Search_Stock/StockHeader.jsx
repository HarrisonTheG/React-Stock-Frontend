import { useEffect, useState } from 'react'
import { Typography, Box, Button } from '@material-ui/core'
import RemoveRedEyeTwoToneIcon from '@material-ui/icons/RemoveRedEyeTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import protobuf from 'protobufjs'

//configure toast message for this app
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const { Buffer } = require('buffer/');

function formatPrice(price) {
    return `${price.toFixed(2)}`;
}

const StockHeader = ({ stock }) => {
    //need to pass in stock ticker as parameter to websocket
    //Customise and design stock header
    const [wsStock, setStockPrice] = useState(null)
    const [isWatched, setIsWatched] = useState(false)

    const onWatchChange = () => {
        if (!isWatched)
            toast.info('Added To Watchlist', { autoClose: 2500, position: toast.POSITION.BOTTOM_RIGHT })

        setIsWatched(!isWatched);
    }

    //Will execute everytime this component re-renders. Should change to only if stock ticker changes (add dependency)
    useEffect(() => {
        const ws = new WebSocket('wss://streamer.finance.yahoo.com');
        const root = protobuf.load('./YPricingData.proto', (error, root) => {

            if (error) {
                console.log(error);
            }

            const Yaticker = root.lookupType('yaticker');

            ws.onopen = function open() {
                console.log('connected');
                ws.send(JSON.stringify({
                    subscribe: ['ETH-USD']
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
            };
        });

    }, [])

    return (
        <Box display='flex' width='55%' height='50px' marginTop='32px'>
            <Box display='flex' flex={6} flexDirection='row' justifyContent='flex-start' >
                <Typography variant='h3' style={{ fontWeight: 700, fontSize: '40sp' }}>{'ETHUSD' + stock}</Typography> &nbsp; &nbsp;

                {wsStock && <Typography variant='h3' style={{ fontSize: '40sp' }}>{formatPrice(wsStock.price)}</Typography>} &nbsp; &nbsp;
                {wsStock && (wsStock.change < 0.0) ? <ArrowDownwardTwoToneIcon style={{ fill: 'red', marginTop: '16px' }} /> :
                    <ArrowUpwardTwoToneIcon style={{ fill: 'green', marginTop: '16px' }} />}

                {wsStock && <Typography variant='subtitle1' style={{ marginTop: '16px', color: 'green' }}>{formatPrice(wsStock.change) + ' (' + formatPrice(wsStock.change / wsStock.price * 100) + '%)'}</Typography>}
            </Box >

            {isWatched ? <Button onClick={onWatchChange} variant='outlined' color='primary' size='small' marginRight='0px' flex={1} style={{ marginTop: '6px', marginBottom: '6px', textTransform: 'none' }}>
                <RemoveRedEyeTwoToneIcon /> &nbsp; Watching</Button> :
                <Button onClick={onWatchChange} variant='contained' color='primary' size='small' marginRight='0px' flex={1} style={{ marginTop: '6px', marginBottom: '6px', textTransform: 'none' }}>
                    <RemoveRedEyeTwoToneIcon /> &nbsp; Watch</Button>}

        </Box>
    )
}

export default StockHeader
