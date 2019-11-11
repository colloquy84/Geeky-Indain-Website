import { combineReducers } from "redux";
import currentPage from "./pageDetailsReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  currentPage,
  apiCallsInProgress
});

export default rootReducer;
