import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {
  translateString, register, useLabelApi, configuration, createUrl,
} from "../viewer-api";
import FormDialogLinks from "../form/dialog-links";

function DatasetDetailHeader(props) {
  const selectLabel = useLabelApi();

  return (
    <React.Fragment>
      <h1>
        {selectLabel(props.dataset.iri)}
        <a
          href={configuration.dereferenceUrlPrefix + props.dataset.iri}
          title={translateString(props.language, "followLink")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-icons pl-2">open_in_new</i>
        </a>
        <FormDialogLinks dataset={props.dataset}/>
      </h1>
      <p className="h2">
        <Link to={getPublisherSearchLink(props.language, props.dataset)}>
          {selectLabel(props.dataset.publisher)}
        </Link>
      </p>
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

function getPublisherSearchLink(language, dataset) {
  return createUrl(language, "/datasets", {"publishers": dataset.publisher});
}
