import {
  addLoaderStatusOn,
  addLoaderStatusOff,
} from "app-ui/loading-indicator/index";
import {fetchJson} from "app-services/http-request";

export const FETCH_CATALOGS_REQUEST = "FETCH_CATALOGS_REQUEST";
export const FETCH_CATALOGS_SUCCESS = "FETCH_CATALOGS_SUCCESS";
export const FETCH_CATALOGS_FAILED = "FETCH_CATALOGS_FAILED";

export function fetchCatalogList() {
  return (dispatch) => {
    dispatch(fetchRequest());
    const url = "./api/v1/resource/static?id=local_catalogs";
    fetchJson(url)
      .then((payload) => dispatch(fetchSuccess(payload)))
      .catch((error) => dispatch(fetchFailed(error)));
  };
}

function fetchRequest() {
  return addLoaderStatusOn({
    "type": FETCH_CATALOGS_REQUEST,
  });
}

function fetchSuccess(data) {
  return addLoaderStatusOff({
    "type": FETCH_CATALOGS_SUCCESS,
    "catalogs": data["json"]["json"],
  });
}

function fetchFailed(error) {
  console.error("Can't fetch catalogs.", error);
  return addLoaderStatusOff({
    "type": FETCH_CATALOGS_FAILED,
    "error": error,
  });
}
