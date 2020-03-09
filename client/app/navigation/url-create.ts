import {ParsedQuery} from "query-string";
import {getPath, getQueryArg, QUERY_ARG_LANGUAGE} from "./navigation-map";
import {asArray} from "../../utils";

export function createUrl(
  path: string, language: string, query?: ParsedQuery): string {
  const pathString = getPath(path, language);
  if (!query) {
    return pathString;
  }
  let queryString = "";
  Object.entries(query).forEach(([key, value]) => {
    if (key === QUERY_ARG_LANGUAGE) {
      // Ignore language.
      return;
    }
    const keyStr: string = getQueryArg(key, language);
    let valueArray: string[] = asArray(value);
    valueArray.forEach((valueStr) => {
      if (queryString === "") {
        queryString += "?";
      } else {
        queryString += "&";
      }
      queryString +=
        encodeURIComponent(keyStr) + "=" + encodeURIComponent(valueStr);
    });
  });
  return pathString + queryString;
}
