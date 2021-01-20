import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {parse, ParsedQuery} from "query-string";
import {useLocation} from "react-router-dom";
import {Location} from "history";

import configuration from "../viewer-configuration";
import {getLanguages, resolvePath, resolveQuery} from "./translations";
import {getApi} from "../api-instance";
import {LabelActions} from "./label";

export interface NavigationData {

  path: string;

  language: string;

  query: ParsedQuery;

}

export const NavigationContext = React.createContext<NavigationData>(
  undefined as any
);

export function WithNavigation(props: any) {
  const location = useLocation();

  const navigation = locationToNavigation(location);
  const dispatch = useDispatch();

  // Upon change of language we fetch initial labels.
  useEffect(() => {
    getApi().fetchInitialLabels(navigation.language).then(data => {
      dispatch(LabelActions.fetchLabel.success({
        "labels": data.labels
      }));
    });
  }, [navigation.language]);

  return React.createElement(
    NavigationContext.Provider, {
      "value": {
        ...navigation
      },
    },
    props.children);
}

export const NavigationConsumer = NavigationContext.Consumer;

function locationToNavigation(location: Location): NavigationData {
  const search = parse(location.search);
  const {path, language} = resolvePath(location.pathname);
  const query: ParsedQuery = {};
  for (const [key, value] of Object.entries(search)) {
    const resolvedKey = resolveQuery(path, key);
    if (resolvedKey === undefined) {
      continue;
    }
    query[resolvedKey] = value;
  }
  return {
    "path": path,
    "language": language || getDefaultLanguage(),
    "query": query,
  };
}

function getDefaultLanguage() {
  const language = navigator.language;
  const languages = getLanguages();
  if (languages.includes(language)) {
    return language;
  }
  return configuration.defaultLanguage;
}
