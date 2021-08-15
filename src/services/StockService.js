import axios from "axios";

const STOCK_COMMENT_API_URL = "http://localhost:5000/comments/";

class StockService {
  getStockComments(ticker) {
    const url = STOCK_COMMENT_API_URL + ticker;
    return axios.get(url);
  }
}

export default new StockService();
