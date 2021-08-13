import { Box, Grid } from '@material-ui/core'
import { useState, useEffect } from 'react'
import StockChart from './StockChart'
import Comment from './Comment'
import SearchBar from './SearchBar'
import StockHeader from './StockHeader'
import ChartService from '../../services/ChartService'

import CircularProgress from '@material-ui/core/CircularProgress';


const SearchStock = (props) => {

    const [isLoading, setIsLoading] = useState(false)

    const [stockInfo, setStockInfo] = useState({
        stockTicker: null,
        initialPrice: null,
        sentiment: null
    })

    const getInitialPrice = async (ticker) => {
        setIsLoading(true);
        const req = await ChartService.getLatestClosingStockPrice(ticker);
        const sentimentReq = await ChartService.getLatestStockSentiment(ticker);
        const latestPrice = parseFloat(req.data.close);
        const sentimentData = sentimentReq.data;

        setIsLoading(() => {
            setStockInfo({
            stockTicker: ticker,
            initialPrice: latestPrice,
            sentiment: sentimentData
        });
        return false;}
        );

    }

    //create a class of stock and with its initial value

    //search Bar callbacks
    const sendTermFromIcon = () => {
        var value = ''
        value = document.getElementById('searchField').value;
        if (value !== ''){
            getInitialPrice(value);
        }
    }

    const sendTermFromEnter = (e) => {
        var value = ''
        const searchField = document.getElementById('searchField');
        value = searchField.value;
        if (e !== null && e.key === 'Enter' && value !== '') { //comes from enter
            getInitialPrice(value);
            searchField.blur();
        }
    }
   
   const pathVariable = props.match.params.ticker;

    useEffect(() => {
        if(pathVariable !== ':ticker'){
            getInitialPrice(pathVariable);
        }
    }, [pathVariable]);

    return (
        
        <Grid align='center' width='55%'>
            
            <Box sx={{ height: '80px' }}></Box>
            <SearchBar sendFromIcon={sendTermFromIcon} sendFromEnter={sendTermFromEnter}></SearchBar>
            {isLoading ? <CircularProgress style={{marginTop: 160}}/> : <div>
            {stockInfo.stockTicker ? <div><StockHeader stock={stockInfo.stockTicker} initialPrice={stockInfo.initialPrice} sentiment={stockInfo.sentiment} />
            <StockChart stock={stockInfo.stockTicker} />
            <Comment stock={stockInfo.stockTicker} /> </div>: <div></div>}</div>

            }
        </Grid>
       
    );
}

export default SearchStock
