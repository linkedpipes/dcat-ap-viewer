import {AnyAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {jsonLdToDataset} from "./jsonld-to-dataset";
import {jsonLdToQualityMeasures} from "./jsonld-to-quality";
import {selectLanguage} from "../app/component-api";
import {getApiInstance} from "../api/api-action";
import {DatasetDetailActions} from "./dataset-detail-actions";
import {DatasetListQuery, FlatJsonLdPromise} from "../api/api-interface";
import {
  datasetSelector,
  datasetPartSelector,
  qualitySelector,
  Status,
} from "./dataset-detail-reducer";
import {
  Dataset,
  DatasetPart,
  isDataService,
  isDistribution,
} from "./dataset-detail-model";
import {fetchDatasetLabel, fetchLabels} from "../labels/index";
import {jsonLdToDistributionOrDataService} from "./jsonld-to-distribution";
import {JsonLdEntity} from "../jsonld";
import {jsonLdToDatasetList} from "../dataset-list/jsonld-to-datasets";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchDataset(datasetIri: string): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    if (datasetSelector(state).resourceStatus === Status.Loading) {
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
      const dataset = jsonLdToDataset(jsonld);
      const datasetParts = parsePartsFromDatasetJsonLd(jsonld, dataset);
      dispatch(DatasetDetailActions.fetchDataset.success({
        "dataset": datasetIri,
        "payload": dataset,
        "partsPayload": datasetParts,
        "jsonld": jsonld,
      }));
      fetchLabelsForDataset(dispatch, dataset);
      for (const part of datasetParts) {
        fetchLabelsForDatasetPart(dispatch, part);
      }
      if (dataset.parentDataset) {
        dispatch(fetchDatasetLabel(dataset.parentDataset));
      }
    } catch (ex) {
      dispatch(DatasetDetailActions.fetchDataset.failure({
        "dataset": datasetIri,
        "error": ex,
      }));
    }
  }
}

function parsePartsFromDatasetJsonLd(
  jsonld: JsonLdEntity[], dataset: Dataset
): DatasetPart[] {
  const result = [];
  for (const iri of dataset.distributions) {
    const part = jsonLdToDistributionOrDataService(jsonld, iri);
    if (part !== undefined) {
      result.push(part);
    }
  }
  return result;
}

function fetchLabelsForDataset(
  dispatch: ThunkDispatch<any, any, AnyAction>, dataset: Dataset
) {
  const iris: string [] = [
    ...dataset.spatial,
    ...dataset.themes,
    ...dataset.datasetThemes,
  ];
  if (dataset.frequency !== undefined) {
    iris.push(dataset.frequency);
  }
  if (dataset.publisher !== undefined) {
    iris.push(dataset.publisher);
  }
  dispatch(fetchLabels(iris));
}

function fetchLabelsForDatasetPart(
  dispatch: ThunkDispatch<any, any, AnyAction>, part: DatasetPart
) {
  if (!isDistribution(part) && !isDataService(part)) {
    return;
  }
  const iris = [];
  if (part.format) {
    iris.push(part.format);
  }
  if (part.mediaType) {
    iris.push(part.mediaType);
  }
  if (part.compressFormat) {
    iris.push(part.compressFormat);
  }
  if (part.packageFormat) {
    iris.push(part.packageFormat);
  }
  dispatch(fetchLabels(iris));
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
    if (quality.resourceStatus !== Status.Undefined) {
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
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    // We set query and then use the same method as for fetching the list.
    dispatch(DatasetDetailActions.fetchDescendants.request());
    try {
      const jsonld = await getApiInstance().fetchDatasetList(language, query);
      if (jsonld === undefined) {
        dispatch(DatasetDetailActions.fetchDescendants.failure({
          "dataset": iri,
          "error": new Error("Missing JSON-LD data."),
        }));
        return;
      }
      const payload = jsonLdToDatasetList(jsonld);
      dispatch(DatasetDetailActions.fetchDescendants.success({
        "dataset": iri,
        "payload": payload,
        "jsonld": jsonld,
      }));
    } catch (ex) {
      dispatch(DatasetDetailActions.fetchDescendants.failure({
        "dataset": iri,
        "error": ex,
      }));
    }
  };
}

export function fetchDistribution(distributionIri: string): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    const dataset = datasetSelector(state);
    if (dataset.resourceStatus !== Status.Ready) {
      return;
    }
    const distribution = datasetPartSelector(state, distributionIri);
    if (distribution !== undefined
      && distribution.resourceStatus !== Status.Undefined) {
      // We have distribution loaded in any state, do not fetch again.
      return
    }
    dispatch(DatasetDetailActions.fetchDistribution.request({
      "distribution": distributionIri,
    }));
    try {
      const jsonld = await getApiInstance().fetchDistribution(
        language, distributionIri);
      if (jsonld === undefined) {
        dispatch(DatasetDetailActions.fetchDistribution.failure({
          "distribution": distributionIri,
          "error": new Error("Missing JSON-LD data."),
        }));
        return;
      }
      const payload = jsonLdToDistributionOrDataService(jsonld, distributionIri);
      if (payload === undefined) {
        dispatch(DatasetDetailActions.fetchDistribution.failure({
          "distribution": distributionIri,
          "error": new Error("Missing distribution data."),
        }));
        return;
      }
      dispatch(DatasetDetailActions.fetchDistribution.success({
        "distribution": distributionIri,
        "payload": payload,
        "jsonld": jsonld,
      }));
      fetchLabelsForDatasetPart(dispatch, payload);
    } catch (ex) {
      dispatch(DatasetDetailActions.fetchDistribution.failure({
        "distribution": distributionIri,
        "error": ex,
      }));
    }
  };
}
