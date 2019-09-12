import {
    FETCH_LIST_PAGE_REQUEST,
    FETCH_LIST_PAGE_SUCCESS,
    FETCH_LIST_PAGE_FAILED,
    SET_LIST_QUERY_STRING
} from "./dataset-list-actions";
import {
    getQuery,
    PUBLISHER_QUERY,
    KEYWORDS_QUERY,
    FORMAT_QUERY,
    THEME_QUERY,
    STRING_QUERY,
    PAGE_QUERY,
    SORT_QUERY,
    PAGE_SIZE_QUERY,
    TEMPORAL_START,
    TEMPORAL_END,
    VIEW_QUERY
} from "@/app/navigation";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHING_UPDATE,
    STATUS_FETCHED
} from "@/app-services/http-request";
import {parse as parseQueryString} from "query-string";
import {parseFacetFromSolrResponse} from "@/app-services/solr";

// TODO Isolate changes to minimize rendering.
//  For example paginator re-render on every change of string query.

const initialState = {
    "data": {
        "status": STATUS_INITIAL,
        "datasetCount": 0,
        "datasets": [],
        // Not empty in scope of a query.
        "keyword": [],
        "publisher": [],
        "format": [],
        "theme": []
    },
    // Mirror of location ~ query definition.
    "query": {
        "page": 0,
        "search": "",
        "keyword": [],
        "publisher": [],
        "format": [],
        "theme": [],
        "sort": "title_sort asc",
        "pageSize": 10,
        "temporalStart": "",
        "temporalEnd": "",
        "datasetListView": 0
    }
};

const reducerName = "dataset-list";

function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LIST_PAGE_REQUEST:
            return onListRequest(state);
        case FETCH_LIST_PAGE_SUCCESS:
            return onListRequestSuccess(state, action);
        case FETCH_LIST_PAGE_FAILED:
            return onListRequestFailed(state, action);
        case SET_LIST_QUERY_STRING:
            return onSetQueryString(state, action);
        case "@@router/LOCATION_CHANGE":
            // TODO Use only if we are on the "datasets" page.
            return onLocationChange(state, action);
        default:
            return state
    }
}

function onListRequest(state) {
    let status;
    if (state.status === STATUS_INITIAL) {
        status = STATUS_FETCHING;
    } else {
        status = STATUS_FETCHING_UPDATE;
    }
    return {
        ...state,
        "data": {
            ...state.data,
            "status": status
        }
    };
}

function onListRequestSuccess(state, action) {
    const json = action.data;

    const keywords = parseFacetFromSolrResponse(json, "keyword");
    keywords.sort((left, right) => right.count - left.count);

    const publishers = parseFacetFromSolrResponse(json, "publisherName");
    publishers.sort((left, right) => right.count - left.count);

    const formats = parseFacetFromSolrResponse(json, "formatName");
    formats.sort((left, right) => right.count - left.count);

    const themes = parseFacetFromSolrResponse(json, "theme");
    themes.sort((left, right) => right.count - left.count);

    return {
        ...state,
        "data": {
            "status": STATUS_FETCHED,
            "datasetCount": json.response.numFound,
            "datasets": json.response.docs.map((item) => ({
                "id": item.id,
                "iri": item.iri,
                "modified": item.modified,
                "accrualPeriodicity": item.accrualPeriodicity,
                "description": item.description,
                "issued": item.issued,
                "publisher": item.publisherName,
                "title": item.title,
                "keyword": item.keyword,
                "format": item.formatName === undefined ? [] : item.formatName,
                "license": item.license
            })),
            "keyword": keywords,
            "publisher": publishers,
            "format": formats,
            "theme": themes
        }
    };
}

function onListRequestFailed(state, action) {
    return {
        ...state,
        "data": {
            ...state.data,
            "status": action.status
        }
    };
}

function onSetQueryString(state, action) {
    return {
        ...state,
        "ui": {
            ...state.ui,
            "searchQuery": action.value
        }
    };
}

function onLocationChange(state, action) {
    const params = parseQueryString(action.payload.location.search);
    const queryString = params[getQuery(STRING_QUERY)];
    return {
        ...state,
        "query": paramsToQuery(params),
        "ui": {
            ...state.ui,
            "searchQuery": undefinedAsEmpty(queryString)
        }
    };
}

function paramsToQuery(params) {
    // TODO Move to other layer as some form of a synchronization store - location.
    let page = parseInt(params[getQuery(PAGE_QUERY)]);
    if (isNaN(page)) {
        page = 0;
    }

    let order = params[getQuery(SORT_QUERY)];
    if (order === undefined) {
        order = "title_sort asc";
    }

    let pageSize = parseInt(params[getQuery(PAGE_SIZE_QUERY)]);
    if (isNaN(pageSize)) {
        pageSize = 10;
    }

    let datasetView = parseInt(params[getQuery(VIEW_QUERY)]);
    if (isNaN(datasetView)) {
        datasetView = 0;
    }

    return {
        "page": page,
        "search": params[getQuery(STRING_QUERY)],
        "keyword": asArray(params[getQuery(KEYWORDS_QUERY)]),
        "publisher": asArray(params[getQuery(PUBLISHER_QUERY)]),
        "format": asArray(params[getQuery(FORMAT_QUERY)]),
        "theme": asArray(params[getQuery(THEME_QUERY)]),
        "sort": order,
        "pageSize": pageSize,
        "temporalStart": undefinedAsEmpty(params[getQuery(TEMPORAL_START)]),
        "temporalEnd": undefinedAsEmpty(params[getQuery(TEMPORAL_END)]),
        "datasetListView": datasetView
    };
}

function asArray(value) {
    if (value === undefined) {
        return [];
    } else if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
}

function undefinedAsEmpty(value) {
    if (value === undefined) {
        return "";
    } else {
        return value;
    }
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];
const dataSelector = (state) => reducerSelector(state)["data"];

export function datasetsSelector(state) {
    return dataSelector(state)["datasets"];
}

export function datasetsTotalCountSelector(state) {
    return dataSelector(state)["datasetCount"];
}

export function dataStatusSelector(state) {
    return dataSelector(state)["status"];
}

export function queryKeywordsSelector(state) {
    return dataSelector(state)["keyword"];
}

export function queryPublishersSelector(state) {
    return dataSelector(state)["publisher"];
}

export function queryFormatsSelector(state) {
    return dataSelector(state)["format"];
}

export function queryThemesSelector(state) {
    return dataSelector(state)["theme"];
}

export function querySelector(state) {
    return reducerSelector(state)["query"];
}

export function selectedKeywordsSelector(state) {
    return querySelector(state)["keyword"];
}

export function selectedPublishersSelector(state) {
    return querySelector(state)["publisher"];
}

export function selectedFormatsSelector(state) {
    return querySelector(state)["format"];
}

export function selectedThemesSelector(state) {
    return querySelector(state)["theme"];
}
