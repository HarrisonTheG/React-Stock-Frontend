import SessionService from "../session/SessionService";

class SessionDataService {
  //user session
  getSessionUser() {
    return SessionService.getSessionStorageOrDefault("username", null);
  }

  setSessionUser(username) {
    SessionService.setSessionStorage("username", username);
    return true;
  }

  //watchlist session array of obj: [{stockticker: , stockname: , username: , }, ...]
  getUserWatchlist() {
    const user = this.getSessionUser();
    if (user !== null) {
      //return an array of js objects [{stockticker: , stockname: , username: , }, ...]
      return JSON.parse(
        SessionService.getSessionStorageOrDefault("watchlist", null)
      );
    }
    return false;
  }

  setUserWatchlist(stockTickerArr) {
    const user = this.getSessionUser();
    if (user !== null) {
      SessionService.setSessionStorage(
        "watchlist",
        JSON.stringify(stockTickerArr)
      );

      return true;
    }
    return false;
  }

  addStockToWatchlist(ticker, companyName) {
    const user = this.getSessionUser();
    if (user !== null) {
      const stockToAdd = {
        stockticker: ticker,
        stockname: companyName,
        username: user,
      };
      var watchlist = this.getUserWatchlist();
      watchlist = [stockToAdd, ...watchlist];
      this.setUserWatchlist(watchlist);
    }
  }

  deleteStockToWatchlist(ticker) {
    const user = this.getSessionUser();
    if (user !== null) {
      var watchlist = this.getUserWatchlist();
      if (watchlist) {
        const stockToDelete = watchlist.find((x) => x.stockticker === ticker);
        var stockIndex = watchlist.indexOf(stockToDelete);
        watchlist.splice(stockIndex, 1);
        this.setUserWatchlist(watchlist);
      }
    }
  }

  checkIsStockWatched(ticker) {
    const watchlist = this.getUserWatchlist();
    if (watchlist !== null) {
      const stockToFind = watchlist.find((x) => x.stockticker === ticker);
      if (stockToFind) {
        return true;
      }
    }
    return false;
  }

  //candle history session data {candle: , datetime: , stockname: , stockticker: , username: }
  getCandleHistory() {
    return JSON.parse(
      SessionService.getSessionStorageOrDefault("candlehistory", null)
    );
  }

  setCandleHistory(candleHistoryArr) {
    SessionService.setSessionStorage(
      "candlehistory",
      JSON.stringify(candleHistoryArr)
    );
  }
}

export default new SessionDataService();
