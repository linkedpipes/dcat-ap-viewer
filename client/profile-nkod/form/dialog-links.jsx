import React, {useContext} from "react";
import {PropTypes} from "prop-types";

import {NavigationContext, translateString, register} from "../viewer-api";
import {
  getCopyDatasetFormLink, getDeleteCatalogFormLink,
  getDeleteDatasetFormLink, getEditDatasetFormLink,
} from "./form-service";

import translation from "./form.json";

export default function DatasetDetailFormLinks(props) {
  const {language} = useContext(NavigationContext);
  if (props.dataset.isFromCatalog) {
    return renderForCatalog(language, props.dataset);
  }
  return renderForForm(language, props.dataset);
}

DatasetDetailFormLinks.propTypes = {
  "dataset": PropTypes.object.isRequired,
};

function renderForForm(language, dataset) {
  const actionStyle = {"color": "grey"};
  return (
    <React.Fragment>
      <a
        href={getEditDatasetFormLink(language, dataset.iri)}
        title={translateString(language, "form.editDataset")}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <i className="material-icons pl-2" style={actionStyle}>
          edit
        </i>
      </a>
      <a
        href={getCopyDatasetFormLink(language, dataset.iri)}
        title={translateString(language, "form.copyAsNewDataset")}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <i className="material-icons pl-2" style={actionStyle}>
          file_copy
        </i>
      </a>
      <a
        href={getDeleteDatasetFormLink(language, dataset.iri)}
        title={translateString(language, "form.deleteDataset")}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <i className="material-icons pl-2" style={actionStyle}>
          delete_forever
        </i>
      </a>
    </React.Fragment>
  );
}

function renderForCatalog(language, dataset) {
  const actionStyle = {"color": "grey"};
  return (
    <React.Fragment>
      <a
        href={getCopyDatasetFormLink(language, dataset.iri)}
        title={translateString(language, "form.copyAsNewDataset")}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <i className="material-icons pl-2" style={actionStyle}>
          file_copy
        </i>
      </a>
      <a
        href={getDeleteCatalogFormLink(language, dataset.lkod)}
        title={translateString(language, "form.deleteCatalog")}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <i className="material-icons pl-2" style={actionStyle}>
          delete_forever
        </i>
      </a>
    </React.Fragment>
  );
}

register({
  "name": "form.translation",
  "translations": translation,
});
