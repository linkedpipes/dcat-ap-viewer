import {getGlobal, FORM_URL} from "../app/globals";

export const DATASET_CREATE = "DATASET_CREATE";
export const DATASET_EDIT = "DATASET_EDIT";
export const DATASET_DELETE = "DATASET_DELETE";

export const CATALOG_CREATE = "CATALOG_CREATE";
export const CATALOG_EDIT = "CATALOG_EDIT";
export const CATALOG_DELETE = "CATALOG_DELETE";

const FormLinks = {
  "cs": {
    [DATASET_CREATE]: "registrace-datové-sady",
    [DATASET_EDIT]: "registrace-datové-sady",
    [DATASET_DELETE]: "odstranění-datové-sady",
    [CATALOG_CREATE]: "registrace-lokálního-katalogu",
    [CATALOG_EDIT]: "registrace-lokálního-katalogu",
    [CATALOG_DELETE]: "odstranění-lokálního-katalogu",
  },
  "en": {
    [DATASET_CREATE]: "dataset-registration",
    [DATASET_EDIT]: "dataset-registration",
    [DATASET_DELETE]: "dataset-withdrawn",
    [CATALOG_CREATE]: "local-catalog-registration",
    [CATALOG_EDIT]: "local-catalog-registration",
    [CATALOG_DELETE]: "local-catalog-withdrawn",
  },
};

export function getFormLink(language, type, url) {
  let result = getGlobal(FORM_URL) + FormLinks[language][type];
  if (url) {
    return result + "?url=" + encodeURIComponent(url);
  } else {
    return result;
  }
}
