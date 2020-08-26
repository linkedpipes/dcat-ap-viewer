import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {jsonLdToDataset} from "./jsonld-to-dataset";
import {jsonLdToQualityMeasures} from "./jsonld-to-quality";
import {selectLanguage} from "../app/component-api";
import {getApiInstance} from "../api/api-action";
import {DatasetDetailActions} from "./dataset-detail-actions";
import {FlatJsonLdPromise} from "../api/api-interface";
import {
  datasetSelector,
  qualitySelector,
  Status
} from "./dataset-detail-reducer";
import {DatasetListQuery} from "../api/api-interface";
import {fetchDatasets} from "../dataset-list/dataset-list-service";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchDataset(datasetIri: string): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    const dataset = datasetSelector(state);
    if (dataset.status === Status.Loading) {
      return;
    }
    dispatch(DatasetDetailActions.fetchDataset.request({
      "dataset": datasetIri
    }));
    try {
      const jsonld = await getApiInstance().fetchDataset(
        language, datasetIri);
      if (jsonld === undefined) {
        dispatch(DatasetDetailActions.fetchDataset.failure({
          "dataset": datasetIri,
          "error": new Error("Missing JSON-LD data."),
        }));
        return;
      }
      const payload = jsonLdToDataset(jsonld);
      dispatch(DatasetDetailActions.fetchDataset.success({
        "dataset": datasetIri,
        "payload": payload,
        "jsonld": jsonld,
      }));
    } catch (ex) {
      dispatch(DatasetDetailActions.fetchDataset.failure({
        "dataset": datasetIri,
        "error": ex,
      }));
    }
  }
}

export function fetchDatasetQuality(datasetIri: string): ThunkVoidResult {
  return fetchQuality(datasetIri, getApiInstance().fetchQualityDataset);
}

function fetchQuality(
  iri: string, call: (lang: string, iri: string) => FlatJsonLdPromise)
  : ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    const quality = qualitySelector(state, iri);
    if (quality.status !== Status.Undefined) {
      return;
    }
    dispatch(DatasetDetailActions.fetchQuality.request({"iri": iri}));
    try {
      const jsonld = await call(language, iri);
      if (jsonld === undefined) {
        dispatch(DatasetDetailActions.fetchQuality.failure({
          "iri": iri,
          "error": new Error("Missing JSON-LD data."),
        }));
        return;
      }
      const payload = jsonLdToQualityMeasures(jsonld);
      dispatch(DatasetDetailActions.fetchQuality.success({
        "iri": iri,
        "payload": payload,
      }));
    } catch (ex) {
      dispatch(DatasetDetailActions.fetchQuality.failure({
        "iri": iri,
        "error": ex,
      }));
    }
  };
}

export function fetchDatasetPartQuality(iri: string): ThunkVoidResult {
  return fetchQuality(iri, getApiInstance().fetchQualityDistribution);
}

export function fetchDescendants(
  iri: string, offset: number, limit: number): ThunkVoidResult {
  const query: DatasetListQuery = {
    "offset": offset,
    "limit": limit,
    "publisher": [],
    "publisherLimit": 0,
    "theme": [],
    "themeLimit": 0,
    "keyword": [],
    "keywordLimit": 0,
    "format": [],
    "formatLimit": 0,
    "isPartOf": [iri],
  };
  return async (dispatch) => {
    // We set query and then use the same method as for fetching the list.
    dispatch(DatasetDetailActions.setDescendantsQuery({"query": query}));
    dispatch(fetchDatasets(query));
  };
}



