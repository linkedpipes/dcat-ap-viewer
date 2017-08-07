import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {configureStore} from "./store";
import {createRoutes} from "./application/navigation";
import Raven from "raven-js";
import "./components/google-analytics";
import Promise from "es6-promise";
import "isomorphic-fetch";

function backwardCompatibility() {
    if (!window.Promise) {
        window.Promise = Promise;
    }
}

backwardCompatibility();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// TODO Add Raven component for exception handling
//  https://docs.sentry.io/clients/javascript/integrations/react/
if (SENTRY_REPORT) {
    Raven.config(SENTRY_URL).install();
}

ReactDOM.render((
    <Provider store={store}>
        <Router history={history} routes={createRoutes()}/>
    </Provider>
), document.getElementById("app"));
