import {
  QUERY_DATASET_DETAIL_IRI,
  QUERY_DATASET_LIST_PUBLISHER,
  URL_DATASET_DETAIL,
  URL_DATASET_LIST,
} from "../../../client-api";
import {Link} from "react-router-dom";
import TagLine from "../../user-iterface/tag-line";
import {PropTypes} from "prop-types";
import React from "react";

export default function DatasetListItem(
  {tLabel, tLiteral, tUrl, showPublisher, dataset}) {
  const datasetUrl = tUrl(
    URL_DATASET_DETAIL,
    {[QUERY_DATASET_DETAIL_IRI]: dataset.iri});
  const publisherUrl = tUrl(
    URL_DATASET_LIST,
    {[QUERY_DATASET_LIST_PUBLISHER]: dataset.publisher});
  return (
    <div>
      <Link to={datasetUrl}>
        <h4>{tLabel(dataset.iri)}</h4>
      </Link>
      {
        showPublisher &&
        <Link to={publisherUrl}>{tLabel(dataset.publisher)}</Link>
      }
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

DatasetListItem.propTypes = {
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "showPublisher": PropTypes.bool.isRequired,
  "dataset": PropTypes.object.isRequired,
};
