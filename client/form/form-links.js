import {getGlobal, FORM_URL} from "../app/globals";

const DATASET_CREATE = "DATASET_CREATE";
const DATASET_EDIT = "DATASET_EDIT";
const DATASET_DELETE = "DATASET_DELETE";

const CATALOG_CREATE = "CATALOG_CREATE";
const CATALOG_EDIT = "CATALOG_EDIT";
const CATALOG_DELETE = "CATALOG_DELETE";

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

export function getCreateDatasetFormLink(language) {
  return getGlobal(FORM_URL) + FormLinks[language][DATASET_CREATE];
}

export function getEditDatasetFormLink(language, url) {
  return getGlobal(FORM_URL) + FormLinks[language][DATASET_EDIT]
    + "?dataset=" + encodeURIComponent(url);
}

export function getCopyDatasetFormLink(language, url) {
  return getGlobal(FORM_URL) + FormLinks[language][DATASET_EDIT]
    + "?dataset=" + encodeURIComponent(url) + "&kopie=1";
}

export function getDeleteDatasetFormLink(language, url) {
  return getGlobal(FORM_URL) + FormLinks[language][DATASET_DELETE]
    + "?dataset=" + encodeURIComponent(url);
}

export function getCreateCatalogFormLink(language) {
  return getGlobal(FORM_URL) + FormLinks[language][CATALOG_CREATE];
}

export function getEditCatalogFormLink(language, url) {
  return getGlobal(FORM_URL) + FormLinks[language][CATALOG_EDIT]
    + "?catalog=" + encodeURIComponent(url);
}

export function getDeleteCatalogFormLink(language, url) {
  return getGlobal(FORM_URL) + FormLinks[language][CATALOG_DELETE]
    + "?catalog=" + encodeURIComponent(url);
}
