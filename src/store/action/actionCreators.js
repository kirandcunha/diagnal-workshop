import * as actionTypes from "./actions";
import axios from "axios";
import {
  SERVER_URL,
  PAGE_ENDPOINT,
  PAGE_PLACE_HOLDER
} from "../../utils/constants";

export const startLoading = () => {
  return dispatch => {
    dispatch(updateLoading(true));
  };
};

export const endLoading = () => {
  return dispatch => {
    dispatch(updateLoading(true));
  };
};

const updateLoading = (data) => {
  return {
    type: actionTypes.LOADING,
    payload: data
  };
};

export const fetchData = page => {
  return dispatch => {
    dispatch(updateLoading(true))
    const url = SERVER_URL + PAGE_ENDPOINT.replace(PAGE_PLACE_HOLDER, page);
    axios
      .get(url)
      .then(response => {
        dispatch(updateLoading(false))
        dispatch(updateData(response.data));
      })
      .catch(error => {
        dispatch(updateLoading(false))
        console.log(error);
      });
  };
};

const updateData = data => {
  return {
    type: actionTypes.UPDATE_DATA,
    payload: data.page
  };
};
