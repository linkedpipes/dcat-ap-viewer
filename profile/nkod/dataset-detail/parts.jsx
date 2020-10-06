import React, {useEffect, useState} from "react";
import {PropTypes} from "prop-types";
import {
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
  fetchDistribution,
  fetchDatasetPartQuality,
  qualitySelector,
  Status,
  datasetPartSelector,
  DistributionType,
} from "../../../client/dataset-detail";

const PART_SYSTEM = "nkod.dataset-detail.system-part";

function Parts({parts}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const dispatch = useDispatch();
  const args = {
    "t": useSelector(selectT),
    "tLabel": useSelector(selectTLabel),
    "tLiteral": useSelector(selectTLiteral),
    "openModal": (body) => dispatch(showModal(undefined, body)),
  };

  if (parts.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="row">
        {selectArray(parts, page, pageSize).map((iri) => (
          <Part
            key={iri}
            iri={iri}
            dispatch={dispatch}
            args={args}
          />
        ))}
      </div>
      <Paginator
        recordsCount={parts.length}
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
  "parts": PropTypes.arrayOf(PropTypes.string).isRequired,
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

function Part({dispatch, args, iri}) {
  const part = useSelector((state) => datasetPartSelector(state, iri));
  const quality = useSelector(
    (state) => qualitySelector(state, part.iri));
  useEffect(() => {
    if (part.resourceStatus === Status.Undefined) {
      dispatch(fetchDistribution(iri));
      return;
    }
    if (quality.resourceStatus === Status.Undefined) {
      dispatch(fetchDatasetPartQuality(part.iri));
    }
  }, [part]);
  if (part.resourceStatus !== Status.Ready) {
    return partSystem(part, args);
  }
  if (part.type === DistributionType.DataService) {
    return partDataService(part, quality, args);
  }
  return partDistribution(part, quality, args);
}

Part.propTypes = {
  "dispatch": PropTypes.func.isRequired,
  "args": PropTypes.object.isRequired,
  "iri": PropTypes.string.isRequired,
};

function partSystem(part, args) {
  const Component = getRegisteredElement(PART_SYSTEM);
  return (
    <Component
      part={part}
      {...args}
    />
  );
}

function partDistribution(distribution, quality, args) {
  const Component = getRegisteredElement(DATASET_DETAIL_DISTRIBUTION);
  return (
    <Component
      distribution={distribution}
      quality={quality}
      {...args}
    />
  );
}

function partDataService(dataService, quality, args) {
  const Component = getRegisteredElement(DATASET_DETAIL_DATA_SERVICE);
  return (
    <Component
      dataService={dataService}
      quality={quality}
      {...args}
    />
  );
}

