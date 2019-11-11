import * as types from "./actionTypes";
import * as pageDetailsApi from "../../api/pageDetailsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getSideNavSuccess(sideNav) {
  return { type: types.GET_SIDE_NAV_DETAILS_SUCCESS, sideNav };
}

export function getSideNav(page) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return pageDetailsApi
      .getSideNavDetails(page)
      .then(sideNav => {
        dispatch(getSideNavSuccess(sideNav));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getPageContentSuccess(pageContent) {
  return { type: types.GET_PAGE_CONTENT_SUCCESS, pageContent };
}

export function getPageContent(pageType,page) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return pageDetailsApi
      .getPageContent(pageType, page)
      .then(content => {
        dispatch(getPageContentSuccess(content));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
