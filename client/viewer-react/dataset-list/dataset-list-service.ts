import {useCallback, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "../hooks";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {ParsedQuery} from "query-string";
import {useLocation, useNavigate} from "react-router-dom";

import {NavigationContext} from "../service/navigation";
import {
  DatasetListQuery,
  Facet,
  TypeaheadDataset
} from "../../data-api/api-dataset";
import {datasetListSelector} from "./dataset-list-reducer";
import {
  isStatusLoading,
  isStatusLoadingOrFailed,
  ResourceStatus
} from "../resource-status";
import {DatasetListActions} from "./dataset-list-actions";
import {getApi} from "../api-instance";
import {
  DatasetListData,
  ExtendedDatasetListQuery,
  InvalidQueryReport,
} from "./dataset-list-model";
import {createUrl} from "../service/i18";

export function useDatasetListQuery() {
  const navigation = useContext(NavigationContext);

  const [query, setQuery] = useState(
    parsedQueryToQuery(navigation.query, createDefaultDatasetListQuery()));

  const state = useSelector(datasetListSelector);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isStatusLoadingOrFailed(state.status)) {
      // Do not allow change of query when loading data.
      return;
    }
    const newQuery = parsedQueryToQuery(navigation.query, query);
    const listQuery = prepareDatasetListQuery(newQuery);

    const sameInvalidArguments = query.report.length === newQuery.report.length;
    const sameQuery = datasetListQueryEquals(state.query, listQuery);
    const sameExtendedQuery = newQuery?.view === query?.view;
    if (sameInvalidArguments && sameQuery && sameExtendedQuery) {
      return;
    }
    setQuery(newQuery);
  }, [navigation.query, state.status, state.query, query, setQuery]);

  const updateQuery = useCallback((change:any) => {
    if (isStatusLoading(state.status)) {
      // Do not allow change of query when loading data.
      return;
    }
    const newQuery = {...query, ...change};
    const urlQuery = prepareForUrl(newQuery);
    const nextUrl = createUrl(navigation.language, "/datasets", urlQuery);
    // The nextUrl path is not encoded, so we decode the path here
    // to make them the same.
    const currentUrl = decodeURI(location.pathname) + (
      location.search === "" ? "" : location.search);
    // We need to set query always, as not all changes are reflected
    // in the navigation.
    setQuery(newQuery);
    if (currentUrl !== nextUrl) {
      navigate(nextUrl);
    }
  }, [navigation, state.status, query, setQuery, history]);

  return [query, updateQuery];
}

function parsedQueryToQuery(
  parsedQuery: ParsedQuery, lastQuery: ExtendedDatasetListQuery,
): ExtendedDatasetListQuery {
  const report: InvalidQueryReport = [];
  const {asInteger, asIriArray} = createQueryParsers(report);
  return {
    "page": asInteger(parsedQuery, "page", 0, -1),
    "pageSize": asInteger(parsedQuery, "pageSize", 10),
    "showMore": asInteger(parsedQuery, "showMore", 0),
    "sort": parsedQuery.sort ? parsedQuery.sort as any : "title asc",
    "search": parsedQuery.search ? parsedQuery.search as any : "",
    "publishers": asIriArray(parsedQuery, "publishers"),
    "publishersLimit": lastQuery.publishersLimit,
    "themes": asIriArray(parsedQuery, "themes"),
    "themesLimit": lastQuery.themesLimit,
    "keywords": asArray(parsedQuery.keywords),
    "keywordsLimit": lastQuery.keywordsLimit,
    "fileTypes": asIriArray(parsedQuery, "fileTypes"),
    "fileTypesLimit": lastQuery.fileTypesLimit,
    "dataServiceTypes": asIriArray(parsedQuery, "dataServiceTypes"),
    "dataServiceTypesLimit": lastQuery.dataServiceTypesLimit,
    "temporalStart": parsedQuery.temporalStart ?
      parsedQuery.temporalStart as any : "",
    "temporalEnd": parsedQuery.temporalEnd ?
      parsedQuery.temporalEnd as any : "",
    "isPartOf": asIriArray(parsedQuery, "isPartOf"),
    "view": asInteger(parsedQuery, "view", 0),
    "report": report,
    "isVdfCodelist" : parsedQuery.isVdfCodelist === "1",
    "isVdfPublicData" : parsedQuery.isVdfPublicData === "1",
  };
}

