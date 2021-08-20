const stockReducer = (state = { currentStock: "AAPL" }, action) => {
  switch (action.type) {
    case "STOCK_CHANGE":
      state = { ...state, currentStock: action.payload };
      break;
    case "STOCK_REMOVE":
      state = { ...state, currentStock: null };
      break;
    default: {
      return {
        ...state,
      };
    }
  }
  return state;
};

export default stockReducer;
