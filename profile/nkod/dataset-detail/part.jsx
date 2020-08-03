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
  fetchDistribution,
  fetchDatasetPartQuality,
  partSelector,
  qualitySelector,
  PartType,
} from "../../../client/dataset-detail";
import DataService from "./part-data-service";
import Dataset from "./part-dataset";
import Distribution from "./part-distribution";

/**
 * Part can be a distribution or data service. We fetch the data and
 * decide rendering based on that.
 */
export default function Part({part}) {
  const dispatch = useDispatch();
  const partData = useSelector((state) => partSelector(state, part));
  const quality = useSelector((state) => qualitySelector(state, part.iri));
  const args = {
    "t": useSelector(selectT),
    "tLabel": useSelector(selectTLabel),
    "tLiteral": useSelector(selectTLiteral),
    "openModal": (body) => dispatch(showModal(undefined, body)),
  };
  if (partData.status === Status.Undefined) {
    dispatch(fetchDistribution(part));
    return partLoading();
  }
  if (partData.status === Status.Loading) {
    return partLoading();
  }
  if (partData.status === Status.Failed) {
    return partFailed();
  }
  if (quality.status === Status.Undefined) {
    dispatch(fetchDatasetPartQuality(part));
  }
  dispatch(fetchLabels(collectLabels(part, partData)));
  if (part.type === PartType.PartDistribution) {
    return partDistribution(partData, quality, args);
  }
  if (part.type === PartType.PartDistribution) {
    return partDataService(partData, quality, args);
  }
  if (part.type === PartType.PartDataset) {
    return partDataset(partData, quality, args);
  }
  console.error("Unknown part type:", part, partData);
  return null;
}

Part.propTypes = {
  "part": PropTypes.object.isRequired,
};

function partLoading() {
  return (
    <div className="container">
      PART - LOADING
    </div>
  );
}

function partFailed() {
  return (
    <div className="container">
      PART - FAILED
    </div>
  );
}

function collectLabels(part, data) {
  if (part.type === PartType.PartDataset) {
    return [];
  }
  if (part.type === PartType.PartDistribution ||
    part.type === PartType.PartDataService) {
    return [
      data.format,
      data.mediaType,
      data.compressFormat,
      data.packageFormat,
    ];
  }
  return [];
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

function partDataset(dataset, quality, args) {
  return (
    <Dataset
      dataset={dataset}
      quality={quality}
      {...args}
    />
  );
}
