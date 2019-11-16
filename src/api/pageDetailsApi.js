import { handleResponse, handleError, getBaseURL } from "./apiUtils";
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
