import {combineReducers} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {getRegistered} from "./register";
import {createStore as createReduxStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import "../modules";

export function createStore(history) {
    const reducer = prepareReducer(history);
    const enhancer = prepareEnhancer(history);
    const initialState = {};
    return createReduxStore(reducer, initialState, enhancer);
}

function prepareReducer(history) {
    const reducers = {
        "router": connectRouter(history),
    };
    addRegisteredReducers(reducers);
    return combineReducers(reducers);
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