function createQueryParsers(report: InvalidQueryReport) {

  function isUrl(value: string): boolean {
    value = value.toLocaleLowerCase();
    return value.startsWith("http://") || value.startsWith("https://");
  }

  return {
    "asInteger": (
      parsedQuery: ParsedQuery, name: string,
      defaultValue: number, shift: number = 0
    ): number => {
      const value = parsedQuery[name]
      if (value === undefined) {
        return defaultValue;
      }
      const asNumber = Number(value);
      if (Number.isNaN(asNumber)) {
        report.push({
          "name": name,
          "value": value
        });
        return defaultValue;
      }
      return asNumber + shift;
    },
    "asIriArray": (parsedQuery: ParsedQuery, name: string): string[] => {
      const values = asArray(parsedQuery[name]);
      const result: string[] = [];
      values.forEach(value => {
        if (isUrl(value)) {
          result.push(value);
        } else {
          report.push({
            "name": name,
            "value": value,
          });
        }
      });
      return result;
    }
  };
}

function asArray(
  value: string | (string | null)[] | undefined | null
): string[] {
  if (value === undefined || value === null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.filter(item => item !== null) as string[];
  }
  return [value];
}

function createDefaultDatasetListQuery(): ExtendedDatasetListQuery {
  return {
    "page": 0,
    "pageSize": 10,
    "showMore": 0,
    "sort": "title asc",
    "search": "",
    "publishers": [],
    "publishersLimit": 14,
    "themes": [],
    "themesLimit": 14,
    "keywords": [],
    "keywordsLimit": 14,
    "fileTypes": [],
    "fileTypesLimit": 14,
    "dataServiceTypes": [],
    "dataServiceTypesLimit": 14,
    "temporalStart": "",
    "temporalEnd": "",
    "isPartOf": [],
    "view": 0,
    "report": [],
    "isVdfCodelist": false,
    "isVdfPublicData": false,
  };
}

/**
 * We do not want default parameters to show in the URL, so we remove them. We
 * also keep only those properties that should be part of the URL.
 */
function prepareForUrl(query: ExtendedDatasetListQuery): ParsedQuery {
  const defaultQuery = createDefaultDatasetListQuery();
  return {
    "page": query.page !== defaultQuery.page ?
      String(query.page + 1) : null,
    "pageSize": query.pageSize !== defaultQuery.pageSize ?
      String(query.pageSize) : null,
    "showMore": query.showMore !== defaultQuery.showMore ?
      String(query.showMore) : null,
    "sort": query.sort !== defaultQuery.sort ?
      query.sort : null,
    "search": query.search !== defaultQuery.search ?
      query.search : null,
    "publishers": query.publishers.length > 0 ?
      query.publishers : null,
    "themes": query.themes.length > 0 ?
      query.themes : null,
    "keywords": query.keywords.length > 0 ?
      query.keywords : null,
    "fileTypes": query.fileTypes.length > 0 ?
      query.fileTypes : null,
    "dataServiceTypes": query.dataServiceTypes.length > 0 ?
      query.dataServiceTypes : null,
    "temporalStart": query.temporalStart !== "" ?
      query.temporalStart : null,
    "temporalEnd": query.temporalEnd !== "" ?
      query.temporalEnd : null,
    "isPartOf": query.isPartOf.length > 0 ?
      query.isPartOf : null,
    "view": query.view !== defaultQuery.view ?
      String(query.view) : null,
    "isVdfCodelist": query.isVdfCodelist ? "1" : null,
    "isVdfPublicData": query.isVdfPublicData ? "1" : null
  };
}

