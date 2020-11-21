import configuration from "./configuration";
import {Helmet} from "react-helmet";
import React from "react";

import {getViewByUrl} from "../core/register";
import {
  getLanguages, getPath, getQuery, PAGE_NOT_FOUND_PATH,
} from "./translations";
import {NavigationConsumer, NavigationData} from "./navigation";

export function CanonicalLink() {
  return (
    <NavigationConsumer>
      {createCanonicalLinks}
    </NavigationConsumer>
  );
}

function createCanonicalLinks(navigation: NavigationData) {
  const defaultLanguage = configuration.defaultLanguage;
  if (navigation.path === PAGE_NOT_FOUND_PATH) {
    return null;
  }
  return (<Helmet>
    <link
      rel="canonical"
      href={createUrl(navigation, defaultLanguage)}
    />
    {getLanguages().map(language => (
      <link
        key={language}
        rel="alternate"
        href={createUrl(navigation, language)}
        hrefLang={language}
      />
    ))}
  </Helmet>)
}

function createUrl(navigation: NavigationData, language: string): string {
  let result = getPath(language, navigation.path);
  let view = getViewByUrl(navigation.path);
  if (view === undefined) {
    return result;
  }
  let query = "";
  for (const key of (view.canonicalQuery || [])) {
    const value = navigation.query[key];
    if (value === undefined) {
      continue;
    }
    if (query == "") {
      query += "?";
    } else {
      query += "&";
    }
    query += `${getQuery(language, key)}=${value}`;
  }
  return result + query;
}
