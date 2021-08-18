import React from "react";
import {PropTypes} from "prop-types";

import {withDatasetDetail} from "./similarity-reack-hook";
import {getElement} from "../viewer-react/core/register";
import {Link} from "react-router-dom";
import {createUrl, selectLiteral} from "../viewer-react/service/i18";
import {useLabelApi} from "../viewer-react/service/label";
import {EvaluationLikeButton} from "../dataset-similarity-evaluation";

export function SimilarDatasetItem(props) {
  const selectLabel = useLabelApi();
  const {loading, failed, dataset} =
    withDatasetDetail(props.language, props.dataset.iri);

  if (loading) {
    const Component = getElement("application.loading").element;
    return (<Component/>);
  }

  if (failed) {
    const Component = getElement("application.failed").element;
    return (
      <div>
        <Component/>
      </div>
    );
  }

  return (
    <div>
      <Link to={datasetDetailLinkUrl(props.language, props.dataset.iri)}>
        <h4>{selectLabel(dataset.iri)}</h4>
      </Link>
      <div style={{"float": "right"}}>
        <EvaluationLikeButton dataset={props.dataset.iri}/>
      </div>
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
        "minHeight": "3rem",
      }}>
        {selectLiteral(props.language, dataset.description)}
      </p>
      <hr/>
    </div>
  );
}

SimilarDatasetItem.propTypes = {
  "language": PropTypes.string.isRequired,
  "dataset": PropTypes.object.isRequired,
};


function datasetDetailLinkUrl(language, iri) {
  return createUrl(language, "/dataset", {"dataset": iri});
}