export function useDatasetListApi(
  language: string, query: ExtendedDatasetListQuery
): DatasetListData {
  const dispatch = useDispatch();
  const state = useSelector(datasetListSelector);

  useEffect(() => {
    const lastListQuery = state.query;
    const listQuery = prepareDatasetListQuery(query);
    if (datasetListQueryEquals(lastListQuery, listQuery)
      || isStatusLoading(state.status)) {
      return;
    }
    dispatch(fetchDatasetListData(language, listQuery));
  }, [language, query]);

  return {
    "loading": state.status === ResourceStatus.Loading,
    "updating": state.status === ResourceStatus.Updating,
    "failed": state.status === ResourceStatus.Failed,
    "datasets": state.datasets,
    "datasetsCount": state.datasetsCount,
    "publishers": state.publishers,
    "publishersCount": state.publishersCount,
    "fileTypes": state.fileTypes,
    "fileTypesCount": state.fileTypesCount,
    "dataServiceTypes": state.dataServiceTypes,
    "dataServiceTypesCount": state.dataServiceTypesCount,
    "themes": state.themes,
    "themesCount": state.themesCount,
    "keywords": state.keywords,
    "keywordsCount": state.keywordsCount,
    "isPartOf": isPartOfAsFacet(state.query, state.datasetsCount),
  }
}

function prepareDatasetListQuery(
  query: ExtendedDatasetListQuery
): DatasetListQuery {
  return {
    "offset": query.page * query.pageSize,
    "limit": query.pageSize + query.showMore,
    "sort": query.sort,
    "search": query.search,
    "publishers": query.publishers,
    "publishersLimit": query.publishersLimit,
    "themes": query.themes,
    "themesLimit": query.themesLimit,
    "keywords": query.keywords,
    "keywordsLimit": query.keywordsLimit,
    "fileTypes": query.fileTypes,
    "fileTypesLimit": query.fileTypesLimit,
    "dataServiceTypes": query.dataServiceTypes,
    "dataServiceTypesLimit": query.dataServiceTypesLimit,
    "temporalStart": query.temporalStart,
    "temporalEnd": query.temporalEnd,
    "isPartOf": query.isPartOf,
    "isVdfPublicData" : query.isVdfPublicData,
    "isVdfCodelist": query.isVdfCodelist,
  }
}

function datasetListQueryEquals(
  left: DatasetListQuery | undefined, right: DatasetListQuery | undefined
) {
  if (left === right) {
    return true;
  }
  if (left === undefined || right === undefined) {
    return false;
  }
  // TODO Move this to helper method for DatasetListQuery.
  return left.offset === right.offset
    && left.limit === right.limit
    && left.sort === right.sort
    && left.search === right.search
    && isArrayEqual(left.publishers, right.publishers)
    && left.publishersLimit === right.publishersLimit
    && isArrayEqual(left.themes, right.themes)
    && left.themesLimit === right.themesLimit
    && isArrayEqual(left.keywords, right.keywords)
    && left.keywordsLimit === right.keywordsLimit
    && isArrayEqual(left.fileTypes, right.fileTypes)
    && left.fileTypesLimit === right.fileTypesLimit
    && isArrayEqual(left.dataServiceTypes, right.dataServiceTypes)
    && left.dataServiceTypesLimit === right.dataServiceTypesLimit
    && left.temporalStart === right.temporalStart
    && left.temporalEnd === right.temporalEnd
    && isArrayEqual(left.isPartOf, right.isPartOf)
    && left.isVdfPublicData === right.isVdfPublicData
    && left.isVdfCodelist === right.isVdfCodelist;
}

function isArrayEqual<T>(left: T[] | undefined, right: T[] | undefined) {
  if (left === right) {
    return true;
  }
  if (left === undefined || right === undefined) {
    return false;
  }
  if (left.length !== right.length) {
    return false;
  }
  for (let index = 0; index < left.length; ++index) {
    if (left[index] !== right[index]) {
      return false;
    }
  }
  return true;
}

function isPartOfAsFacet(
  query: DatasetListQuery | undefined, datasetsCount: number
): Facet[] {
  if (query === undefined) {
    return [];
  }
  return query.isPartOf.map((iri) => ({
    "iri": iri,
    // If this facet is applied then all available datasets belong here.
    "count": datasetsCount,
    "queryCode": iri
  }));
}

type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

