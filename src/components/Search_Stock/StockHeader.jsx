import { useEffect, useState } from 'react'
import { Typography, Box, Grid, Button } from '@material-ui/core'
import RemoveRedEyeTwoToneIcon from '@material-ui/icons/RemoveRedEyeTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import protobuf from 'protobufjs'
const { Buffer } = require('buffer/');

function formatPrice(price) {
    return `${price.toFixed(2)}`;
}

const StockHeader = ({ stock }) => {
    //need to pass in stock ticker as parameter to websocket
    //Customise and design stock header
    const [wsStock, setStockPrice] = useState(null)

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
        <Box display='flex' width='45%' height='50px' marginTop='32px'>
            <Box display='flex' flex={6} flexDirection='row' justifyContent='flex-start' >
                <Typography variant='h3' style={{ fontWeight: 700, fontSize: 40 }}>{'AAPL' + stock}</Typography> &nbsp; &nbsp;
                {wsStock && <Typography variant='h3' style={{ fontSize: 40 }}>{formatPrice(wsStock.price)}</Typography>} &nbsp; &nbsp;
                <ArrowUpwardTwoToneIcon style={{ fill: 'green', marginTop: '16px' }} />
                <ArrowDownwardTwoToneIcon style={{ fill: 'red', marginTop: '16px' }} />
                <Typography variant='subtitle1' style={{ marginTop: '16px', color: 'green' }}>{'1.23%'}</Typography>
            </Box >
            <Button variant='contained' color='primary' size='small' marginRight='0px' flex={1} style={{ marginTop: '6px', marginBottom: '6px', textTransform: 'none' }}>
                <RemoveRedEyeTwoToneIcon /> &nbsp; Watch</Button>
        </Box>
    )
}

export default StockHeader
