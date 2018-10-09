import {
    FETCH_INITIAL_DATA_SUCCESS,
    FETCH_INITIAL_DATA_FAILED,
    FETCH_INITIAL_SOLR_SUCCESS,
    FETCH_INITIAL_SOLR_FAILED
} from "./initial-data-actions"

const initialState = {
    "dataFetched": false,
    "solrFetched": false,
};

const reducerName = "initial-data";

function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_INITIAL_DATA_FAILED:
        case FETCH_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                "dataFetched": true
            };
        case FETCH_INITIAL_SOLR_FAILED:
        case FETCH_INITIAL_SOLR_SUCCESS:
            return {
                ...state,
                "solrFetched": true
            };
        default:
            return state;
    }
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function isReady(state) {
    return reducerSelector(state).dataFetched &&
        reducerSelector(state).solrFetched;
}