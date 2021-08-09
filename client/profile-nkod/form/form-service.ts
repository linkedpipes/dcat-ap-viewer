import configuration from "../nkod-configuration";

const DATASET_CREATE = "DATASET_CREATE";

const DATASET_EDIT = "DATASET_EDIT";

const DATASET_DELETE = "DATASET_DELETE";

const CATALOG_CREATE = "CATALOG_CREATE";

const CATALOG_EDIT = "CATALOG_EDIT";

const CATALOG_DELETE = "CATALOG_DELETE";

const DATASET_QUERY = "DATASET_QUERY";

const COPY_DATASET_QUERY = "COPY_DATASET_QUERY";

const LINKS: Record<string, Record<string, string>> = {
  "cs": {
    [DATASET_CREATE]: "registrace-datové-sady",
    [DATASET_EDIT]: "registrace-datové-sady",
    [DATASET_DELETE]: "odstranění-datové-sady",
    [CATALOG_CREATE]: "registrace-lokálního-katalogu",
    [CATALOG_EDIT]: "registrace-lokálního-katalogu",
    [CATALOG_DELETE]: "odstranění-lokálního-katalogu",
    [DATASET_QUERY]: "datová-sada",
    [COPY_DATASET_QUERY]: "kopírovat-z-datové-sady",
  },
  "en": {
    [DATASET_CREATE]: "dataset-registration",
    [DATASET_EDIT]: "dataset-registration",
    [DATASET_DELETE]: "dataset-withdrawn",
    [CATALOG_CREATE]: "local-catalog-registration",
    [CATALOG_EDIT]: "local-catalog-registration",
    [CATALOG_DELETE]: "local-catalog-withdrawn",
    [DATASET_QUERY]: "dataset",
    [COPY_DATASET_QUERY]: "copy-from-dataset",
  },
};

export function getCreateDatasetFormLink(language: string) {
  return formUrlPrefix() + LINKS[language][DATASET_CREATE];
}

function formUrlPrefix(): string {
  return configuration.dcatApFormsUrl;
}

export function getEditDatasetFormLink(language: string, iri: string) {
  return formUrlPrefix() + LINKS[language][DATASET_EDIT]
    + "?" + LINKS[language][DATASET_QUERY] + "=" + encodeURIComponent(iri);
}

export function getCopyDatasetFormLink(language: string, iri: string) {
  return formUrlPrefix() + LINKS[language][DATASET_EDIT]
    + "?" + LINKS[language][COPY_DATASET_QUERY] + "=" + encodeURIComponent(iri);
}

export function getDeleteDatasetFormLink(language: string, iri: string) {
  return formUrlPrefix() + LINKS[language][DATASET_DELETE]
    + "?dataset=" + encodeURIComponent(iri);
}

export function getCreateCatalogFormLink(language: string) {
  return formUrlPrefix() + LINKS[language][CATALOG_CREATE];
}

export function getEditCatalogFormLink(language: string, iri: string) {
  return formUrlPrefix() + LINKS[language][CATALOG_EDIT]
    + "?catalog=" + encodeURIComponent(iri);
}

export function getDeleteCatalogFormLink(language: string, iri: string) {
  return formUrlPrefix() + LINKS[language][CATALOG_DELETE]
    + "?catalog=" + encodeURIComponent(iri);
}
