import React from "react";
import {PropTypes} from "prop-types";

import {
  translateString, register, useLabelApi, configuration,
} from "../viewer-api";
import {EvaluationLikeButton} from "../../dataset-similarity-evaluation";

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
          <i className="material-icons ps-2">open_in_new</i>
        </a>
        <EvaluationLikeButton dataset={props.dataset.iri}/>
      </h1>
      <p className="h2">
        {selectLabel(props.dataset.publisher)}
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
