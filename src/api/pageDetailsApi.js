import { handleResponse, handleError, getBaseURL } from "./apiUtils";
// import 'whatwg-fetch';
// import 'imports-loader';
// import 'exports-loader';

const baseUrl = getBaseURL() + "/pages/";
const DATA_SUFFIX = '.json';

export function getSideNavDetails(page) {
  return fetch(baseUrl+'/nav/'+page + DATA_SUFFIX)
    .then(handleResponse)
    .catch(handleError);
}

export function getPageContent(pageType, page) {
  return fetch(baseUrl+'/content/'+pageType +'/'+page+ DATA_SUFFIX)
    .then(handleResponse)
    .catch(handleError);
}
