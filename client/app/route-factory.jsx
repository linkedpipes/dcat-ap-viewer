import React from "react";
import {App} from "./app";
import {Router, Route, Switch} from "react-router-dom";
import {getRegistered} from "./register";
import {navigation} from "./navigation";
import {get} from "./language";

export const createRoutes = (history) => (
  <Router history={history}>
    <App>
      <Switch>
        {getRouteObjects().map(page =>
          <Route key={page.id}
                 path={page.link}
                 component={page.component}
                 exact={page.exact}
          />)}
        <Route path="*" component={PageNotFound}/>
      </Switch>
    </App>
  </Router>
);

function getRouteObjects() {
  const routes = [];
  const languages = Object.keys(Routes);
  getRegistered().forEach((entry) => {
    if (entry.url === undefined || entry.component === undefined) {
      return;
    }
    languages.forEach((language) => {
      const url = navigation[language][PAGE][entry.url];
      // Some browsers (IE, Edge) does not escape national characters,
      // while others (Firefox, Chrome) do, therefore we need to be ready
      // to handle both variants. So we add escaped version for all
      // but english.
      if (language !== "en") {
        routes.push({
          "id": entry.name + "-" + language,
          "link": URL_PREFIX + "/" + encodeURI(url),
          "component": entry.component,
          "exact": false,
        });
      }
      routes.push({
        "id": entry.name + "-" + language,
        "link": URL_PREFIX + "/" + (url),
        "component": entry.component,
        "exact": false,
      });
    });
    if (entry.homepage) {
      routes.push({
        "id": "homepage",
        "link": URL_PREFIX + "/",
        "component": entry.component,
        "exact": true,
      });
    }

  });
  return routes;
}

export function translate(value, type, targetLanguage) {
  for (let language in navigation) {
    const value_map = navigation[language][type];
    for (let key in value_map) {
      if (value === value_map[key]) {
        return navigation[targetLanguage][type][key];
      }
    }
  }
}

export function getLanguageForUrl(value) {
  for (let language in navigation) {
    const value_map = navigation[language][PAGE];
    for (let key in value_map) {
      if (value === value_map[key]) {
        return language;
      }
    }
  }
  return getDefaultLanguage();
}
