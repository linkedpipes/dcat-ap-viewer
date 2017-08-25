import {
    FETCH_LIST_PAGE_REQUEST,
    FETCH_LIST_PAGE_SUCCESS,
    FETCH_LIST_PAGE_FAILED
} from "./organisation-list-action";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED,
    STATUS_FAILED
} from "./../../services/http-request";

const initialState = {
    "data": {
        "status": STATUS_INITIAL,
        "organisationsCount": 0,
        "organisations": [],
    }
};

function parseSolrResponse(state, json) {
    const publisher = json.facet_counts.facet_fields.publisherName;
    const publisher_list = [];
    for (let index = 0; index < publisher.length; index += 2) {
        publisher_list.push({
            "label": publisher[index],
            "count": publisher[index + 1]
        });
    }
    publisher_list.sort((left, right) => right.count - left.count);
    return {
        ...state,
        "data": {
            "status": STATUS_FETCHED,
            "organisations": publisher_list
        }
    };
}

export const organisationListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIST_PAGE_REQUEST:
            return {
                ...state,
                "data": {
                    ...state.data,
                    "status": STATUS_FETCHING
                }
            };
        case FETCH_LIST_PAGE_SUCCESS:
            return parseSolrResponse(state, action.data);
        case FETCH_LIST_PAGE_FAILED:
            return {
                ...state,
                "data": {
                    ...state.data,
                    "status": STATUS_FAILED
                }
            };
        default:
            return state
    }
};