function fetchDatasetListData(
  language: string, query: DatasetListQuery
): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = datasetListSelector(getState());
    if (state.status === ResourceStatus.Loading
      || state.status === ResourceStatus.Updating) {
      return;
    }
    dispatch(DatasetListActions.fetchDatasetList.request({
      "loadingIndicator": 1,
    }));
    const optimizedQuery = optimizeDatasetListQuery(state.query, query);
    try {
      const response = await getApi().fetchDatasetList(
        language, optimizedQuery);
      dispatch(DatasetListActions.fetchDatasetList.success({
        "loadingIndicator": -1,
        "query": query,
        "merge": shouldMergeDatasetList(state.query, query),
        "content": response.datasets,
        "labels": response.labels,
      }));
    } catch (error: any) {
      dispatch(DatasetListActions.fetchDatasetList.failure({
        "loadingIndicator": -1,
        "error": error,
      }));
    }
  };
}

/**
 * Sometimes we just need to add some data, like fetch few more datasets.
 * In such case we do not need to re-fetch data we already have and thus
 * save us some network and server resources.
 *
 * Note that this assumes that the data are not chaining too much.
 */
function optimizeDatasetListQuery(
  prevQuery: DatasetListQuery | undefined, nextQuery: DatasetListQuery
): DatasetListQuery {
  if (prevQuery === undefined) {
    return nextQuery;
  }
  if (!shouldMergeDatasetList(prevQuery, nextQuery)) {
    return nextQuery;
  }
  // We know the queries are compatible, so just fetch what is missing.
  let offset = nextQuery.offset;
  let limit = nextQuery.limit;
  if (prevQuery.offset === nextQuery.offset
    && prevQuery.limit === nextQuery.limit) {
    // We would request the same datasets, we d not need them.
    offset = 0;
    limit = 0;
  }
  return {
    "offset": offset,
    "limit": limit,
    "sort": nextQuery.sort,
    "search": nextQuery.search,
    "publishers": nextQuery.publishers,
    "publishersLimit":
      prevQuery.publishersLimit === nextQuery.publishersLimit ?
        0 : nextQuery.publishersLimit,
    "themes": nextQuery.themes,
    "themesLimit":
      prevQuery.themesLimit === nextQuery.themesLimit ?
        0 : nextQuery.themesLimit,
    "keywords": nextQuery.keywords,
    "keywordsLimit":
      prevQuery.keywordsLimit === nextQuery.keywordsLimit ?
        0 : nextQuery.keywordsLimit,
    "fileTypes": nextQuery.fileTypes,
    "fileTypesLimit":
      prevQuery.fileTypesLimit === nextQuery.fileTypesLimit ?
        0 : nextQuery.fileTypesLimit,
    "dataServiceTypes": nextQuery.dataServiceTypes,
    "dataServiceTypesLimit":
      prevQuery.dataServiceTypesLimit === nextQuery.dataServiceTypesLimit ?
        0 : nextQuery.dataServiceTypesLimit,
    "temporalStart": nextQuery.temporalStart,
    "temporalEnd": nextQuery.temporalEnd,
    "isPartOf": nextQuery.isPartOf,
    "isVdfPublicData" : nextQuery.isVdfPublicData,
    "isVdfCodelist": nextQuery.isVdfCodelist,
  };
}


function shouldMergeDatasetList(
  prevQuery: DatasetListQuery | undefined, query: DatasetListQuery
): boolean {
  if (prevQuery === undefined) {
    return false;
  }
  return prevQuery.sort === query.sort
    && prevQuery.search === query.search
    && prevQuery.publishers === query.publishers
    && prevQuery.themes === query.themes
    && prevQuery.keywords === query.keywords
    && prevQuery.fileTypes === query.fileTypes
    && prevQuery.dataServiceTypes === query.dataServiceTypes
    && prevQuery.temporalStart === query.temporalStart
    && prevQuery.temporalEnd === query.temporalEnd
    && prevQuery.isPartOf === query.isPartOf
    && prevQuery.isVdfCodelist === query.isVdfCodelist
    && prevQuery.isVdfPublicData === query.isVdfPublicData;
}

/**
 * Should be used as a function.
 */
export async function fetchTypeahead(
  language: string, query: DatasetListQuery, text: string
): Promise<TypeaheadDataset[]> {
  return getApi().fetchDatasetsTypeahead(language, query, text);
}
