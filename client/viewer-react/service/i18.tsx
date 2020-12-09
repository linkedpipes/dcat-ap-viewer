import React from "react";
import {ParsedQuery} from "query-string";

import {Literal} from "../../data-model/primitives";
import {NavigationConsumer} from "./navigation";
import {getTranslations, getQuery, getPath} from "./translations";

const NAMESPACE_SEPARATOR = ".";

const REPORTED = new Set();

export const Namespace = React.createContext("");

export function t(id: string, values?: object): React.ReactElement;

export function t(
  template: TemplateStringsArray, ...args: (string | number | boolean)[]
): React.ReactElement;

export function t(template: any, ...args: any[]): React.ReactElement {
  if (typeof template === "string") {
    return namespacedMessage(template, args[0])
  } else {
    // Used for template literal.
    return namespacedMessage(
      String.raw((template as unknown) as TemplateStringsArray, ...args)
    )
  }
}

function namespacedMessage(id: string, args?: Object): React.ReactElement {
  return (
    <NavigationConsumer>
      {({language}) => (
        <Namespace.Consumer>
          {(namespace) => {
            const key: string =
              id.indexOf(NAMESPACE_SEPARATOR) !== -1 || namespace === ''
                ? id : `${namespace}${NAMESPACE_SEPARATOR}${id}`;
            return translateString(language, key, args);
          }}
        </Namespace.Consumer>
      )}
    </NavigationConsumer>
  );
}

export function translateString(language: string, id: string, args?: any): string {
  const data = getTranslations(language);
  const value = args === undefined || args.count == undefined ?
    data[id] : selectKeyForCount(data, id, args.count);
  if (value === undefined) {
    if (process.env.NODE_ENV !== "production") {
      if (!REPORTED.has(id + language)) {
        console.trace("Missing translation of  '" + id + "' for " + language);
        REPORTED.add(id + language);
      }
      return "MISSING '" + id + "'";
    } else {
      return "";
    }
  }
  return formatString(value, args);
}

function selectKeyForCount(
  data: Record<string, string>, id: string, count: number
): string | undefined {
  const value: any = data[id];
  if (value === undefined) {
    return undefined;
  }
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

function formatString(str: string, args?: object) {
  if (!args) {
    return str;
  }
  for (let [key, value] of Object.entries(args)) {
    str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), value);
  }
  return str;
}

export function tLiteral(literal: Literal | undefined): React.ReactElement {
  return (
    <NavigationConsumer>
      {({language}) => selectLiteral(language, literal)}
    </NavigationConsumer>
  )
}

/**
 * Select value of literal for current language.
 */
export function selectLiteral(
  language: string, literal: Literal | undefined
): string {
  if (literal === undefined) {
    return "";
  }
  if (literal[language] !== undefined) {
    return literal[language];
  }
  for (const value of Object.values(literal)) {
    return value;
  }
  return "";
}

export function tUrl(
  path: string, query: ParsedQuery | undefined,
  element: (url: string) => React.ReactElement
): React.ReactElement {
  return (
    <NavigationConsumer>
      {({language}) => {
        let url = getPath(language, path)
          + createQueryString(language, path, query);
        return element(url);
      }}
    </NavigationConsumer>
  );
}

function createQueryString(
  language: string, path: string, query: ParsedQuery | undefined
) {
  if (query === undefined) {
    return "";
  }
  let result = "";
  Object.entries(query).forEach(([key, value]) => {
    const keyStr: string = getQuery(language, path, key);
    let valueArray: string[] = asArray(value);
    valueArray.forEach((valueStr) => {
      if (result === "") {
        result += "?";
      } else {
        result += "&";
      }
      result += encodeURIComponent(keyStr) + "=" + encodeURIComponent(valueStr);
    });
  });
  return result;
}

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  } else if (value === null || value === undefined) {
    return [];
  } else {
    return [value];
  }
}

export function createUrl(
  language: string, path: string, query: ParsedQuery | undefined
): string {
  return getPath(language, path) + createQueryString(language, path, query);
}
