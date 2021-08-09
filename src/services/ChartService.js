import axios from 'axios'

const STOCK_API_URL = 'http://localhost:8082/getCandleData/';
// https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000
class ChartService {

    getChartCandleData(ticker){
        const url = STOCK_API_URL + ticker; 
        return axios.get(url);
    }
}

export default new ChartService();