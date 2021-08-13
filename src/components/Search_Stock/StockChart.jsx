import { useEffect, useState } from 'react'
import { Box, Divider, CircularProgress } from '@material-ui/core'
import { createChart } from 'lightweight-charts'

import ChartService from '../../services/ChartService'

const chartProperties = {
    height: 350,
    timeScale: {
        timeVisible: true,
        secondsVisible: false,
    }
}

const StockChart = ({ stock }) => {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const populateChart = async () => {
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
        populateChart();
        
    }, [stock])

    return (
        <Box width='55%' marginTop='40px' marginBottom='24px'>
            {isLoading ? <CircularProgress/> : 
                <div id='tvchart' width='100%'></div>
            }
            <Box height='12px' />
            <Divider />
        </Box>
    )
}

export default StockChart
