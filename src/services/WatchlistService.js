import axios from "axios";

const STOCK_WATCHLIST_API_URL =
  "http://t11adproject-env.eba-hyey7nfu.ap-southeast-1.elasticbeanstalk.com/watchlist/";
const CANDLE_WATCHLIST_API_URL =
  "http://t11adproject-env.eba-hyey7nfu.ap-southeast-1.elasticbeanstalk.com/watchlist/candlewatchlist/";

// const STOCK_WATCHLIST_API_URL = "http://localhost:5000/watchlist/";
// const CANDLE_WATCHLIST_API_URL =
//   "http://localhost:5000/watchlist/candlewatchlist/";

class WatchlistService {
  getStockWatchlist(user) {
    const url = STOCK_WATCHLIST_API_URL + user;
    return axios.get(url);
  }

  addStockWatchlist(ticker, user, companyName) {
    const url = STOCK_WATCHLIST_API_URL + "add";
    const stockObj = {
      stockticker: ticker,
      username: user,
      stockname: companyName,
    };
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

  //candle in watchlist methods
  getWatchlistCandle(ticker, user) {
    //if dateTimeActive is -1 then it is null
    const url = CANDLE_WATCHLIST_API_URL;
    const candleObj = {
      username: user,
      stockticker: ticker,
    };
    return axios.post(url, JSON.stringify(candleObj), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setWatchlistCandle(candleArr) {
    const url = CANDLE_WATCHLIST_API_URL + "update";
    return axios.post(url, JSON.stringify(candleArr), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new WatchlistService();
