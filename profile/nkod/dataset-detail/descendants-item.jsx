import {
  QUERY_DATASET_DETAIL_IRI,
  URL_DATASET_DETAIL,
} from "../../client-api";
import {Link} from "react-router-dom";
import TagLine from "../user-iterface/tag-line";
import {PropTypes} from "prop-types";
import React from "react";

export default function DescendantsItem(props) {
  const {tLabel, tLiteral, tUrl, dataset, fetchLabels} = props;
  fetchLabels([...dataset.formats]);
  return (
    <div>
      <Link to={datasetLinkUrl(tUrl, dataset)}>
        <h4>{tLabel(dataset.iri)}</h4>
      </Link>
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
      }}>
        {tLiteral(dataset.description)}
      </p>
      <TagLine
        items={dataset.formats}
        size={0.7}
        labelFunction={(iri) => tLabel(iri, iri)}
      />
      <hr/>
    </div>
  );
}

DescendantsItem.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

function datasetLinkUrl(tUrl, dataset) {
  return tUrl(URL_DATASET_DETAIL,{[QUERY_DATASET_DETAIL_IRI]: dataset.iri});
}
