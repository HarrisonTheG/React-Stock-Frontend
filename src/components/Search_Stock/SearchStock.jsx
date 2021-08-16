import { Box, Grid } from '@material-ui/core'
import { useState, useEffect } from 'react'
import StockChart from './StockChart'
import Comment from './Comment'
import SearchBar from './SearchBar'
import StockHeader from './StockHeader'
import ChartService from '../../services/ChartService'
import ErrorPage from '../Error/ErrorPage'

import CircularProgress from '@material-ui/core/CircularProgress';
import SessionService from '../../session/SessionService'
import sessionService from '../../session/SessionService'


const SearchStock = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false);

    const [stockInfo, setStockInfo] = useState({
        stockTicker: null,
        companyName: null,
        initialPrice: null,
        sentiment: null
    })

    const getInitialPrice = async (ticker) => {

    try{
        if(isError)
            setIsError(() => {
                setIsLoading(true);
                return false;
            });
        else
            setIsLoading(true);

        const req = await ChartService.getLatestClosingStockPrice(ticker);
        const sentimentReq = await ChartService.getLatestStockSentiment(ticker);
        const latestPrice = parseFloat(req.data.close);
        const company = req.data.description;
        const sentimentData = sentimentReq.data;
        

        setIsLoading(() => {
            setStockInfo({
            stockTicker: ticker,
            companyName: company,
            initialPrice: latestPrice,
            sentiment: sentimentData
        });
        return false;});

    } catch (error){
        setIsError(true);
        console.log(error);
    } 

    }
    var pathVariable = props.match.params.ticker;
    var currentStock = sessionService.getSessionStorageOrDefault('currentStock', null);

    useEffect(()=>{
        pathVariable = props.match.params.ticker;
        currentStock = sessionService.getSessionStorageOrDefault('currentStock', null);
        console.log(currentStock);
    })
   

    useEffect(() => {
        if(pathVariable !== ':ticker'){
            getInitialPrice(pathVariable);
            SessionService.setSessionStorage('currentStock', pathVariable);
        } else if (pathVariable == ':ticker' && currentStock !== null){
            getInitialPrice(currentStock);
        }
    }, [pathVariable]);

    return (
        
        <Grid align='center' width='55%'>
            
            <Box sx={{ height: '80px' }}></Box>
            <SearchBar></SearchBar>
            {isError ? <ErrorPage /> : <div>
            {isLoading ? <CircularProgress style={{marginTop: 160}}/> : <div>
            {stockInfo.stockTicker ? <div><StockHeader 
                stock={stockInfo.stockTicker} initialPrice={stockInfo.initialPrice} 
                sentiment={stockInfo.sentiment} companyName={stockInfo.companyName}  />
            <StockChart stock={stockInfo.stockTicker} />
            <Comment stock={stockInfo.stockTicker} /> </div>: <div></div>}</div>

                } </div>
            }
        </Grid>
       
    );
}

export default SearchStock
