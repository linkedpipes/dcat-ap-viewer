import {ParsedQuery} from "query-string";
import {
  resolvePath,
  resolveQueryArg,
  QUERY_ARG_LANGUAGE
} from "./navigation-map";
import {asArray} from "../../utils";
import {getDefaultLanguage} from "./language";

export class ResolvedUrl {
  language?: string;
  path: string;
  query: ParsedQuery;

  constructor(language: string | undefined, path: string, query: ParsedQuery) {
    this.language = language;
    this.path = path;
    this.query = query;
  }

}

const DEFAULT_PATH = "/datasets";

export function resolveUrl(
  path: string, query: ParsedQuery): ResolvedUrl {
  const resolvedPath = resolvePath(path);
  const resolvedQuery = resolveQuery(query);
  let language = resolvedQuery[QUERY_ARG_LANGUAGE];
  if (language === undefined || language === null) {
    // No language specified.
    if (resolvedPath) {
      return new ResolvedUrl(
        resolvedPath.language,
        resolvedPath.value,
        resolvedQuery);
    } else {
      return new ResolvedUrl(
        getDefaultLanguage(),
        DEFAULT_PATH,
        resolvedQuery
      );
    }
  }
  if (Array.isArray(language)) {
    language = language[0];
  }
  if (resolvedPath === undefined) {
    return new ResolvedUrl(language, DEFAULT_PATH, resolvedQuery);
  }
  return new ResolvedUrl(language, resolvedPath.value, resolvedQuery);
}

function resolveQuery(query: ParsedQuery): ParsedQuery {
  const result: ParsedQuery = {};
  for (let [key, value] of Object.entries(query)) {
    const resolvedKey = resolveQueryArg(key);
    if (resolvedKey === undefined) {
      reportQuery(key);
      continue;
    }
    result[resolvedKey.value] = asArray(value);
  }
  return result;
}

function reportQuery(key: string) {
  if (process.env.NODE_ENV !== "production") {
    console.log("Unknown query argument:", key)
  }
}
