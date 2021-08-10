import { useEffect } from 'react'
import { Box, Divider } from '@material-ui/core'
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

    useEffect(() => {

        const chartElement = document.getElementById('tvchart');
        chartElement.innerHTML = "";
        const chart = createChart(chartElement, chartProperties);
        const candleSeries = chart.addCandlestickSeries();

        const populateChart = async () => {
            try {
                const req = await ChartService.getChartCandleData(stock);
                const data = req.data;

                //console.log(data);
                const cdata = await data.map(d => { return { time: d.timestamp, open: parseFloat(d.open), high: parseFloat(d.high), low: parseFloat(d.low), close: parseFloat(d.close) } })
                //plot the graph with data from API
                candleSeries.setData(cdata);

            } catch (error) {
                console.log(error);
            }
        }
        populateChart();

    }, [stock])

    return (
        <Box width='55%' marginTop='24px' marginBottom='24px'>
            <div id='tvchart' width='100%'></div>
            <Box height='12px' />
            <Divider />
        </Box>
    )
}

export default StockChart
