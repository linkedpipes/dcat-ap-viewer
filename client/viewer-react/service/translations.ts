import {register, getViews, getTranslation} from "../core/register";
import set = Reflect.set;

const translations: Record<string, Record<string, string>> = {};

// Language, global name, local name.
const navigationPath: Record<string, Record<string, string>> = {};

// Language, path, global name, local names.
const navigationQuery: Record<string, Record<string, Record<string, string[]>>>
  = {};

export const PAGE_NOT_FOUND_PATH = "/page-not-found"

const REPORTED = new Set();

export function getLanguages() {
  return Object.keys(translations);
}

export function getTranslations(language: string): Record<string, string> {
  return translations[language] || {};
}

export function getPath(language: string, path: string): string {
  const data = navigationPath[language] || {};
  if (data[path] == undefined && process.env.NODE_ENV !== "production") {
    if (!REPORTED.has(path + language)) {
      console.trace("Missing path of '" + path + "' for " + language);
      REPORTED.add(path + language);
    }
  }
  return data[path] || path;
}

export function getQuery(
  language: string, path: string, query: string
): string {
  const data = (navigationQuery[language] || {})[path] || {};
  if (data[query] === undefined && process.env.NODE_ENV !== "production") {
    if (!REPORTED.has(query + language)) {
      console.trace("Missing query of '" + query + "' for " + language);
      REPORTED.add(query + language);
    }
  }
  if (data[query] === undefined || data[query].length === 0) {
    return query;
  }
  return data[query][0];
}

export function resolvePath(path: string): { path: string, language?: string } {
  const decodedPath = decodeURI(path);
  for (const [language, paths] of Object.entries(navigationPath)) {
    for (const [globalPath, localPath] of Object.entries(paths)) {
      if (localPath === decodedPath) {
        return {"path": globalPath, "language": language};
      }
    }
  }
  return {
    "path": PAGE_NOT_FOUND_PATH,
    "language": undefined,
  }
}

export function resolveQuery(path: string, query: string): string | undefined {
  for (const language of Object.keys(navigationQuery)) {
    const queryMap = navigationQuery[language][path] || {};
    for (const [globalPath, localPaths] of Object.entries(queryMap)) {
      if (localPaths.includes(query)) {
        return globalPath;
      }
    }
  }
  return undefined;
}

function beforeCreateStore() {
  collectNavigationInformation();
  collectTranslations();
}

function collectNavigationInformation() {
  const visited = new Set();
  getViews().forEach((item) => {
    const path = item.url;
    for (const [language, entries] of Object.entries(item.navigation)) {
      if (navigationPath[language] === undefined) {
        navigationPath[language] = {};
      }
      if (navigationQuery[language] === undefined) {
        navigationQuery[language] = {};
      }
      // There can be only one view with given path. So we always create.
      navigationQuery[language][path] = {};
      //
      if (process.env.NODE_ENV !== "production") {
        for (const globalKey of Object.keys(entries)) {
          const key = `${path}:${language}:${entries}:${globalKey}`;
          if (visited.has(key)) {
            console.error("Path collision for", key);
          }
          visited.add(key);
        }
      }
      //
      for (let [globalKey, localKey] of Object.entries(entries)) {
        if (globalKey.startsWith("/")) {
          if (Array.isArray(localKey)) {
            localKey = localKey[0];
            console.error("Multiple values for path are not supported");
          }
          navigationPath[language][globalKey] = localKey;
        } else {
          if (!Array.isArray(localKey)) {
            localKey = [localKey];
          }
          navigationQuery[language][path][globalKey] = localKey;
        }
      }
    }
  });
}

function collectTranslations() {
  getTranslation().forEach((item) => {
    const prefix = item.translationsNamespace === undefined ?
      "" : item.translationsNamespace + ".";
    for (const [language, entries] of Object.entries(item.translations)) {
      translations[language] = translations[language] || {};
      const localTranslations = translations[language];
      for (const [key, value] of Object.entries(entries)) {
        if (process.env.NODE_ENV !== "production") {
          if (localTranslations[prefix + key] !== undefined) {
            console.error("Translation collision for", prefix, key);
          }
        }
        localTranslations[prefix + key] = value;
      }
    }
  });
}

register({
  "name": "service.translation",
  "service": {
    "beforeCreateStore": beforeCreateStore,
  },
});



