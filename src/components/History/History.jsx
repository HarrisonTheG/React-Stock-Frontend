import {useState} from 'react'
import { Typography, Box, Grid, Button } from '@material-ui/core'
import ChartService from '../../services/ChartService'


//create button to scan for each watchlist stocks previous 200 days. Replace when pressed again.
const History = () => {
    const [sentiment, setSentiment] = useState(null);

    const onButtonClick = async () => {
        const sentimentData = await ChartService.getLatestStockSentiment('AAPL');
        console.log(sentimentData);
        setSentiment(sentimentData.data);
    }

    return (
        <Grid align="center" width="60%">
            <Box sx={{ height: '80px' }}></Box>
            <Typography>History page</Typography>
            <Button onClick={onButtonClick}>Get Apple Sentiment</Button>
            <Typography>{sentiment}</Typography>
        </Grid>
    )
}

export default History
