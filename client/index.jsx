import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {createBrowserHistory} from "history";

// We import style before profile, so the profile can override it.
import "bootstrap/dist/css/bootstrap.min.css";

import "./../profile/profile-selector";
import {createStore} from "./app/store-factory";
import {createRoutes} from "./app/route-factory";

const history = createBrowserHistory();
const store = createStore(history);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {createRoutes(history)}
    </ConnectedRouter>
  </Provider>
), document.getElementById("dcat-ap-viewer"));
