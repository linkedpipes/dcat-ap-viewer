import React from "react";
import {PropTypes} from "prop-types";

import {
  register, selectLiteral, useLabelApi, useAvailableDistributionsApi,
} from "../viewer-api";

function DatasetDetailMetadata(props) {
  const selectLabel = useLabelApi();
  const distributions = useAvailableDistributionsApi();
  return (
    <script type="application/ld+json">
      {createJsonLdDescription(
        selectLabel, props.language, props.dataset, distributions)}
    </script>
  );
}

DatasetDetailMetadata.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.metadata",
  "element": DatasetDetailMetadata,
});

function createJsonLdDescription(
  selectLabel, language, dataset, distributions
) {
  const context = {
    "@context": "http://schema.org/",
    "@type": "Dataset",
    "name": selectLabel(dataset["iri"]),
    "description": selectLiteral(language, dataset["description"]),
    "url": dataset["iri"],
  };

  if (dataset["catalog"] !== undefined) {
    context["includedInDataCatalog"] = dataset["catalog"];
  }

  if (dataset["spatial"] !== undefined) {
    context["spatialCoverage"] = dataset["spatial"]["@id"];
  }

  if (dataset["temporal"] !== undefined) {
    context["temporalCoverage"] =
      dataset["temporal"]["startDate"] + "/" +
      dataset["temporal"]["endDate"] + "\"\n";
  }

  if (dataset["keywords"] !== undefined) {
    context["keywords"] = dataset["keywords"].map(
      (keyword) => selectLiteral(language, keyword));
  }

  if (dataset["publisher"] !== undefined) {
    context["creator"] = {
      "@type": "Organization",
      "url": dataset["publisher"]["@id"],
      "name": selectLabel(dataset["publisher"]),
    };
  }

  context["distribution"] = distributions
    .map(distribution => convertDistribution(selectLabel, distribution));

  return JSON.stringify(context, null, 2);
}

function convertDistribution(selectLabel, distribution) {
  const result = {
    "@type": "DataDownload",
  };
  let empty = true;
  if (distribution.downloadURL !== undefined) {
    empty = false;
    result["contentUrl"] = getFirst(distribution.downloadURL);
  }
  if (distribution.format !== undefined) {
    empty = false;
    result["encodingFormat"] = selectLabel(distribution.format);
  }
  if (empty) {
    return undefined;
  }
  return result;
}

function getFirst(values) {
  if (Array.isArray(values)) {
    return values[0];
  } else {
    return values;
  }
}
