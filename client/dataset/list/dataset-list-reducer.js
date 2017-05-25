import {
    FETCH_LIST_PAGE_REQUEST,
    FETCH_LIST_PAGE_SUCCESS,
    FETCH_LIST_PAGE_FAILED,
    SET_LIST_QUERY_STRING
} from "./dataset-list-actions";

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
                "iri": item.iri[0],
                "modified": item.modified[0],
                "accrualPeriodicity": item.accrualPeriodicity[0],
                "description": item.description[0],
                "issued": item.issued[0],
                "publisher": item.publisherName[0],
                "title": item.title[0],
                "keyword": item.keyword,
                "format": item.formatName,
                "license": item.license
            })),
            "keyword": keywords_list,
            "publisher": publisher_list,
            "format": format_list
        }
    };
}

function locationToQuery(location) {
    let page = parseInt(location.page);
    if (isNaN(page)) {
        page = 0;
    }

    return {
        "page": page,
        "search": location.search,
        "keyword": asArray(location.keyword),
        "publisher": asArray(location.publisher),
        "format": asArray(location.format)
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
            // TODO Add loading indicator.
            return state;
        case FETCH_LIST_PAGE_SUCCESS:
            return parseSolrResponse(state, action.data);
        case FETCH_LIST_PAGE_FAILED:
            // TODO Implement.
            return state;
        case SET_LIST_QUERY_STRING:
            return {
                ...state,
                "ui": {
                    ...state.ui,
                    "searchQuery": action.value
                }
            };
        case "@@router/LOCATION_CHANGE":
            return {
                ...state,
                "query": locationToQuery(action.payload.query),
                "ui": {
                    ...state.ui,
                    "searchQuery": undefinedAsEmpty(action.payload.query.search)
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