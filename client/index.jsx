import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import {createStore} from "./app/store";
import {createRoutes} from "./app/navigation";
import Raven from "raven-js";
import {Promise} from "es6-promise";
import "isomorphic-fetch";
import createHistory from "history/createBrowserHistory";

// TODO Move to extra file with together with "isomorphic-fetch"
function backwardCompatibility() {
    if (!window.Promise) {
        window.Promise = Promise;
    }
}

backwardCompatibility();

const history = createHistory();
const store = createStore(history);

// TODO Add Raven component for exception handling
//  https://docs.sentry.io/clients/javascript/integrations/react/
if (SENTRY_REPORT) {
    Raven.config(SENTRY_URL).install();
}

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {createRoutes(history)}
        </ConnectedRouter>
    </Provider>
), document.getElementById("app"));
