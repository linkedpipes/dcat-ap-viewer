import React from "react";
import {PropTypes} from "prop-types";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import {
  fetchLabels,
  selectT,
  selectTLabel,
  selectTLiteral,
  showModal,
} from "../../client-api";
import {
  Status,
  fetchDatasetPartQuality,
  qualitySelector,
  DistributionType,
} from "../../../client/dataset-detail";
import DataService from "./part-data-service";
import Distribution from "./part-distribution";

/**
 * Part can be a distribution or data service. We fetch the data and
 * decide rendering based on that.
 */
export default function Part({distribution}) {
  const dispatch = useDispatch();
  const quality = useSelector(
    (state) => qualitySelector(state, distribution.iri));
  const args = {
    "t": useSelector(selectT),
    "tLabel": useSelector(selectTLabel),
    "tLiteral": useSelector(selectTLiteral),
    "openModal": (body) => dispatch(showModal(undefined, body)),
  };
  if (quality.status === Status.Undefined) {
    dispatch(fetchDatasetPartQuality(distribution.iri));
  }
  dispatch(fetchLabels(collectLabels(distribution)));
  if (distribution.type === DistributionType.DataService) {
    return partDataService(distribution, quality, undefined, args);
  }
  return partDistribution(distribution, quality, args);
}

Part.propTypes = {
  "distribution": PropTypes.object.isRequired,
};

function collectLabels(distribution) {
  return [
    distribution.format,
    distribution.mediaType,
    distribution.compressFormat,
    distribution.packageFormat,
  ];
}

function partDistribution(distribution, quality, args) {
  return (
    <Distribution
      distribution={distribution}
      quality={quality}
      {...args}
    />
  );
}

function partDataService(
  dataService, distributionQuality, dataServiceQuality, args) {
  return (
    <DataService
      dataService={dataService}
      quality={distributionQuality}
      {...args}
    />
  );
}
