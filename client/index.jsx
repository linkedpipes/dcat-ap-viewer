import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import Raven from "raven-js";
import createHistory from "history/createBrowserHistory";
import "@/app-services/backward-compatibility";
import {createStore} from "@/app/store";
import {createRoutes} from "@/app/navigation";
import {initialize as initializeStrings} from "@/app-services/strings";

import "@/index.style.css";

const history = createHistory();
const store = createStore(history);
initializeStrings();

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
