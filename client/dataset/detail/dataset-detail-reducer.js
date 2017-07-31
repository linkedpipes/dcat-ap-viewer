import {
    FETCH_DATASET_REQUEST,
    FETCH_DATASET_SUCCESS,
    FETCH_DATASET_FAILED,
    FETCH_DISTRIBUTION_REQUEST,
    FETCH_DISTRIBUTION_SUCCESS,
    FETCH_DISTRIBUTION_FAILED,
    SET_DISTRIBUTION_PAGE_INDEX
} from "./dataset-detail-actions";

const initialState = {
    "ui": {
        "distributionsPageIndex": 0
    },
    "dataset": {
        // TODO Replace with "status" in "DAO" layer
        "status": "uninitialized"
    },
    "distributions": {}
};

export const datasetDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATASET_REQUEST:
            return {
                ...state,
                "dataset": {
                    "iri": action.iri,
                    "status": "fetching"
                }
            };
        case FETCH_DATASET_SUCCESS:
            return {
                ...state,
                "dataset": {
                    ...action.data,
                    "status": "actual"
                }
            };
        case FETCH_DATASET_FAILED:
            return {
                ...state,
                "dataset": {
                    ...action.data,
                    "status": "failed"
                }
            };
        case FETCH_DISTRIBUTION_REQUEST:
            return {
                ...state,
                "distributions": copyAndAdd(state.distributions, action.iri, {
                    ...action.data,
                    "status": "fetching"
                })
            }
            return state;
        case FETCH_DISTRIBUTION_SUCCESS:
            if (action.data === undefined) {
                return {
                    ...state,
                    "distributions": copyAndAdd(state.distributions, action.iri,
                        {
                            "status": "failed"
                        })
                };
            } else {
                return {
                    ...state,
                    "distributions": copyAndAdd(state.distributions, action.iri,
                        {
                            ...action.data,
                            "status": "actual"
                        })
                };
            }
        case FETCH_DISTRIBUTION_FAILED:
            return {
                ...state,
                "distributions": copyAndAdd(state.distributions, action.iri,
                    {
                        "status": "failed"
                    })
            };
        case SET_DISTRIBUTION_PAGE_INDEX:
            return {
                ...state,
                "ui": {
                    ...state.ui,
                    "distributionsPageIndex": action.page
                }
            }
        default:
            return state
    }
};

function copyAndAdd(dictionary, key, item) {
    const copy = {...dictionary};
    copy[key] = item;
    return copy;
}