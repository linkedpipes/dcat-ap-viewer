import {
    MOUNT_DISTRIBUTION,
    UNMOUNT_DISTRIBUTION,
    FETCH_DISTRIBUTION_REQUEST,
    FETCH_DISTRIBUTION_SUCCESS,
    FETCH_DISTRIBUTION_FAILED,
    SET_DISTRIBUTION_PAGE_INDEX,
    SET_DISTRIBUTION_PAGE_SIZE
} from "./distribution-action";
import {
    STATUS_FETCHING,
    STATUS_FETCHED
} from "app-services/http-request";

const reducerName = "dataset-detail-distribution";

function reducer(state = {}, action) {
    switch (action.type) {
        case MOUNT_DISTRIBUTION:
            return onMount();
        case UNMOUNT_DISTRIBUTION:
            return {};
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
}

function onMount() {
    return {
        "page": 0,
        "pageSize": 10,
        "distributions": []
    }
}

function onDistributionRequest(state, action) {
    return {
        ...state,
        "distributions": {
            ...state.distributions,
            [action.iri]: {
                "status": STATUS_FETCHING
            }
        }
    };
}

function onDistributionRequestSuccess(state, action) {
    return {
        ...state,
        "distributions": {
            ...state.distributions,
            [action.iri]: {
                "status": STATUS_FETCHED,
                "data": action.distribution
            }
        }
    };
}

function onDistributionRequestFailed(state, action) {
    return {
        ...state,
        "distributions": {
            ...state.distributions,
            [action.iri]: {
                "status": action.error.status,
                "data": action.data
            }
        }
    };
}

function onSetDistributionPage(state, action) {
    return {
        ...state,
        "pageIndex": action.page
    };
}

function onSetDistributionPageSize(state, action) {
    return {
        ...state,
        "page": 0,
        "pageSize": action.size
    };
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function pageSelector(state) {
    return reducerSelector(state)["page"];
}

export function pageSizeSelector(state) {
    return reducerSelector(state)["pageSize"];
}

export function distributionStatusSelector(state, iri) {
    const distributions = reducerSelector(state)["distributions"];
    if (distributions === undefined) {
        return undefined;
    }
    const dist = distributions[iri];
    if (dist === undefined) {
        return undefined;
    } else {
        return dist["status"];
    }
}

export function distributionDataSelector(state, iri) {
    const distributions = reducerSelector(state)["distributions"];
    if (distributions === undefined) {
        return undefined;
    }
    const dist = distributions[iri];
    if (dist === undefined) {
        return undefined;
    } else {
        return dist["data"];
    }
}
