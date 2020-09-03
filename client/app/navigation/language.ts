import {getAllLanguages} from "./navigation-map";
import {ParsedQuery} from "query-string";
import {Literal} from "../../jsonld";
import {createUrl} from "./url-create";

export type TranslateFunction = (key: string, args?: any) => string;

export type TranslationMap = { [language: string]: LanguageMap };

type LanguageMap = { [key: string]: string };

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
  return (literal: Literal | Literal[] | undefined) => {
    if (literal === undefined) {
      return "";
    }
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
  const data = translation[language];
  return (key, args) => {
    let value;
    if (args === undefined || args.count === undefined) {
      value = data[key];
    } else {
      value = selectKeyForCount(data, key, args.count);
    }
    if (value === undefined) {
      reportMissingTranslation(key, language);
    }
    return formatString(value || "", args);
  }
}

function selectKeyForCount(
  data: LanguageMap, key: string, count: number): string {
  const value: any = data[key];
  let biggestSmallest = 0;
  for (const keyStr of Object.keys(value)) {
    const keyInt = parseInt(keyStr, 10);
    if (count == keyInt) {
      return value[keyStr];
    }
    if (keyInt > count) {
      continue;
    }
    if (biggestSmallest < keyInt) {
      biggestSmallest = keyInt;
    }
  }
  return value[biggestSmallest];
}

function reportMissingTranslation(key: string, language: string) {
  if (process.env.NODE_ENV !== "production") {
    if (!DEVELOP_REPORTED.has(key)) {
      DEVELOP_REPORTED.add(key);
      console.trace("Missing translation of  '" + key + "' for " + language);
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
