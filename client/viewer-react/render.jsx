/**
 * Import this file at the end of you profile index file, after all
 * modules were imported.
 */
import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

import {getServices} from "./core/register";
import {store} from "./core/store-factory";
import {createRoutes} from "./core/route-factory";

getServices().forEach(entry => entry.service.beforeCreateStore());

const container = document.getElementById("dcat-ap-viewer");
const root = createRoot(container);

root.render((
  <Provider store={store}>
    {createRoutes()}
  </Provider>
));
