import {useState, useEffect} from 'react'
import ChartService from '../services/ChartService'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { createChart } from 'lightweight-charts'


const MobileStockChart = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    var pathVariable = props.match.params.ticker;

    const chartProperties = {
        height: 650,
        timeScale: {
            timeVisible: true,
            secondsVisible: false,
        }
    }

    useEffect(()=> {
  
        const populateChart = async (stock) => {
            try {
                setIsLoading(true);
                const req = await ChartService.getChartCandleData(stock);
                const data = req.data;

                //console.log(data);
                const cdata = await data.map(d => { return { time: d.timestamp, open: parseFloat(d.open), high: parseFloat(d.high), low: parseFloat(d.low), close: parseFloat(d.close) } })

                setIsLoading(false);
                
                //Find html element in document to place the chart at
                const chartElement = document.getElementById('tvchart');
                chartElement.innerHTML = "";
                const chart = createChart(chartElement, chartProperties);
                const candleSeries = chart.addCandlestickSeries();
                //plot the graph with data from API
                candleSeries.setData(cdata);

            } catch (error) {
                console.log(error);
            }
        }
    

        if(pathVariable !== ':ticker'){
            populateChart(pathVariable);
        }

    },[pathVariable])

    return (
        <Box width='98%' marginLeft='auto' marginRight='auto' marginTop='12px' marginBottom='12px'>
            <Box display='flex' flexDirection='column'><Typography variant='h5'>{(pathVariable + " Chart")}</Typography></Box>
            {isLoading ? <Box align='center' marginTop='120px'><CircularProgress /></Box> : 
                <div id='tvchart' width='100%'></div>
            }
        </Box>
    )
}

export default MobileStockChart
