import axios from "axios";

const STOCK_COMMENT_API_URL = "http://localhost:5000/comments/";

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
}

export default new StockService();
