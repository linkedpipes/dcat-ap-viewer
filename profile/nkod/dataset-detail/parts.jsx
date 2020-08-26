import React, {useState} from "react";
import {PropTypes} from "prop-types";
import {
  fetchLabels,
  getRegisteredElement,
  register,
  selectT,
  selectTLabel,
  selectTLiteral,
  showModal,
} from "../../client-api";
import Paginator from "../user-iterface/paginator";
import {
  DATASET_DETAIL_DISTRIBUTION_LIST,
  DATASET_DETAIL_DISTRIBUTION,
  DATASET_DETAIL_DATA_SERVICE,
} from "../nkod-component-names";
import {useDispatch, useSelector} from "react-redux";
import {
  qualitySelector,
  Status,
} from "../../../client/dataset-detail/dataset-detail-reducer";
import {
  fetchDatasetPartQuality,
} from "../../../client/dataset-detail/dataset-detail-service";
import {
  DistributionType,
} from "../../../client/dataset-detail/dataset-detail-model";

function Parts({distributions}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const dispatch = useDispatch();
  const args = {
    "t": useSelector(selectT),
    "tLabel": useSelector(selectTLabel),
    "tLiteral": useSelector(selectTLiteral),
    "openModal": (body) => dispatch(showModal(undefined, body)),
  };

  if (distributions.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="row">
        {selectArray(distributions, page, pageSize).map((distribution) => (
          <Part
            key={distribution.iri}
            distribution={distribution}
            dispatch={dispatch}
            args={args}
          />
        ))}
      </div>
      <Paginator
        recordsCount={distributions.length}
        pageIndex={page}
        pageSize={pageSize}
        defaultPageSize={4}
        onIndexChange={setPage}
        onSizeChange={setPageSize}
        sizes={[1, 4, 16, 32]}
      />
    </div>
  );
}

Parts.propTypes = {
  "distributions": PropTypes.array.isRequired,
};

register({
  "name": DATASET_DETAIL_DISTRIBUTION_LIST,
  "element": Parts,
});

function selectArray(items, page, pageSize) {
  const result = [];
  const start = page * pageSize;
  const end = Math.min((page + 1) * pageSize, items.length);
  for (let index = start; index < end; ++index) {
    result.push(items[index]);
  }
  return result;
}

function Part({dispatch, args, distribution}) {
  const quality = useSelector(
    (state) => qualitySelector(state, distribution.iri));
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
  "dispatch": PropTypes.func.isRequired,
  "args": PropTypes.object.isRequired,
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
  const Distribution = getRegisteredElement(DATASET_DETAIL_DISTRIBUTION);
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
  const DataService = getRegisteredElement(DATASET_DETAIL_DATA_SERVICE);
  return (
    <DataService
      dataService={dataService}
      quality={distributionQuality}
      {...args}
    />
  );
}

