import "../modules";
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {getRegistered} from "./register";
import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {routerMiddleware} from "react-router-redux";
import {reducer as notificationReducer} from "react-notification-system-redux";

export function create(history) {
    const reducer = prepareReducer();
    const enhancer = prepareEnhancer(history);
    const initialState = {};
    return createStore(reducer, initialState, enhancer);
}

function prepareReducer() {
    const configuration = {
        "routing": routerReducer,
        "notifications": notificationReducer
    };
    addRegisteredReducers(configuration);
    return combineReducers(configuration);
}

function addRegisteredReducers(configuration) {
    getRegistered().forEach((entry) => {
        if (entry.reducer === undefined) {
            return;
        }
        configuration[entry.name] = entry.reducer;
    });
}

function prepareEnhancer(history) {
    const composeEnhancers = getComposeMethod();
    return composeEnhancers(
        applyMiddleware(routerMiddleware(history), thunk)
    );
}

function getComposeMethod() {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
