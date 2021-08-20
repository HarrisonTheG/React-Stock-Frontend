import {useState, useRef, useEffect} from 'react'
import { Typography, Box, Button, Divider } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart';
import FormSelect from './FormSelect'
import AlertContent from './AlertContent'
import SessionService from '../../session/SessionService'
import SessionDataService from '../../services/SessionDataService'
import StockService from '../../services/StockService'


//create button to scan for each watchlist stocks previous 200 days. Replace when pressed again.
const History = () => {
    const [candleHistory, setCandleHistory] = useState(null);
    const selectedStock = useRef('');
    const [isLogin, setIsLogin] = useState(false);
    const [watchStock, setWatchStock] = useState(null);

    var user = SessionService.getSessionStorageOrDefault('username', null);
    var history = SessionDataService.getCandleHistory();
    useEffect(() => {
        //console.log(SessionService.getSessionStorageOrDefault('username', null));
        user = SessionService.getSessionStorageOrDefault('username', null);
        if(user){
            //load user watchlist stocks
            setWatchStock(() => {
                //console.log(SessionDataService.getUserWatchlist());

                setIsLogin(() => {
                    history = SessionDataService.getCandleHistory();
                    if(history){
                        selectedStock.current = history[0].stockticker;
                        setCandleHistory(history);
                        }
                    return (user !== null);
                });
                return SessionDataService.getUserWatchlist();
            });
        }
      }, [user])

    const setSelectedStock = (value) => {
        selectedStock.current = value;
    }

    const onScanClick = async (stock) => {
        if(stock)
        {
            //console.log('selected stock is ' + stock);
            //get candlestick info from REST API
            const req = await StockService.getScanStockCandleResult(stock, user);
            const alerts = req.data;
            console.log(alerts);
            //{candle: , datetime: , stockname: , stockticker: , username: }
            //Set session data
            if(alerts){
            if(alerts.length !== 0){
                SessionDataService.setCandleHistory(alerts);
                console.log(SessionDataService.getCandleHistory());
                setCandleHistory(alerts);
            } else {
                SessionDataService.setCandleHistory(null);
                setCandleHistory(null);
            }} 
        
        } 

    }

    return (
        <Box marginLeft='auto' marginRight='auto' width="55%">
            { isLogin ? <div>
            <Box sx={{ height: '80px' }}></Box>
            <Typography variant='h5' align='left'> Alert History </Typography>
            <Box sx={{ height: '24px' }}></Box>
            <Box display='flex' flexDirection='row'>
                <FormSelect sendSelectedStock={setSelectedStock} watchStock={watchStock}/>
                <Box style={{width: 8}} />
                <Button variant='contained' color='primary' style={{marginBottom: 22}}
                    onClick = {() => onScanClick(selectedStock.current)}><BarChartIcon />&nbsp;scan</Button>
            </Box>
            <Box sx={{ height: '16px' }}></Box>
            <Divider />
            <Box sx={{ height: '24px' }}></Box>
            <AlertContent candleHistory={candleHistory}/> </div> : 

            <Box style={{marginTop: 120}}  marginLeft='auto' marginRight='auto'>
          <Typography variant='h5' align='center'>Please Login to unlock this feature</Typography></Box>
          }
        </Box>
    )
}

export default History
