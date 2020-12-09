import React from "react";
import {PropTypes} from "prop-types";

import {
  t, register, useLabelApi, configuration, createUrl,
} from "../viewer-api";

function DatasetDetailHeader(props) {
  const selectLabel = useLabelApi();

  return (
    <React.Fragment>
      <h1>
        {selectLabel(props.dataset.iri)}
        <a
          href={configuration.dereferenceUrlPrefix + props.dataset.iri}
          title={t("followLink")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-icons pl-2">open_in_new</i>
        </a>
      </h1>
      {props.dataset.parentDataset !== undefined && (
        <p>
          {t("datasetIsPartOf")}&nbsp;
          <a href={parentUrl(props.language, props.dataset.parentDataset)}>
            {selectLabel(props.dataset.parentDataset)}
          </a>
        </p>
      )}
    </React.Fragment>
  );
}

DatasetDetailHeader.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.header",
  "element": DatasetDetailHeader,
});

function parentUrl(language, iri) {
  return createUrl(language, "/dataset", {"dataset": iri});
}
