import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {configureStore} from "./store";
import {createRoutes} from "./application/navigation";
import Raven from "raven-js";

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
