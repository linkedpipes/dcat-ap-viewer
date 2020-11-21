import React from "react";
import {PropTypes} from "prop-types";

import {register, selectLiteral} from "../viewer-api";
import Keywords from "./keywords";
import Properties from "./properties";

function DatasetDetailBody(props) {
  return (
    <React.Fragment>
      <p>{selectLiteral(props.language, props.dataset.description)}</p>
      <hr/>
      <Keywords language={props.language} keywords={props.dataset.keywords}/>
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
