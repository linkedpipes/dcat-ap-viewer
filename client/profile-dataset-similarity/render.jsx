/**
 * Import this file at the end of you profile index file, after all
 * modules were imported.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {getServices} from "../viewer-react/core/register";
import {createStore} from "../viewer-react/core/store-factory";
import {createRoutes} from "../viewer-react/core/route-factory";

import {removeFromRegistry} from "./viewer-api";
import configuration from "./profile-configuration";

// By registering empty elements we can disable the components.
if (configuration.disableDatasetList) {
  removeFromRegistry("dataset-list.view");
}
if (configuration.disableDatasetSimilarity) {
  removeFromRegistry("dataset-detail.parts");
}

getServices().forEach(entry => entry.service.beforeCreateStore());

const store = createStore();

ReactDOM.render((
  <Provider store={store}>
    {createRoutes()}
  </Provider>
), document.getElementById("dcat-ap-viewer"));
