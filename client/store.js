import {createStore, compose, applyMiddleware} from "redux";
import reducers from "./reducer";
import thunk from "redux-thunk";
import {routerMiddleware} from "react-router-redux";
import {browserHistory} from "react-router";

export function configureStore(initialState = {}) {

    // Support for Redux dev tools.
    const devToolsEnhancers = window.devToolsExtension ?
        window.devToolsExtension() : f => f;

    // TODO Check that routerMiddleware is necessary to use in version 3.
    const enhancer = compose(
        applyMiddleware(thunk, routerMiddleware(browserHistory)),
        devToolsEnhancers
    );

    const store = createStore(reducers, initialState, enhancer);

    // TODO Test and add support for hot redeploy.
    // if (module.hot) {
    //     module.hot.accept('../reducers', () => {
    //          store.replaceReducer(require('./../reducers').default);
    //      });
    // };

    return store;
};
