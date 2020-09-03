import React from "react";
import {PropTypes} from "prop-types";
import {register, NKOD} from "../client-api";
import {DATASET_DETAIL_FORMS} from "./nkod-component-names";
import {getGlobal, FORM_URL} from "../../client/app/globals";

const DATASET_CREATE = "DATASET_CREATE";
const DATASET_EDIT = "DATASET_EDIT";
const DATASET_DELETE = "DATASET_DELETE";

const CATALOG_CREATE = "CATALOG_CREATE";
const CATALOG_EDIT = "CATALOG_EDIT";
const CATALOG_DELETE = "CATALOG_DELETE";

const LINKS = {
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

function DcatApForms({t, language, dataset}) {
  const isFromForm = dataset.rdfType.includes(NKOD.SourceForm);
  const isFromLkod =
    dataset.rdfType.includes(NKOD.SourceCkan) ||
    dataset.rdfType.includes(NKOD.SourceDcat) ||
    dataset.rdfType.includes(NKOD.SourceSparql);
  const actionStyle = {"color": "grey"};
  if (isFromForm) {
    return (
      <span>
        <a
          href={getEditDatasetFormLink(language, dataset.iri)}
          title={t("form.editDataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            edit
          </i>
        </a>
        <a
          href={getCopyDatasetFormLink(language, dataset.iri)}
          title={t("form.copyAsNewDataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            file_copy
          </i>
        </a>
        <a
          href={getDeleteDatasetFormLink(language, dataset.iri)}
          title={t("form.deleteDataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            delete_forever
          </i>
        </a>
      </span>
    );
  } else if (isFromLkod) {
    return (
      <span>
        <a
          href={getCopyDatasetFormLink(language, dataset.iri)}
          title={t("form.copyAsNewDataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            file_copy
          </i>
        </a>
        <a
          href={getDeleteCatalogFormLink(language, dataset.lkod)}
          title={t("form.deleteCatalog")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            delete_forever
          </i>
        </a>
      </span>
    );
  }
  return null;
}

DcatApForms.propTypes = {
  "t": PropTypes.func.isRequired,
  "language": PropTypes.string.isRequired,
  "dataset": PropTypes.object.isRequired,
};

register({
  "name": DATASET_DETAIL_FORMS,
  "element": DcatApForms,
});

export function getCreateDatasetFormLink(language) {
  return getGlobal(FORM_URL) + LINKS[language][DATASET_CREATE];
}

export function getEditDatasetFormLink(language, url) {
  return getGlobal(FORM_URL) + LINKS[language][DATASET_EDIT]
    + "?dataset=" + encodeURIComponent(url);
}

export function getCopyDatasetFormLink(language, url) {
  return getGlobal(FORM_URL) + LINKS[language][DATASET_EDIT]
    + "?dataset=" + encodeURIComponent(url) + "&kopie=1";
}

export function getDeleteDatasetFormLink(language, url) {
  return getGlobal(FORM_URL) + LINKS[language][DATASET_DELETE]
    + "?dataset=" + encodeURIComponent(url);
}

export function getCreateCatalogFormLink(language) {
  return getGlobal(FORM_URL) + LINKS[language][CATALOG_CREATE];
}

export function getEditCatalogFormLink(language, url) {
  return getGlobal(FORM_URL) + LINKS[language][CATALOG_EDIT]
    + "?catalog=" + encodeURIComponent(url);
}

export function getDeleteCatalogFormLink(language, url) {
  return getGlobal(FORM_URL) + LINKS[language][CATALOG_DELETE]
    + "?catalog=" + encodeURIComponent(url);
}
