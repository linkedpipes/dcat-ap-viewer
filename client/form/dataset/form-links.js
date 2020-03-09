import {getGlobal} from "../../app/globals";

export const DATASET_EDIT = "DATASET_EDIT";
export const DATASET_DELETE = "DATASET_DELETE";
export const CATALOG_EDIT = "CATALOG_EDIT";
export const CATALOG_DELETE = "CATALOG_DELETE";

const FormLinks = {
  "cs": {
    [DATASET_EDIT]: "registrace-datové-sady",
    [DATASET_DELETE]: "odstranění-datové-sady",
    [CATALOG_EDIT]: "registrace-lokálního-katalogu",
    [CATALOG_DELETE]: "odstranění-lokálního-katalogu",
  },
  "en": {
    [DATASET_EDIT]: "dataset-registration",
    [DATASET_DELETE]: "dataset-withdrawn",
    [CATALOG_EDIT]: "local-catalog-registration",
    [CATALOG_DELETE]: "local-catalog-withdrawn",
  },
};

export function getFormLink(language, type, url) {
  let result = getGlobal("forms-url") + FormLinks[language][type];
  if (url) {
    return result + "?url=" + encodeURIComponent(url);
  } else {
    return result;
  }
}
