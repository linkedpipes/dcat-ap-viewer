import {NKOD} from "../../../../client/vocabulary/vocabulary";
import {
  CATALOG_DELETE,
  DATASET_DELETE,
  DATASET_EDIT,
  getFormLink,
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
          href={getFormLink(language, DATASET_EDIT, dataset.iri)}
          title={t("edit_dataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            edit
          </i>
        </a>
        <a
          href={getFormLink(language, DATASET_DELETE, dataset.iri)}
          title={t("delete_dataset")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            delete_forever
          </i>
        </a>
      </span>
    )
  } else if (isFromLkod) {
    return (
      <span>
        <a
          href={getFormLink(language, CATALOG_DELETE, form["lkod"])}
          title={t("delete_catalog")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            delete_forever
          </i>
        </a>
      </span>
    )
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
