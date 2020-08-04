//
// Create map of path/query parameters in all languages available
// and provide related services.
//

import navigationI18n from "./../../i18n/navigation-i18n";

type LanguageMap = { [language: string]: { [key: string]: string } };

export type LanguageItem = { language: string, value: string };

export const QUERY_ARG_LANGUAGE = "language";

/**
 * Holds information about all registered URL paths.
 */
const navigationUrl: LanguageMap = {};

/**
 * Holds information about all registered URL query parameters.
 */
const navigationQuery: LanguageMap = {};

/**
 * Initialize content of navigation module from "navigationI18n".
 */
export function initializeNavigation() {
  for (let [language, translation] of Object.entries(navigationI18n)) {
    for (let [key, value] of Object.entries(translation.url)) {
      addToNavigationMap(navigationUrl, language, key, value);
    }
    for (let [key, value] of Object.entries(translation.query)) {
      addToNavigationMap(navigationQuery, language, key, value);
    }
  }
  console.log("Navigation path:", navigationUrl);
  console.log("          query:", navigationQuery);
}

function addToNavigationMap(
  map: LanguageMap, language: string, key: string, value: string) {
  if (!map[language]) {
    map[language] = {};
  }
  map[language][key] = value;
}

export function resolvePath(path: string): LanguageItem | undefined {
  return translate(navigationUrl, path);
}

function translate(map: LanguageMap, value: string): LanguageItem | undefined {
  for (let [language, values] of Object.entries(map)) {
    for (let [key, valueInLanguage] of Object.entries(values)) {
      if (value === valueInLanguage) {
        return {
          "language": language,
          "value": key,
        };
      }
    }
  }
  return undefined;
}

export function resolveQueryArg(query: string): LanguageItem | undefined {
  return translate(navigationQuery, query);
}

export function getPath(path: string, language: string): string {
  const result = navigationUrl[language][path];
  if (process.env.NODE_ENV !== "production") {
    if (!navigationUrl[language][path]) {
      console.log("Missing path for  '" + path + "' for " + language);
      return path;
    }
  }
  return result;
}

export function getQueryArg(query: string, language: string): string {
  const result = navigationQuery[language][query];
  if (process.env.NODE_ENV !== "production") {
    if (!result) {
      console.log("Missing query for  '" + query + "' for " + language);
      console.log(navigationQuery);
      return query;
    }
  }
  return result;
}

export function getAllLanguages(): string[] {
  return [...Object.keys(navigationI18n)];
}

export function getAllNamesForView(path: string): LanguageItem[] {
  const result: LanguageItem[] = [];
  for (let [language, map] of Object.entries(navigationUrl)) {
    result.push({
      "language": language,
      "value": map[path],
    })
  }
  return result;
}
