import React, {useState} from "react";
import {PropTypes} from "prop-types";
import {Row, Col} from "reactstrap";

import {
  getElement, register, useDistributionApi, useQualityApi,
} from "../viewer-api";
import Paginator from "../components/paginator";
import {DistributionType} from "../../data-model/distribution";

function DatasetDetailParts(props) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const distributions = props.dataset.distributions;
  if (distributions.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Row>
        {selectArray(distributions, page, pageSize).map((iri) => (
          <DatasetDetailPart language={props.language} key={iri} iri={iri}/>
        ))}
      </Row>
      <Paginator
        recordsCount={distributions.length}
        pageIndex={page}
        pageSize={pageSize}
        defaultPageSize={4}
        onIndexChange={setPage}
        onSizeChange={setPageSize}
        sizes={[1, 4, 16, 32]}
      />
    </React.Fragment>
  );
}

DatasetDetailParts.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.parts",
  "element": DatasetDetailParts,
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

function DatasetDetailPart(props) {
  const data = useDistributionApi(props.iri);
  const quality = useQualityApi(props.iri);

  let Component;
  if (data.loading) {
    Component = getElement("application.loading").element;
  } else if (data.failed) {
    Component = getElement("application.failed").element;
  } else {
    if (data.distribution.type === DistributionType.DataService) {
      Component = getElement("dataset-detail.parts.data-service").element;
    } else {
      Component = getElement("dataset-detail.parts.distribution").element;
    }
  }
  return (
    <Col sm="12" md="6" lg="6" className="mb-3">
      <Component
        language={props.language}
        iri={props.iri}
        part={data.distribution}
        quality={quality}
      />
    </Col>
  );
}

DatasetDetailPart.propTypes = {
  "iri": PropTypes.string.isRequired,
  "language": PropTypes.string.isRequired,
};
