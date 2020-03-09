//
// Register all components, this require that we have a knowledge of
// all components before the registration is running.
//

import React from "react";
import {App} from "./app";
import {Router, Route, Switch} from "react-router-dom";
import {getRegisteredViews, getRegisteredElement} from "./register";
import {getAllNamesForView} from "./navigation";
import {ELEMENT_PAGE_NOT_FOUND} from "./component-list";
import {initializeNavigation} from "./navigation";

const PageNotFound = getRegisteredElement(ELEMENT_PAGE_NOT_FOUND);

export function createRoutes(history) {
  initializeNavigation();
  return (
    <Router history={history}>
      <App>
        <Switch>
          {getRouteObjects().map(page =>
            <Route
              key={page.id}
              path={page.link}
              component={page.component}
              exact={page.exact}
            />)}
          <Route path="*" component={PageNotFound}/>
        </Switch>
      </App>
    </Router>
  )
}

function getRouteObjects() {
  const routes = [];
  getRegisteredViews().forEach((view) => {
    getAllNamesForView(view.url).forEach(({language, value}) => {
      routes.push({
        "id": view.name + "-" + language,
        "link": value,
        "component": view.view,
        "exact": view.exact,
      });
      // Some browsers (IE, Edge) does not escape national characters,
      // while others (Firefox, Chrome) do; therefore, we need to be ready
      // to handle both variants. That is why, we add escaped version for all
      // but english.
      if (encodeURI(value) !== value) {
        routes.push({
          "id": view.name + "-" + language + "-encoded",
          "link": encodeURI(value),
          "component": view.view,
          "exact": view.exact,
        });
      }
    });
  });
  console.log("Route:", getRegisteredViews(), "->", routes);
  return routes;
}
