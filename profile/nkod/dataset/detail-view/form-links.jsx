import {NKOD} from "../../../../client/vocabulary/vocabulary";
import {
  getDeleteCatalogFormLink,
  getDeleteDatasetFormLink,
  getEditDatasetFormLink,
  getCopyDatasetFormLink,
} from "../../../../client/form";
import React from "react";
import {register} from "../../../client-api";
import {DATASET_DETAIL_FORM_LINKS} from "../../nkod-component-names";
import {PropTypes} from "prop-types";

function DatasetFormLinks({t, language, dataset, form}) {
  const isFromForm = dataset["@type"].includes(NKOD.SourceForm);
  const isFromLkod =
    dataset["@type"].includes(NKOD.SourceCkan) ||
    dataset["@type"].includes(NKOD.SourceDcat) ||
    dataset["@type"].includes(NKOD.SourceSparql);
  const actionStyle = {"color": "grey"};
  if (isFromForm) {
    return (
      <span>
        <a
          href={getEditDatasetFormLink(language, dataset.iri)}
          title={t("edit_dataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            edit
          </i>
        </a>
        <a
          href={getCopyDatasetFormLink(language, dataset.iri)}
          title={t("copy_as_new_dataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            file_copy
          </i>
        </a>
        <a
          href={getDeleteDatasetFormLink(language, dataset.iri)}
          title={t("delete_dataset")}
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
          title={t("copy_as_new_dataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            file_copy
          </i>
        </a>
        <a
          href={getDeleteCatalogFormLink(language, form["lkod"])}
          title={t("delete_catalog")}
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

DatasetFormLinks.propTypes = {
  "t": PropTypes.func.isRequired,
  "language": PropTypes.string.isRequired,
  "dataset": PropTypes.object.isRequired,
  "form": PropTypes.object,
};

register({
  "name": DATASET_DETAIL_FORM_LINKS,
  "element": DatasetFormLinks,
});
