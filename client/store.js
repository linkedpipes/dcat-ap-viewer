import {createStore, compose, applyMiddleware} from "redux";
import reducers from "./reducer";
import thunk from "redux-thunk";

export function configureStore(initialState = {}) {

    // Support for Redux dev tools.
    const devToolsEnhancers = window.devToolsExtension ?
        window.devToolsExtension() : f => f;

    const enhancer = compose(
        applyMiddleware(thunk),
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
