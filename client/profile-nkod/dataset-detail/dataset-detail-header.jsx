import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import TagLine from "../../profile-lkod/components/tag-line";

import {
  translateString, register, useLabelApi, configuration, createUrl, t
} from "../viewer-api";
import FormDialogLinks from "../form/dialog-links";

import translations from "./dataset-detail-header.json";

function DatasetDetailHeader(props) {
  const selectLabel = useLabelApi();

  const wrapStyle = {
    "display": "flex",
    "flex-wrap": "wrap",
    "alignItems": "center"
  };

  const datasetTags = [];
  if (props.dataset.isCodelist) {
    datasetTags.push("vdfCodelist");
  }
  if (props.dataset.isFromVDF) {
    datasetTags.push("vdf");
  }

  return (
    <React.Fragment>
      <div style={wrapStyle}>
        <h1>{selectLabel(props.dataset.iri)}</h1>
        <TagLine items={datasetTags} labelFunction={t}/>
        <a
          href={configuration.dereferenceUrlPrefix + props.dataset.iri}
          title={translateString(props.language, "followLink")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-icons ps-2">open_in_new</i>
        </a>

        <FormDialogLinks dataset={props.dataset}/>
      </div>

      <h2>
        <Link to={getPublisherSearchLink(props.language, props.dataset)}>
          {selectLabel(props.dataset.publisher)}
        </Link>
      </h2>

      {props.dataset.vdfOriginator && (
        <div style={{"fontWeight": "bold"}}>
          {translateString(props.language, "vdfOriginator")}
          &nbsp;
          {selectLabel(props.dataset.vdfOriginator)}
        </div>
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
  "translations": translations,
});

function getPublisherSearchLink(language, dataset) {
  return createUrl(language, "/datasets", {"publishers": dataset.publisher});
}
