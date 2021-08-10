import { Box, Grid } from '@material-ui/core'
import { useState, useRef } from 'react'
import StockChart from './StockChart'
import Comment from './Comment'
import SearchBar from './SearchBar'
import StockHeader from './StockHeader'
import ChartService from '../../services/ChartService'

const SearchStock = () => {

    //const [searchTerm, setTerm] = useState('');
    
    const [stockInfo, setStockInfo] = useState({
        stockTicker: null,
        initialPrice: null
    })

    const getInitialPrice = async (ticker) => {
        const req = await ChartService.getLatestClosingStockPrice(ticker);
        const latestPrice = parseFloat(req.data.close);
        setStockInfo({
            stockTicker: ticker,
            initialPrice: latestPrice
        });
        
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

    return (
        <Grid align='center' width='55%'>
            <Box sx={{ height: '80px' }}></Box>
            <SearchBar sendFromIcon={sendTermFromIcon} sendFromEnter={sendTermFromEnter}></SearchBar>
            <StockHeader stock={stockInfo.stockTicker} initialPrice={stockInfo.initialPrice} />
            <StockChart stock={stockInfo.stockTicker} />
            <Comment stock={stockInfo.stockTicker} />
        </Grid>
    );
}

export default SearchStock
