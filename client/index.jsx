import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {create} from "./app/store";
import {createRoutes} from "./app/navigation";
import Raven from "raven-js";
import Promise from "es6-promise";
import "isomorphic-fetch";


// TODO Move to extra file with together with "isomorphic-fetch"
function backwardCompatibility() {
    if (!window.Promise) {
        window.Promise = Promise;
    }
}

backwardCompatibility();

const store = create(browserHistory);
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
