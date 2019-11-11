import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/pages/";
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
