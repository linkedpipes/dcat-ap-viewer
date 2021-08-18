import React from "react";
import {PropTypes} from "prop-types";

import {getElement, register} from "../../viewer-react/core/register";
import {
  withSimilarDatasets, SimilarDatasetItem,
} from "../../dataset-similarity";
import {t} from "../../viewer-react/service/i18";

function DatasetDetailParts(props) {
  const {loading, failed, datasets} = withSimilarDatasets(props.dataset.iri);

  if (loading) {
    const Component = getElement("application.loading").element;
    return (<Component/>);
  }

  if (failed) {
    const Component = getElement("application.failed").element;
    return (<Component/>);
  }
  return (
    <React.Fragment>
      <h2>{t("similarDatasets")}</h2>
      {datasets.map((dataset) => (
        <SimilarDatasetItem
          key={dataset.iri}
          dataset={dataset}
          language={props.language}/>
      ))}
    </React.Fragment>
  );
}

DatasetDetailParts.propTypes = {
  "language": PropTypes.string.isRequired,
  "dataset": PropTypes.object.isRequired,
};

register({
  "name": "dataset-detail.parts",
  "element": DatasetDetailParts,
  "translations": {
    "cs": {
      "similarDatasets": "Podobné datové sady",
    },
    "en": {
      "similarDatasets": "Similar datasets",
    },
  },
});
