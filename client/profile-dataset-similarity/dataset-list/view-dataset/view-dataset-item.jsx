import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {tUrl, tLiteral, link, useLabelApi} from "../../viewer-api";
import TagLine from "../../../profile-lkod/components/tag-line";
import {EvaluationLikeButton} from "../../../dataset-similarity-evaluation";

export default function DatasetListItem(props) {
  const selectLabel = useLabelApi();

  return (
    <div>
      {tUrl("/dataset", {"dataset": props.dataset.iri}, (url) => (
        <Link to={url}>
          <h4>{selectLabel(props.dataset.iri)}</h4>
        </Link>
      ))}
      <div style={{"float": "right"}}>
        <EvaluationLikeButton dataset={props.dataset.iri}/>
      </div>
      {props.showPublisher
      && link(
        "/datasets",
        selectLabel(props.dataset.publisher),
        {"publisher": props.dataset.publisher},
      )}
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
        "minHeight": "3rem",
      }}>
        {tLiteral(props.dataset.description)}
      </p>
      <TagLine
        items={props.dataset.formats}
        size={0.7}
        labelFunction={selectLabel}
      />
      <hr/>
    </div>
  );
}

DatasetListItem.propTypes = {
  "dataset": PropTypes.shape({
    "iri": PropTypes.string.isRequired,
    "publisher": PropTypes.string,
    "description": PropTypes.object.isRequired,
    "formats": PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  "showPublisher": PropTypes.bool.isRequired,
};
