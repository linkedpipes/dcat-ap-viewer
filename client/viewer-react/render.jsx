/**
 * Import this file at the end of you profile index file, after all
 * modules were imported.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {getServices} from "./core/register";
import {store} from "./core/store-factory";
import {createRoutes} from "./core/route-factory";

getServices().forEach(entry => entry.service.beforeCreateStore());

ReactDOM.render((
  <Provider store={store}>
    {createRoutes()}
  </Provider>
), document.getElementById("dcat-ap-viewer"));
