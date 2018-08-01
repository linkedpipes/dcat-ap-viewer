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
    TEMPORAL_END
} from "../../app/navigation";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHING_UPDATE,
    STATUS_FETCHED
} from "../../app-services/http-request";
import {parse as parseQueryString} from "query-string";

// TODO Isolate changes to minimize rendering.
//  For example paginator re-render on every change of string query.

const initialState = {
    "data": {
        "status": STATUS_INITIAL,
        "datasetCount": 0,
        "datasets": [],
        // TODO Move to upper level.
        "keyword": [],
        "publisher": [],
        "format": [],
        "theme": [],
        // TODO Do we need this properties?
        "sort": "modified",
        "temporalStart": "",
        "temporalEnd": ""
    },
    // Mirror of location.
    "query": {
        // TODO Update pages to start from 1, as it will look better in URL.
        "page": 0,
        "search": "",
        "keyword": [],
        "publisher": [],
        "format": [],
        "theme": [],
        "sort": "title asc",
        "pageSize": 10,
        "temporalStart": "",
        "temporalEnd": ""
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

    const keywords = json.facet_counts.facet_fields.keyword;
    const keywords_list = [];
    for (let index = 0; index < keywords.length; index += 2) {
        keywords_list.push({
            "label": keywords[index],
            "count": keywords[index + 1]
        });
    }

    const publisher = json.facet_counts.facet_fields.publisherName;
    const publisher_list = [];
    for (let index = 0; index < publisher.length; index += 2) {
        publisher_list.push({
            "label": publisher[index],
            "count": publisher[index + 1]
        });
    }

    const format = json.facet_counts.facet_fields.formatName;
    const format_list = [];
    for (let index = 0; index < format.length; index += 2) {
        format_list.push({
            "label": format[index],
            "count": format[index + 1]
        });
    }

    const theme = json.facet_counts.facet_fields.theme;
    const theme_list = [];
    for (let index = 0; index < theme.length; index += 2) {
        theme_list.push({
            "iri": theme[index],
            "count": theme[index + 1]
        });
    }

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
            "keyword": keywords_list,
            "publisher": publisher_list,
            "format": format_list,
            "theme": theme_list,
            "sort": json.responseHeader.params.sort
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
    const params = parseQueryString(action.payload.search);
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
    // TODO Move to other layer
    let page = parseInt(params[getQuery(PAGE_QUERY)]);
    if (isNaN(page)) {
        page = 0;
    }
    let order = params[getQuery(SORT_QUERY)];
    if (order === undefined) {
        order = "modified desc";
    }
    let pageSize = parseInt(params[getQuery(PAGE_SIZE_QUERY)]);
    if (isNaN(pageSize)) {
        pageSize = 10;
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
        "temporalEnd": undefinedAsEmpty(params[getQuery(TEMPORAL_END)])
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

export function keywordsSelector(state) {
    return reducerSelector(state)["data"]["keyword"];
}

export function publishersSelector(state) {
    return reducerSelector(state)["data"]["publisher"];
}

export function formatsSelector(state) {
    return reducerSelector(state)["data"]["format"];
}

export function themesSelector(state) {
    return reducerSelector(state)["data"]["theme"];
}

export function datasetsSelector(state) {
    return reducerSelector(state)["data"]["datasets"];
}

export function datasetsTotalCountSelector(state) {
    return reducerSelector(state)["data"]["datasetCount"];
}

export function dataStatusSelector(state) {
    return reducerSelector(state)["data"]["status"];
}

export function querySelector(state) {
    return reducerSelector(state)["query"];
}