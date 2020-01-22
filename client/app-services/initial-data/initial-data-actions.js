import {
  addLoaderStatusOn,
  addLoaderStatusOff,
} from "../../app-ui/loading-indicator/index";
import {fetchJson} from "../http-request";
import {parseFacetFromSolrResponse} from "../solr";

export const FETCH_INITIAL_DATA_REQUEST = "FETCH_INITIAL_DATA_REQUEST";
export const FETCH_INITIAL_DATA_SUCCESS = "FETCH_INITIAL_DATA_SUCCESS";
export const FETCH_INITIAL_DATA_FAILED = "FETCH_INITIAL_DATA_FAILED";

export const FETCH_INITIAL_SOLR_REQUEST = "FETCH_INITIAL_SOLR_REQUEST";
export const FETCH_INITIAL_SOLR_SUCCESS = "FETCH_INITIAL_SOLR_SUCCESS";
export const FETCH_INITIAL_SOLR_FAILED = "FETCH_INITIAL_SOLR_FAILED";


export function fetchInitialData() {
  return (dispatch) => {
    fetchFiltersFromCache(dispatch);
    fetchFiltersFromSolr(dispatch);
  };
}

function fetchFiltersFromCache(dispatch) {
  dispatch(fetchDataRequest());
  const url = "./api/v1/resource/filter";
  return fetchJson(url)
    .then((payload) => dispatch(fetchDataSuccess(payload.json.json)))
    .catch((error) => dispatch(fetchDataFailed(error)));
}


function fetchDataRequest() {
  return addLoaderStatusOn({
    "type": FETCH_INITIAL_DATA_REQUEST,
  });
}

function fetchDataSuccess(data) {
  return addLoaderStatusOff({
    "type": FETCH_INITIAL_DATA_SUCCESS,
    "$publishers": data.publishers,
    "$themes": data.themes.map((theme) => ({
      "@id": theme["@id"],
    })),
    "$keywords": data.keywords,
    // Only themes contains labels.
    "$labels": data.themes,
  });
}

function fetchDataFailed(error) {
  console.error("Can't fetch initial data.", error);
  return addLoaderStatusOff({
    "type": FETCH_INITIAL_DATA_FAILED,
    "error": error,
  });
}

function fetchFiltersFromSolr(dispatch) {
  dispatch(fetchSolrRequest());
  const url = constructQueryUrl();
  fetchJson(url)
    .then((payload) => dispatch(fetchSolrSuccess(payload.json)))
    .catch((error) => dispatch(fetchSolrFailed(error)));
}

function fetchSolrRequest() {
  return addLoaderStatusOn({
    "type": FETCH_INITIAL_SOLR_REQUEST,
  });
}

function constructQueryUrl() {
  const url = "./api/v1/solr/query?" +
        "facet.field=keyword&" +
        "facet.field=formatName&" +
        "facet.field=publisherName&" +
        "facet.field=theme&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*&" +
        "facet.limit=-1&" +
        "rows=0";
  return url;
}

function fetchSolrSuccess(response) {
  const publishers = parseFacetFromSolrResponse(response, "publisherName");
  const themes = parseFacetFromSolrResponse(response, "theme");
  const keywords = parseFacetFromSolrResponse(response, "keyword");
  const formats = parseFacetFromSolrResponse(response, "formatName");
  return addLoaderStatusOff({
    "type": FETCH_INITIAL_SOLR_SUCCESS,
    "$publishers": publishers,
    "$themes": themes,
    "$keywords": keywords,
    "$formats": formats,
    "$labels": [],
  });
}

function fetchSolrFailed(error) {
  console.error("Can't fetch initial solr data.", error);
  return addLoaderStatusOff({
    "type": FETCH_INITIAL_SOLR_FAILED,
    "error": error,
  });
}
