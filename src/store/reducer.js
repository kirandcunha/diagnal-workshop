import * as actionTypes from "./action/actions";

const initialState = {
  dataLoading: false,
  pageData: null,
  itemsReceived: 0,
  totalItems: 0,
  pagesReceived: 0,
  totalPages: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        dataLoading: action.payload
      };
    case actionTypes.UPDATE_DATA:
      let pageData;
      if (state.pageData === null) {
        pageData = action.payload["content-items"].content;
      } else {
        pageData = state.pageData.concat(
          action.payload["content-items"].content
        );
      }
      return {
        ...state,
        itemsReceived: pageData.length,
        pagesReceived: state.pagesReceived + 1,
        totalItems: action.payload["total-content-items"],
        pageData: pageData
      };
    default:
      return state;
  }
};

export default reducer;
