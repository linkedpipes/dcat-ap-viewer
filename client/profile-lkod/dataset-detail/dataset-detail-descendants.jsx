import React, {useState} from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {
  t, register, useLabelApi, useDescendantsApi, getElement,
  createUrl, selectLiteral,
} from "../viewer-api";
import Paginator from "../components/paginator";
import TagLine from "../components/tag-line";

const PAGE_SIZES = [10, 20, 40, 80];

const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];

function DatasetDetailDescendants(props) {
  const selectLabel = useLabelApi();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const data = useDescendantsApi(props.dataset.iri, page * pageSize, pageSize);

  if (data.loading) {
    const Component = getElement("application.loading").element;
    return (<Component/>);
  }

  if (data.failed) {
    const Component = getElement("application.failed").element;
    return (<Component/>);
  }

  if (data.count === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <h2>{t("datasetSeriesTitle")}</h2>
      <br/>
      {data.datasets.map((dataset) => (
        <DescendantsItem
          key={dataset.iri}
          selectLabel={selectLabel}
          language={props.language}
          dataset={dataset}
        />
      ))}
      <Paginator
        recordsCount={data.count}
        pageIndex={page}
        pageSize={pageSize}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        onIndexChange={setPage}
        onSizeChange={setPageSize}
        sizes={[1, 4, 16, 32]}
      />
      <a href={datasetListLinkUrl(props.language, props.dataset.iri)}>
        {t("showAllDescendantsLink")}
      </a>
    </React.Fragment>
  );
}

DatasetDetailDescendants.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.descendants",
  "element": DatasetDetailDescendants,
});

function datasetListLinkUrl(language, iri) {
  return createUrl(language, "/datasets", {"isPartOf": iri});
}

function DescendantsItem(props) {
  const dataset = props.dataset;
  return (
    <div>
      <Link to={datasetDetailLinkUrl(props.language, dataset.iri)}>
        <h4>{props.selectLabel(dataset.iri)}</h4>
      </Link>
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
      }}>
        {selectLiteral(props.language, dataset.description)}
      </p>
      <TagLine
        items={dataset.formats}
        size={0.7}
        labelFunction={props.selectLabel}
      />
      <hr/>
    </div>
  );
}

DescendantsItem.propTypes = {
  "selectLabel": PropTypes.func.isRequired,
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

function datasetDetailLinkUrl(language, iri) {
  return createUrl(language, "/dataset", {"dataset": iri});
}
