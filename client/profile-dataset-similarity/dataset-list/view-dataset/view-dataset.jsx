import React, {useCallback} from "react";
import {PropTypes} from "prop-types";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import {t, register} from "../../viewer-api";

import Paginator from
  "../../../profile-lkod/components/paginator";
import DatasetListHeader from
  "./../../../profile-lkod/dataset-list/view-dataset/view-dataset-header";
import DatasetListItem from "./view-dataset-item";

const PAGE_SIZES = [10, 20, 40, 80];

function DatasetListDatasetView(props) {

  const {onUpdateQuery, query} = props;

  const onShowMore = useCallback(() => {
    onUpdateQuery({"showMore": query.showMore + 6});
  }, [onUpdateQuery, query]);

  const onPage = useCallback((value) => {
    onUpdateQuery({"page": value, "showMore": 0});
  }, [onUpdateQuery]);

  const onPageSize = useCallback((value) => {
    onUpdateQuery({"page": 0, "pageSize": value, "showMore": 0});
  }, [onUpdateQuery]);

  return (
    <React.Fragment>
      <DatasetListHeader
        state={props.state}
        query={props.query}
        onUpdateQuery={props.onUpdateQuery}
      />
      <div>
        {props.state.datasets.map(dataset => (
          <DatasetListItem
            key={dataset.iri}
            dataset={dataset}
            showPublisher={false}
          />
        ))}
      </div>
      <br/>
      {getShowMoreVisible(
        props.state.datasetsCount, props.query, props.state.datasets,
      ) && (
        <React.Fragment>
          <Button onClick={onShowMore}>
            {t("facet.showMore")}
          </Button>
          <br/>
        </React.Fragment>
      )}
      <Paginator
        recordsCount={props.state.datasetsCount}
        pageIndex={props.query.page}
        pageSize={props.query.pageSize}
        onIndexChange={onPage}
        onSizeChange={onPageSize}
        sizes={PAGE_SIZES}/>
    </React.Fragment>
  );
}

register({
  "name": "app.dataset-list.view-dataset",
  "element": DatasetListDatasetView,
});

DatasetListDatasetView.propTypes = {
  "state": PropTypes.shape({
    "datasets": PropTypes.arrayOf(PropTypes.shape({
      "iri": PropTypes.string.isRequired,
    })).isRequired,
    "datasetsCount": PropTypes.number.isRequired,
  }).isRequired,
  "query": PropTypes.shape({
    "page": PropTypes.number.isRequired,
    "pageSize": PropTypes.number.isRequired,
    "showMore": PropTypes.number.isRequired,
    "sort": PropTypes.string.isRequired,
    "publishers": PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  "onUpdateQuery": PropTypes.func.isRequired,
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

function getShowMoreVisible(datasetCount, query, datasets) {
  const lastVisible = (query["page"] * query["pageSize"]) + datasets.length;
  return lastVisible < datasetCount;
}
