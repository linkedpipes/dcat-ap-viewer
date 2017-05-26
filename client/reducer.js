import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {datasetListReducer} from "./dataset/list/dataset-list-reducer";
import {datasetDetailReducer} from "./dataset/detail/dataset-detail-reducer";
import {organisationListReducer} from "./organisation/list/organisation-list-reducer";

// http://redux.js.org/docs/api/combineReducers.html
const reducers = combineReducers({
    "routing": routerReducer,
    "dataset": combineReducers({
        "list": datasetListReducer,
        "detail": datasetDetailReducer
    }),
    "organisation": combineReducers({
        "list": organisationListReducer
    })
});

export default reducers;
