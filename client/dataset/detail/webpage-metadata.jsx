import React from "react";
import {
  selectLabel,
  selectString,
} from "../../app-services/labels";
import {PropTypes} from "prop-types";

export class DatasetWebPageMetadata extends React.PureComponent {
  render() {
    return (
      <script type="application/ld+json">
        {createJsonLdDescription(this.props.labels, this.props.dataset)}
      </script>
    )
  }
}

DatasetWebPageMetadata.propTypes = {
  "labels": PropTypes.object.isRequired,
  "dataset": PropTypes.object.isRequired,
};

function createJsonLdDescription(labels, dataset) {
  const context = {
    "@context": "http://schema.org/",
    "@type": "Dataset",
    "name": selectLabel(labels, dataset),
    "description": getFirstOrEmpty(selectString(dataset["description"])),
    "url": dataset["@id"],
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
    context["keywords"] = selectString(dataset["keywords"]);
  }

  if (dataset["publisher"] !== undefined) {
    context["creator"] = {
      "@type": "Organization",
      "url": dataset["publisher"]["@id"],
      "name": selectLabel(labels, dataset["publisher"]),
    }
  }

  return JSON.stringify(context, null, 2);
}

function getFirstOrEmpty(array) {
  if (array === undefined || array.length === 0) {
    return "";
  } else {
    return array[0];
  }
}
