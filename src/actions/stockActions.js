class stockActions {
  changeStock(stock) {
    return {
      type: "STOCK_CHANGE",
      payload: stock,
    };
  }

  removeStock() {
    return {
      type: "STOCK_REMOVE",
      payload: null,
    };
  }
}

export default new stockActions();
