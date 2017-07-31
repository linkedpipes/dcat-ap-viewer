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
    STRING_QUERY,
    PAGE_QUERY
} from "../../application/navigation";


// TODO Isolate changes to minimize rendering.
//  For example paginator re-render on every change of string query.

const initialState = {
    "ui": {
        "searchQuery": "",
    },
    "data": {
        // TODO Replace with "status" in "DAO" layer
        "status": "uninitialized",
        "datasetCount": 0,
        "datasets": [],
        "keyword": [],
        "publisher": [],
        "format": []
    },
    // Mirror of location.
    "query": {
        // TODO Update pages to start from 1, as it will look better in URL.
        "page": 0,
        "search": "",
        "keyword": [],
        "publisher": [],
        "format": []
    }
};

function parseSolrResponse(state, json) {

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

    return {
        ...state,
        "data": {
            "status": "actual",
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
            "format": format_list
        }
    };
}

function locationToQuery(location) {
    let page = parseInt(location[getQuery(PAGE_QUERY)]);
    if (isNaN(page)) {
        page = 0;
    }
    return {
        "page": page,
        "search": location[getQuery(STRING_QUERY)],
        "keyword": asArray(location[getQuery(KEYWORDS_QUERY)]),
        "publisher": asArray(location[getQuery(PUBLISHER_QUERY)]),
        "format": asArray(location[getQuery(FORMAT_QUERY)])
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

export const datasetListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIST_PAGE_REQUEST:
            return {
                ...state,
                "data": {
                    ...state.data,
                    // TODO Use constant from DAO.
                    "status": "fetching"
                }
            };
        case FETCH_LIST_PAGE_SUCCESS:
            return parseSolrResponse(state, action.data);
        case FETCH_LIST_PAGE_FAILED:
            return {
                ...state,
                "data": {
                    ...state.data,
                    // TODO Use constant from DAO.
                    "status": "failed"
                }
            };
        case SET_LIST_QUERY_STRING:
            return {
                ...state,
                "ui": {
                    ...state.ui,
                    "searchQuery": action.value
                }
            };
        case "@@router/LOCATION_CHANGE":
            const queryString = action.payload.query[getQuery(STRING_QUERY)];
            return {
                ...state,
                "query": locationToQuery(action.payload.query),
                "ui": {
                    ...state.ui,
                    "searchQuery": undefinedAsEmpty(queryString)
                }
            };
        default:
            return state
    }
};

function undefinedAsEmpty(value) {
    if (value === undefined) {
        return "";
    } else {
        return value;
    }
}