import axios from "axios";

const STOCK_CANDLE_API_URL = "http://localhost:5000/getCandleData/";
const STOCK_PRICE_API_URL = "http://localhost:5000/getLatestPrice/";
const STOCK_SENTIMENT_API_URL = "http://localhost:5000/getSentiment/";
const STOCK_TOP5_API_URL = "http://localhost:5000/getStockSymbol/";

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

  getTop5Stock(searchTerm) {
    const url = STOCK_TOP5_API_URL + searchTerm;
    return axios.get(url);
  }
}

export default new ChartService();
