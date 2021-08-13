import {useState, useRef} from 'react'
import { Typography, Box, Button, Divider } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart';
import ChartService from '../../services/ChartService'
import FormSelect from './FormSelect'
import AlertContent from './AlertContent'


//create button to scan for each watchlist stocks previous 200 days. Replace when pressed again.
const History = () => {
    const [candleHistory, setCandleHistory] = useState(null);
    const selectedStock = useRef('')

    const setSelectedStock = (value) => {
        selectedStock.current = value;
    }

    const onScanClick = async (stock) => {
        if(stock !== '')
            console.log('selected stock is ' + stock);
        //get candlestick info from REST API
        //setCandleHistory();

    }

    return (
        <Box marginLeft='auto' marginRight='auto' width="55%">
            <Box sx={{ height: '80px' }}></Box>
            <Typography variant='h5' align='left'> Alert History </Typography>
            <Box sx={{ height: '24px' }}></Box>
            <Box display='flex' flexDirection='row'>
                <FormSelect sendSelectedStock={setSelectedStock}/>
                <Box style={{width: 8}} />
                <Button variant='contained' color='primary' style={{marginBottom: 22}}
                    onClick = {() => onScanClick(selectedStock.current)}><BarChartIcon />&nbsp;scan</Button>
            </Box>
            <Box sx={{ height: '16px' }}></Box>
            <Divider />
            <Box sx={{ height: '24px' }}></Box>
            <AlertContent />
        </Box>
    )
}

export default History
