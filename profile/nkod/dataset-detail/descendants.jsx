import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {PropTypes} from "prop-types";
import {
  register,
  QUERY_DATASET_DETAIL_IRI,
  URL_DATASET_DETAIL,
} from "../../client-api";
import {DATASET_DETAIL_DESCENDANTS} from "../nkod-component-names";
import {
  Status,
  descendantsSelector,
  fetchDescendants,
} from "../../../client/dataset-detail";
import Paginator from "../user-iterface/paginator";
import {
  selectT,
  URL_DATASET_LIST,
  QUERY_DATASET_IS_PART_OF,
} from "../../client-api";
import {Link} from "react-router-dom";
import TagLine from "../user-iterface/tag-line";

const DEFAULT_PAGE_SIZE = 4;

function Descendants(props) {
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
  if (descendants.count === 0) {
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
        <a href={datasetListLinkUrl(props.tUrl, props.iri) }>
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

register({
  "name": DATASET_DETAIL_DESCENDANTS,
  "element": Descendants,
});

function datasetListLinkUrl(tUrl, iri) {
  return tUrl(URL_DATASET_LIST,{[QUERY_DATASET_IS_PART_OF]: iri});
}

function DescendantsItem(props) {
  const {tLabel, tLiteral, tUrl, dataset, fetchLabels} = props;
  fetchLabels([...dataset.formats]);
  return (
    <div>
      <Link to={datasetLinkUrl(tUrl, dataset.iri)}>
        <h4>{tLabel(dataset.iri)}</h4>
      </Link>
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
      }}>
        {tLiteral(dataset.description)}
      </p>
      <TagLine
        items={dataset.formats}
        size={0.7}
        labelFunction={(iri) => tLabel(iri, iri)}
      />
      <hr/>
    </div>
  );
}

DescendantsItem.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

function datasetLinkUrl(tUrl, dataset) {
  return tUrl(URL_DATASET_DETAIL,{[QUERY_DATASET_DETAIL_IRI]: dataset.iri});
}