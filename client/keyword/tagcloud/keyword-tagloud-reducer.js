import {
    FETCH_KEYWORDS_FAILED,FETCH_KEYWORDS_SUCCESS,FETCH_KEYWORDS_REQUEST
} from "./keyword-tagloud-action";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED,
    STATUS_FAILED
} from "./../../services/http-request";

const initialState = {
    "data": {
        "status": STATUS_INITIAL,
        "keywords": [],
    }
};

function parseSolrResponse(state, json) {
    const keywords = json.facet_counts.facet_fields.keyword;
    const keywordsList = [];
    for (let index = 0; index < keywords.length; index += 2) {
        keywordsList.push({
            "label": keywords[index],
            "count": keywords[index + 1]
        });
    }
    keywordsList.sort((left, right) => right.count - left.count);
    return {
        ...state,
        "data": {
            "status": STATUS_FETCHED,
            "keywords": keywordsList
        }
    };
}

export const keywordsTagCloudReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_KEYWORDS_REQUEST:
            return {
                ...state,
                "data": {
                    ...state.data,
                    "status": STATUS_FETCHING
                }
            };
        case FETCH_KEYWORDS_SUCCESS:
            return parseSolrResponse(state, action.data);
        case FETCH_KEYWORDS_FAILED:
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