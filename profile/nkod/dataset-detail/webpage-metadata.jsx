import React from "react";
import {PropTypes} from "prop-types";

// TODO Use connect to remove dependencies from dataset-detail-container
export default function WebPageMetadata(props) {
  return (
    <script type="application/ld+json">
      {createJsonLdDescription(props)}
    </script>
  );
}

WebPageMetadata.propTypes = {
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "dataset": PropTypes.object.isRequired,
};

function createJsonLdDescription({tLabel, tLiteral, dataset}) {
  const context = {
    "@context": "http://schema.org/",
    "@type": "Dataset",
    "name": tLabel(dataset["iri"]),
    "description": tLiteral(dataset["description"]),
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
    context["keywords"] = dataset["keywords"].map(tLiteral);
  }

  if (dataset["publisher"] !== undefined) {
    context["creator"] = {
      "@type": "Organization",
      "url": dataset["publisher"]["@id"],
      "name": tLabel(dataset["publisher"]),
    };
  }

  context["distribution"] = dataset["distributions"]
    .filter(distribution => distribution !== undefined)
    .map(distribution => convertDistribution(distribution, tLabel))
    .filter(distribution => distribution !== undefined);

  return JSON.stringify(context, null, 2);
}

function convertDistribution(distribution, tLabel) {
  const result = {
    "@type": "DataDownload",
  };
  let empty = true;
  if (distribution["downloadURL"]) {
    empty = false;
    result["contentUrl"] = getFirst(distribution["downloadURL"]);
  }
  if (distribution["format"]) {
    empty = false;
    result["encodingFormat"] = tLabel(distribution["format"]);
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
