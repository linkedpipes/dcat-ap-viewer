import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router"
import Raven from "raven-js";
import {createBrowserHistory} from "history";
import "@/app-services/backward-compatibility";
import {createStore} from "@/app/store";
import {createRoutes} from "@/app/navigation";
import {initialize as initializeStrings} from "@/app-services/strings";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/index.style.css";

const history = createBrowserHistory();
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
