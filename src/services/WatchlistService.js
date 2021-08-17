import axios from "axios";

const STOCK_WATCHLIST_API_URL = "http://localhost:5000/watchlist/";

class WatchlistService {
  getStockWatchlist(user) {
    const url = STOCK_WATCHLIST_API_URL + user;
    return axios.get(url);
  }

  addStockWatchlist(ticker, user) {
    const url = STOCK_WATCHLIST_API_URL + "add";
    const stockObj = { stockticker: ticker, username: user };
    return axios.post(url, JSON.stringify(stockObj), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  deleteStockWatchlist(ticker, user) {
    const url = STOCK_WATCHLIST_API_URL + "delete";
    const stockObj = { stockticker: ticker, username: user };
    return axios({
      method: "DELETE",
      url: url,
      data: stockObj,
    });
  }
}

export default new WatchlistService();
