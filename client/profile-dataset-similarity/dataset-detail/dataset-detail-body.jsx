import React from "react";
import {PropTypes} from "prop-types";

import {
  t, register, selectLiteral, useLabelApi, createUrl,
} from "../viewer-api";
import Keywords from "./keywords";
import Properties from "./properties";

function DatasetDetailBody(props) {
  const selectLabel = useLabelApi();
  return (
    <React.Fragment>
      <p>{selectLiteral(props.language, props.dataset.description)}</p>
      <hr/>
      <Keywords language={props.language} keywords={props.dataset.keywords}/>
      {props.dataset.parentDataset !== undefined && (
        <p>
          {t("datasetIsPartOf")}&nbsp;
          <a href={parentUrl(props.language, props.dataset.parentDataset)}>
            {selectLabel(props.dataset.parentDataset)}
          </a>
        </p>
      )}
      <Properties language={props.language} dataset={props.dataset}/>
      <hr/>
    </React.Fragment>
  );
}

DatasetDetailBody.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.body",
  "element": DatasetDetailBody,
});

function parentUrl(language, iri) {
  return createUrl(language, "/dataset", {"dataset": iri});
}