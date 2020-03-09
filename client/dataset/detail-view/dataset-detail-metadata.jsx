import React from "react";
import {PropTypes} from "prop-types";

export default function DatasetWebPageMetadata(props) {
  return (
    <script type="application/ld+json">
      {createJsonLdDescription(props)}
    </script>
  )
}

DatasetWebPageMetadata.propTypes = {
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
    }
  }

  return JSON.stringify(context, null, 2);
}
