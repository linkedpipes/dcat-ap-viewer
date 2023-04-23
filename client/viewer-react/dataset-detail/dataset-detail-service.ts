import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "../hooks";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";

import {DatasetDetailActions} from "./dataset-detail-actions";
import {
  datasetSelector,
  descendantsSelector,
  distributionSelector,
  loadedDistributionSelector,
  qualitySelector,
  statusSelector
} from "./dataset-detail-reducer";
import {getApi} from "../api-instance";
import {DatasetListQuery} from "../../data-api/api-dataset";
import {NavigationContext} from "../service/navigation";
import {
  DatasetDetailData,
  DescendantsData,
  DistributionData,
  QualityData,
} from "./dataset-detail-model";
import {ResourceStatus} from "../resource-status";
import {NkodDataService, NkodDistribution} from "../../data-model/distribution";

export function useDatasetDetailApi(iri: string): DatasetDetailData {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const status = useSelector(statusSelector);
  const dataset = useSelector(datasetSelector);

  useEffect(() => {
    dispatch(DatasetDetailActions.mountDatasetDetail());
    return () => {
      dispatch(DatasetDetailActions.unMountDatasetDetail());
    };
  }, []);

  useEffect(() => {
    dispatch(DatasetDetailActions.setDatasetDetail({"datasetIri": iri}));
    dispatch(fetchDatasetDetail(
      navigation.language,
      iri));
  }, [navigation.language, navigation.query.dataset]);

  return {
    ...statusToObject(status),
    "dataset": dataset,
  };
}

function statusToObject(status: ResourceStatus | undefined) {
  if (status === undefined) {
    return {
      "loading": false,
      "failed": false,
    };
  }
  return {
    "loading": status === ResourceStatus.Undefined
      || status === ResourceStatus.Loading
      || status === ResourceStatus.Updating,
    "failed": status === ResourceStatus.Failed,
  };
}

type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

function fetchDatasetDetail(language: string, iri: string): ThunkVoidResult {
  return async (dispatch) => {
    dispatch(DatasetDetailActions.fetchDataset.request({
      "datasetIri": iri,
      "loadingIndicator": 1,
    }));
    try {
      const response = await getApi().fetchDataset(language, iri);
      dispatch(DatasetDetailActions.fetchDataset.success({
        "datasetIri": iri,
        "loadingIndicator": -1,
        "dataset": response.dataset,
        "distributions": response.distributions,
        "labels": response.labels,
        "publishers": response.publishers,
      }));
    } catch (error : any) {
      console.error("Can't load dataset.", error);
      dispatch(DatasetDetailActions.fetchDataset.failure({
        "datasetIri": iri,
        "loadingIndicator": -1,
        "error": error,
      }));
    }
  };
}

/**
 * Return data for all distributions, does not perform fetch. The data
 * may be available if fetched before or as a part of the dataset fetch.
 */
export function useAvailableDistributionsApi() {
  const distributionWraps = useSelector(loadedDistributionSelector);
  const result: (NkodDistribution | NkodDataService)[] = [];
  for (const wrap of distributionWraps) {
    if (wrap.distribution === undefined) {
      continue;
    }
    result.push(wrap.distribution);
  }
  return result;
}

export function useDistributionApi(iri: string): DistributionData {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const state = useSelector((state) => distributionSelector(state, iri));
  // The data may be already available.
  const shouldFetch = state?.status === ResourceStatus.Undefined;

  useEffect(() => {
    if (shouldFetch) {
      dispatch(fetchDistribution(navigation.language, iri));
    }
  }, [navigation.language, iri, shouldFetch]);

  return {
    ...statusToObject(state?.status),
    "distribution": state?.distribution,
  };
}

function fetchDistribution(language: string, iri: string): ThunkVoidResult {
  return async (dispatch) => {
    dispatch(DatasetDetailActions.fetchDistribution.request({
      "distributionIri": iri,
      "loadingIndicator": 1,
    }));
    try {
      const response = await getApi().fetchDistribution(language, iri);
      dispatch(DatasetDetailActions.fetchDistribution.success({
        "distributionIri": iri,
        "loadingIndicator": -1,
        "distribution": response.distribution,
        "labels": response.labels,
      }));
    } catch (error : any) {
      dispatch(DatasetDetailActions.fetchDistribution.failure({
        "distributionIri": iri,
        "loadingIndicator": -1,
        "error": error,
      }));
    }
  };
}

export function useQualityApi(iri: string): QualityData {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const state = useSelector((state) => qualitySelector(state, iri));

  useEffect(() => {
    dispatch(fetchQuality(navigation.language, iri));
  }, [navigation.language, iri]);

  if (state === undefined) {
    return {
      "loading": true,
      "failed": false,
      "quality": undefined
    };
  }

  return {
    ...statusToObject(state?.status),
    "quality": state?.quality,
  };
}

function fetchQuality(language: string, iri: string): ThunkVoidResult {
  return async (dispatch) => {
    dispatch(DatasetDetailActions.fetchQuality.request({
      "iri": iri,
      "loadingIndicator": 1,
    }));
    try {
      const response = await getApi().fetchQuality(language, iri);
      dispatch(DatasetDetailActions.fetchQuality.success({
        "iri": iri,
        "loadingIndicator": -1,
        "payload": response,
      }));
    } catch (error : any) {
      dispatch(DatasetDetailActions.fetchQuality.failure({
        "iri": iri,
        "loadingIndicator": -1,
        "error": error,
      }));
    }
  };
}

export function useDescendantsApi(
  iri: string, offset: number, limit: number
): DescendantsData {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const state = useSelector(descendantsSelector);

  useEffect(() => {
    dispatch(fetchDescendants(navigation.language, iri, offset, limit));
  }, [navigation.language, iri]);

  return {
    ...statusToObject(state.status),
    "count": state.count,
    "datasets": state.datasets,
  };
}

function fetchDescendants(
  language: string, datasetIri: string, offset: number, limit: number
): ThunkVoidResult {
  const query: DatasetListQuery = {
    "limit": limit,
    "offset": offset,
    "sort": "",
    "search": "",
    "publishers": [],
    "publishersLimit": 0,
    "themes": [],
    "themesLimit": 0,
    "keywords": [],
    "keywordsLimit": 0,
    "fileTypes": [],
    "fileTypesLimit": 0,
    "dataServiceTypes": [],
    "dataServiceTypesLimit": 0,
    "temporalStart": "",
    "temporalEnd": "",
    "isPartOf": [datasetIri],
    "isVdfCodelist": false,
    "isVdfPublicData": false,
  };
  return async (dispatch) => {
    dispatch(DatasetDetailActions.fetchDescendants.request({
      "datasetIri": datasetIri,
      "loadingIndicator": 1,
    }));
    try {
      const result = await getApi().fetchDatasetList(language, query);
      dispatch(DatasetDetailActions.fetchDescendants.success({
        "datasetIri": datasetIri,
        "loadingIndicator": -1,
        "datasets": result.datasets.datasets,
        "datasetsCount": result.datasets.datasetsCount,
        "labels": result.labels,
      }));
    } catch (error : any) {
      dispatch(DatasetDetailActions.fetchDescendants.failure({
        "datasetIri": datasetIri,
        "loadingIndicator": -1,
        "error": error,
      }));
    }
  };
}
