import {
    FETCH_DATASET_REQUEST,
    FETCH_DATASET_SUCCESS,
    FETCH_DATASET_FAILED,
    FETCH_DISTRIBUTION_REQUEST,
    FETCH_DISTRIBUTION_SUCCESS,
    FETCH_DISTRIBUTION_FAILED,
    SET_DISTRIBUTION_PAGE_INDEX,
    SET_DISTRIBUTION_PAGE_SIZE
} from "./dataset-detail-actions";
import {FETCH_LABEL_SUCCESS} from "./../../services/labels";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED
} from "./../../services/http-request";

const initialState = {
    // TODO Extract UI to another reducer.
    "ui": {
        "distributionsPageIndex": 0,
        "distributionsPageSize": 10
    },
    "dataset": {
        "status": STATUS_INITIAL
    },
    "distributions": {}
};

// TODO Extract "labels" service?

// TODO Extract state transforming functions.
export const datasetDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATASET_REQUEST:
            return onDatasetRequest(state, action);
        case FETCH_DATASET_SUCCESS:
            return onDatasetRequestSuccess(state, action);
        case FETCH_DATASET_FAILED:
            return onDatasetRequestFailed(state, action);
        case FETCH_LABEL_SUCCESS:
            return onLabelRequestSuccess(state, action);
        case FETCH_DISTRIBUTION_REQUEST:
            return onDistributionRequest(state, action);
        case FETCH_DISTRIBUTION_SUCCESS:
            return onDistributionRequestSuccess(state, action);
        case FETCH_DISTRIBUTION_FAILED:
            return onDistributionRequestFailed(state, action);
        case SET_DISTRIBUTION_PAGE_INDEX:
            return onSetDistributionPage(state, action);
        case SET_DISTRIBUTION_PAGE_SIZE:
            return onSetDistributionPageSize(state, action);
        default:
            return state
    }
};

function onDatasetRequest(state, action) {
    return {
        ...state,
        "dataset": {
            "@id": action.iri,
            "status": STATUS_FETCHING
        }
    };
}

function onDatasetRequestSuccess(state, action) {
    return {
        ...state,
        "dataset": {
            ...action.data,
            "status": STATUS_FETCHED
        }
    };
}

function onDatasetRequestFailed(state, action) {
    return {
        ...state,
        "dataset": {
            ...action.data,
            "status": action.error.status
        }
    };
}

function onLabelRequestSuccess(state, action) {
    if (action.identifier.target === "dataset") {
        return {
            ...state,
            "dataset": addLabelToDataset(state["dataset"], action)
        }
    } else if (action.identifier.target === "distribution") {
        return {
            ...state,
            "distributions": addLabelToDistributions(
                state["distributions"], action)
        }
    } else {
        return state;
    }
}

function addLabelToDataset(dataset, action) {
    if (action.identifier.index) {
        return addLabelToDatasetArray(dataset, action);
    } else {
        return addLabelToDatasetObject(dataset, action);
    }
}

function addLabelToDatasetArray(dataset, action) {
    const {key, index} = action.identifier;
    return {
        ...dataset,
        [key]: addToArrayItem(index, dataset[key], action.data)
    };
}

function addToArrayItem(index, arrayToUpdate, toAdd) {
    const output = arrayToUpdate.slice();
    output[index] = {
        ...output[index],
        ...toAdd
    };
    return output;
}

function addLabelToDatasetObject(dataset, action) {
    const {key} = action.identifier;
    return {
        ...dataset,
        [key]: {
            ...dataset[key],
            ...action.data
        }
    }
}

function addLabelToDistributions(distributions, action) {
    const {iri, key} = action.identifier;
    return {
        ...distributions,
        [iri]: {
            ...distributions[iri],
            [key]: {
                ...distributions[iri][key],
                ...action.data
            }
        }
    };
}

function onDistributionRequest(state, action) {
    return {
        ...state,
        "distributions": copyAndAdd(state.distributions, action.iri, {
            ...action.data,
            "status": STATUS_FETCHING
        })
    };
}

function copyAndAdd(dictionary, key, item) {
    const copy = {...dictionary};
    copy[key] = item;
    return copy;
}

function onDistributionRequestSuccess(state, action) {
    return {
        ...state,
        "distributions": copyAndAdd(state.distributions, action.iri,
            {
                ...action.data,
                "status": STATUS_FETCHED
            })
    };
}

function onDistributionRequestFailed(state, action) {
    return {
        ...state,
        "distributions": copyAndAdd(state.distributions, action.iri,
            {
                "status": action.error.status
            })
    };
}

function onSetDistributionPage(state, action) {
    return {
        ...state,
        "ui": {
            ...state.ui,
            "distributionsPageIndex": action.page
        }
    };
}

function onSetDistributionPageSize(state, action) {
    return {
        ...state,
        "ui": {
            ...state.ui,
            "distributionsPageIndex": 0,
            "distributionsPageSize": action.size
        }
    };
}

// TODO Add selectors.
