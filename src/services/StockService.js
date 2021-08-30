import axios from "axios";

const STOCK_COMMENT_API_URL =
  "http://t11adproject-env.eba-hyey7nfu.ap-southeast-1.elasticbeanstalk.com//comments/";
const STOCK_CANDLE_SCAN_API_URL =
  "http://t11adproject-env.eba-hyey7nfu.ap-southeast-1.elasticbeanstalk.com/candlehistory";

// const STOCK_COMMENT_API_URL = "http://localhost:5000/comments/";
// const STOCK_CANDLE_SCAN_API_URL = "http://localhost:5000/candlehistory";

class StockService {
  getStockComments(ticker) {
    const url = STOCK_COMMENT_API_URL + ticker;
    return axios.get(url);
  }

  postStockComment(ticker, comment) {
    const url = STOCK_COMMENT_API_URL + ticker;
    return axios.post(url, JSON.stringify(comment), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getScanStockCandleResult(ticker, user) {
    const url = STOCK_CANDLE_SCAN_API_URL;
    const userStock = { username: user, stockticker: ticker };
    return axios.post(url, JSON.stringify(userStock), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new StockService();
