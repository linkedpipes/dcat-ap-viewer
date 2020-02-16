import {
  addLoaderStatusOn,
  addLoaderStatusOff,
} from "app-ui/loading-indicator/index";
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
  const publishers = data.publishers.filter(entity => entity.labels);
  return addLoaderStatusOff({
    "type": FETCH_INITIAL_DATA_SUCCESS,
    "$publishers": publishers,
    "$themes": data.themes.map((theme) => ({
      "@id": theme["@id"],
    })),
    "$keywords_cs": data.keywords_cs,
    "$keywords_en": data.keywords_en,
    // Only themes contains labels.
    "$labels": [
      ...data.themes,
      ...publishers
    ],
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
  return "./api/v1/solr/query?" +
        "facet.field=keyword_cs&" +
        "facet.field=keyword_en&" +
        "facet.field=format&" +
        "facet.field=publisher&" +
        "facet.field=theme&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*&" +
        "facet.limit=-1&" +
        "rows=0";
}

function fetchSolrSuccess(response) {
  const publishers = parseFacetFromSolrResponse(response, "publisher");
  const themes = parseFacetFromSolrResponse(response, "theme");
  const keywords_cs = parseFacetFromSolrResponse(response, "keyword_cs", true);
  const keywords_en = parseFacetFromSolrResponse(response, "keyword_en", true);
  const formats = parseFacetFromSolrResponse(response, "format");
  return addLoaderStatusOff({
    "type": FETCH_INITIAL_SOLR_SUCCESS,
    "$publishers": publishers,
    "$themes": themes,
    "$keywords_cs": keywords_cs,
    "$keywords_en": keywords_en,
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
