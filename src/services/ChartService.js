import axios from "axios";

const STOCK_CANDLE_API_URL = "http://localhost:5000/getCandleData/";
const STOCK_PRICE_API_URL = "http://localhost:5000/getLatestPrice/";
const STOCK_SENTIMENT_API_URL = "http://localhost:5000/getSentiment/";

// https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000
class ChartService {
  getChartCandleData(ticker) {
    const url = STOCK_CANDLE_API_URL + ticker;
    return axios.get(url);
  }

  getLatestClosingStockPrice(ticker) {
    const url = STOCK_PRICE_API_URL + ticker;
    return axios.get(url);
  }

  getLatestStockSentiment(ticker) {
    const url = STOCK_SENTIMENT_API_URL + ticker;
    return axios.get(url);
  }
}

export default new ChartService();
