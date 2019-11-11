import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function pageDetailsReducer(state = initialState.currentPage, action) {
  switch (action.type) {
    case types.GET_PAGE_CONTENT_SUCCESS:
      return {
            pageContent: action.pageContent,
            sideNav: state.sideNav
        };
    case types.GET_SIDE_NAV_DETAILS_SUCCESS:
      return {
            pageContent: state.pageContent,
            sideNav: action.sideNav
        };
    default:
      return state;
  }
}
