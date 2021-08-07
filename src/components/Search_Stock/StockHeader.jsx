import { useEffect, useState } from 'react'
import { Typography, Box, Grid } from '@material-ui/core'
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
        <Box display='flex' justifyContent='flex-start' width='45%'>
            <h1>{'Stock Info of ' + stock}</h1> &nbsp;
            {wsStock && <h1>{formatPrice(wsStock.price)}</h1>}
        </Box>
    )
}

export default StockHeader
