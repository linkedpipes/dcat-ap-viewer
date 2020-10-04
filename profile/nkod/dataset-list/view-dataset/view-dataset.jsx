import React, {useEffect, useRef, useState} from "react";
import {PropTypes} from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import {
  QUERY_DATASET_LIST_PUBLISHER,
  register,
  selectT,
  selectTLabel,
  selectTLiteral,
  selectTUrl,
} from "../../../client-api";
import {
  updateDatasets,
  selectDatasetList,
  selectDatasetListCount,
} from "../../../../client/dataset-list";
import {
  toDatasetListQuery,
} from "../dataset-list-query-service";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Header from "./header";
import Paginator from "../../user-iterface/paginator";
import Item from "./item";

const PAGE_SIZES = [10, 20, 40, 80];

function datasetListDatasetView(props) {
  const t = useSelector(selectT);
  const tLabel = useSelector(selectTLabel);
  const tLiteral = useSelector(selectTLiteral);
  const tUrl = useSelector(selectTUrl);
  const dispatch = useDispatch();
  const datasets = useSelector(selectDatasetList);
  const datasetsCount = useSelector(selectDatasetListCount);
  const lastQuery = useRef();
  const [showMore, setShowMore] = useState(0);

  useEffect(() => {
    dispatch(updateDatasets(
      toDatasetListQuery(props.query, showMore),
      lastQuery.current ?
        toDatasetListQuery(lastQuery.current) :
        undefined
    ));
    lastQuery.current = props.query;
  }, [props.query, showMore]);

  const onSort = (value) => {
    props.onUpdateNavigation({
      ...props.query,
      "sort": value,
    });
  };

  const onShowMore = () => {
    setShowMore(showMore + 6);
  };

  const onPage= (page) => {
    setShowMore(showMore);
    props.onUpdateNavigation({
      ...props.query,
      "page": page,
    });
  };

  const onPageSize = (size) => {
    setShowMore(showMore);
    props.onUpdateNavigation({
      ...props.query,
      "page": 0,
      "pageSize": size,
    });
  };

  return (
    <React.Fragment>
      <Header
        t={t}
        tLabel={tLabel}
        query={props.query}
        datasetsCount={datasetsCount}
        onSortSet={onSort}
      />

      <div>
        {datasets.map(dataset => (
          <Item
            key={dataset.iri}
            tLabel={tLabel}
            tLiteral={tLiteral}
            tUrl={tUrl}
            showPublisher={getShowPublisher(props.query)}
            dataset={dataset}
          />
        ))}
      </div>
      <br/>
      {getShowMoreVisible(datasetsCount, props.query, datasets) && (
        <React.Fragment>
          <Button onClick={onShowMore}>
            {t("facet.showMore")}
          </Button>
          <br/>
        </React.Fragment>
      )}
      <Paginator
        recordsCount={datasetsCount}
        pageIndex={props.query["page"]}
        pageSize={props.query["pageSize"]}
        onIndexChange={onPage}
        onSizeChange={onPageSize}
        sizes={PAGE_SIZES}/>
    </React.Fragment>
  );
}

register({
  "name": "app.dataset-list.dataset-view",
  "element": datasetListDatasetView,
});

datasetListDatasetView.propTypes = {
  "query": PropTypes.object.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
};

function SortSelector({t, value, onChange}) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        {t(value)}
      </DropdownToggle>
      <DropdownMenu>
        {
          ["title asc", "title desc"].filter(item => item !== value)
            .map(item => (
              <DropdownItem key={item} onClick={() => onChange(item)}>
                {t(item)}
              </DropdownItem>
            ))
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

SortSelector.propTypes = {
  "t": PropTypes.func.isRequired,
  "onChange": PropTypes.func.isRequired,
  "value": PropTypes.string.isRequired,
};

function getShowPublisher(query) {
  return !(query[QUERY_DATASET_LIST_PUBLISHER] &&
    query[QUERY_DATASET_LIST_PUBLISHER].length > 0);
}

function getShowMoreVisible(datasetCount, query, datasets) {
  const lastVisible = (query["page"] * query["pageSize"]) + datasets.length;
  return lastVisible < datasetCount;
}
