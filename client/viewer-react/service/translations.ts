import {register, getViews, getTranslation} from "../core/register";

const translations: Record<string, Record<string, string>> = {};

const navigation: Record<string, Record<string, string>> = {};

export const PAGE_NOT_FOUND_PATH = "/page-not-found"

const REPORTED = new Set();

export function getLanguages() {
  return Object.keys(translations);
}

export function getTranslations(language: string): Record<string, string> {
  return translations[language] || {};
}

export function getPath(language: string, path: string): string {
  const data = navigation[language] || {};
  if (data[path] == undefined && process.env.NODE_ENV !== "production") {
    if (!REPORTED.has(path + language)) {
      console.log("Missing path of '" + path + "' for " + language);
      REPORTED.add(path + language);
    }
  }
  return data[path] || path;
}

export function getQuery(language: string, query: string): string {
  const data = navigation[language] || {};
  if (data[query] == undefined && process.env.NODE_ENV !== "production") {
    if (!REPORTED.has(query + language)) {
      console.log("Missing path of '" + query + "' for " + language);
      REPORTED.add(query + language);
    }
  }
  return data[query] || query;
}

export function resolvePath(path: string): { path: string, language?: string } {
  const decodedPath = decodeURI(path);
  for (const [language, paths] of Object.entries(navigation)) {
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

export function resolveQuery(query: string): string | undefined {
  for (const paths of Object.values(navigation)) {
    for (const [globalPath, localPath] of Object.entries(paths)) {
      if (localPath === query) {
        return globalPath;
      }
    }
  }
  return undefined;
}

register({
  "name": "service.translation",
  "service": {
    "beforeCreateStore": () => {
      getViews().forEach((item) => {
        for (const [language, entries] of Object.entries(item.navigation)) {
          if (process.env.NODE_ENV !== "production") {
            // Check for collisions.
            for (const key of Object.keys(entries)) {
              if (navigation[language] !== undefined
                && navigation[language][key] !== undefined) {
                console.error("Path collision for", key);
              }
            }
          }
          navigation[language] = {
            ...(navigation[language] || {}),
            ...entries
          };
        }
      });
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
      console.log("Translations\n", translations, "\n", navigation);
    },
  },
});



