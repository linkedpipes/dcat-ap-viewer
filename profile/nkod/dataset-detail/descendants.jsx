import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {PropTypes} from "prop-types";
import {
  Status,
  descendantsSelector,
  fetchDescendants,
} from "../../../client/dataset-detail";
import Paginator from "../user-iterface/paginator";
import DescendantsItem from "./descendants-item";
import {
  selectT,
  URL_DATASET_LIST,
  QUERY_DATASET_IS_PART_OF,
} from "../../client-api";

const DEFAULT_PAGE_SIZE = 4;

export default function Descendants(props) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const t = useSelector(selectT);
  const descendants = useSelector(descendantsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDescendants(props.iri, page * pageSize, pageSize));
  }, [page, pageSize]);
  if (descendants.status !== Status.Ready &&
    descendants.status !== Status.Updating) {
    return null;
  }
  return (
    <div className="container">
      <div>
        {descendants.datasets.map((dataset) => (
          <DescendantsItem
            key={dataset.iri}
            dataset={dataset}
            tLabel={props.tLabel}
            tLiteral={props.tLiteral}
            tUrl={props.tUrl}
            fetchLabels={props.fetchLabels}
          />
        ))}
      </div>
      <Paginator
        recordsCount={descendants.count}
        pageIndex={page}
        pageSize={pageSize}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        onIndexChange={setPage}
        onSizeChange={setPageSize}
        sizes={[1, 4, 16, 32]}
      />
      <div>
        <a href={datasetLinkUrl(props.tUrl, props.iri) }>
          {t("showAllDescendantsLink")}
        </a>
      </div>
    </div>
  );
}

Descendants.propTypes = {
  "iri": PropTypes.string.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};


function datasetLinkUrl(tUrl, iri) {
  return tUrl(URL_DATASET_LIST,{[QUERY_DATASET_IS_PART_OF]: iri});
}