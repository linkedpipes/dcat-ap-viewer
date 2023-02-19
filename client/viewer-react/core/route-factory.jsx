//
// Register all components, this requires that we have a knowledge of
// all components before the registration is running.
//

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {getViews, getElement} from "./register";

export function createRoutes() {
  const Application = getElement("application").element;
  const PageNotFound = getElement("view.page-not-found").element;

  return (
    <BrowserRouter>
      <Application>
        <Routes>
          {getRouteObjects().map(createRoute)}
          <Route element={PageNotFound}/>
        </Routes>
      </Application>
    </BrowserRouter>
  );
}

function getRouteObjects() {
  const routes = [];
  getViews().forEach((view) => {
    getViewPaths(view).forEach(({language, path}) => {
      routes.push({
        "id": view.name + "-" + language,
        "link": path,
        "component": view.view,
        "exact": view.exact,
      });
      // Some browsers (IE, Edge) does not escape national characters,
      // while others (Firefox, Chrome) do; therefore, we need to be ready
      // to handle both variants. That is why, we add escaped version where
      // there is a difference.
      if (encodeURI(path) !== path) {
        routes.push({
          "id": view.name + "-" + language + "-encoded",
          "link": encodeURI(path),
          "component": view.view,
          "exact": view.exact,
        });
      }
    });
  });
  console.log("Views:", getViews(), "\nRouters:", routes);
  return routes;
}

function getViewPaths(view) {
  const result = [];
  for (const [language, entries] of Object.entries(view.navigation)) {
    result.push({
      "language": language,
      "path": entries[view.url],
    });
  }
  return result;
}

function createRoute(page) {
  const Component = page.component;
  return <Route
    key={page.id}
    path={page.link}
    element={<Component/>}
    exact={page.exact}
  />;
}
