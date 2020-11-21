/**
 * Import this file at the end of you profile index file, after all
 * modules were imported.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {getServices} from "./core/register";
import {createStore} from "./core/store-factory";
import {createRoutes} from "./core/route-factory";

getServices().forEach(entry => entry.service.beforeCreateStore());

const store = createStore();

ReactDOM.render((
  <Provider store={store}>
    {createRoutes()}
  </Provider>
), document.getElementById("dcat-ap-viewer"));
