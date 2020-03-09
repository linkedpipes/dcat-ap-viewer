import {getAllLanguages} from "./navigation-map";
import {ParsedQuery} from "query-string";
import {Literal} from "../../jsonld";
import {createUrl} from "./url-create";

export type TranslateFunction = (key: string, args?: object) => string;

export type TranslationMap = { [language: string]: { [key: string]: string } };

const DEVELOP_REPORTED = new Set<string>();

export function getDefaultLanguage() {
  const language = navigator.language;
  const languages = getAllLanguages();
  if (languages.includes(language)) {
    return language;
  }
  return "en";
}

export function createTranslateUrlFunction(language: string)
  : TranslateFunction {
  return (path: string, query?: object) =>
    createUrl(path, language, objectToParsedQuery(query));
}

function objectToParsedQuery(args?: object): ParsedQuery {
  if (!args) {
    return {};
  }
  return args as ParsedQuery;
}

export function createLiteralFunction(language: string) {
  return (literal: Literal | Literal[]) => {
    const literals: Literal[] = Array.isArray(literal) ? literal : [literal];
    for (let item of literals) {
      if (item[language]) {
        return item[language];
      }
    }
    // Return first we found.
    for (let item of literals) {
      const values = Object.values(item);
      if (values.length > 0) {
        return values[0];
      }
    }
    return "";
  };
}

export function createTranslateFunction(
  translation: TranslationMap, language: string): TranslateFunction {
  //
  const data = translation[language] || {};
  return (key, args) => {
    if (!data[key]) {
      reportMissingTranslation(key, language);
    }
    const value = data[key] || "";
    return formatString(value, args);
  }
}

function reportMissingTranslation(key: string, language: string) {
  if (process.env.NODE_ENV !== "production") {
    if (!DEVELOP_REPORTED.has(key)) {
      DEVELOP_REPORTED.add(key);
      console.log("Missing translation of  '" + key + "' for " + language);
    }
  }
}

function formatString(str: string, args?: object) {
  if (!args) {
    return str;
  }
  for (let [key, value] of Object.entries(args)) {
    str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), value);
  }
  return str;
}
