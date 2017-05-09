import {
    FETCH_LIST_PAGE_REQUEST,
    FETCH_LIST_PAGE_SUCCESS,
    FETCH_LIST_PAGE_FAILED,
    SET_LIST_PAGE,
    SET_LIST_FACET_FILTER,
    SET_LIST_QUERY_STRING,
    SET_LIST_QUERY_FILTER
} from "./actions";

const initialState = {
    "fetching": false,
    "pageCount": 11068,
    "data": [],
    "keyword": [],
    "publisher": [],
    "searchString": "",
    "query": {
        "page": 0,
        "search": "",
        "keyword": [],
        "publisher": []
    }
};

function parseSolrResponse(state, json) {

    const pageCount = Math.ceil(json.response.numFound / 10);

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

    const data = {
        "fetching": false,
        "data": json.response.docs.map((item) => ({
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
        "pageCount": pageCount,
        "keyword": keywords_list,
        "publisher": publisher_list,
        // Do not change the query, as it is still the same.
        "query": state.query
    };
    return data;
}

export const datasetListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIST_PAGE_REQUEST:
            return {
                ...state,
                "fetching": true
            };
        case FETCH_LIST_PAGE_SUCCESS:
            return parseSolrResponse(state, action.data);
        case FETCH_LIST_PAGE_FAILED:
            // TODO Handle failure
            return {
                ...state,
                "fetching": false
            };
        case SET_LIST_QUERY_STRING:
            return {
                ...state,
                "searchString": action.value
            };
        case SET_LIST_QUERY_FILTER:
            return {
                ...state,
                "query": {
                    ...state.query,
                    "search": action.value
                }
            };
        case SET_LIST_FACET_FILTER:
            const newState = {
                ...state,
                "query": {
                    ...state.query
                }
            };
            const index = state.query[action.facet].indexOf(action.value.label);
            if (index == -1) {
                newState.query[action.facet] = [
                    ...newState.query[action.facet],
                    action.value.label];
            } else {
                newState.query[action.facet] = [
                    ...newState.query[action.facet].splice(0, index),
                    ...newState.query[action.facet].splice(index + 1)
                ]
            }
            return newState;
        case SET_LIST_PAGE:
            return {
                ...state,
                "query": {
                    ...state.query,
                    "page": action.page
                }
            }
        default:
            return state
    }
};
