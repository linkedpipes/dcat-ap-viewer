import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {
  selectTLabel,
  selectTUrl,
  selectTLiteral,
  fetchLabels,
  selectT,
  getGlobal,
  register,
  PAGE_SIZE_DEFAULT,
  QUERY_DATASET_LIST_PUBLISHER,
} from "../../../client-api";
import Paginator from "../../user-iterface/paginator";
import DatasetsViewHeader from "./datasets-view-header";
import DatasetListItem from "./datasets-view-item";
import {DATASET_LIST_DATASET_VIEW} from "../../nkod-component-names";
import {Button} from "reactstrap";

const PAGE_SIZES = [getGlobal(PAGE_SIZE_DEFAULT), 20, 40, 80];

function DatasetsView(props) {
  return (
    <React.Fragment>
      <DatasetsViewHeader
        t={props.t}
        tLabel={props.tLabel}
        query={props.query}
        datasetCount={props.datasetsCount}
        onSortSet={props.onDatasetsSort}
      />
      <div>
        {props.datasets.map(dataset => (
          <DatasetListItem
            key={dataset.iri}
            tLabel={props.tLabel}
            tLiteral={props.tLiteral}
            tUrl={props.tUrl}
            showPublisher={getShowPublisher(props.query)}
            dataset={dataset}
            fetchLabels={props.fetchLabels}
          />
        ))}
      </div>
      <br/>
      {getShowMoreVisible(props.datasetsCount, props.query, props.datasets) && (
        <React.Fragment>
          <Button onClick={props.onShowMoreDatasets}>
            {props.t("facet.show_more")}
          </Button>
          <br/>
        </React.Fragment>
      )}
      <Paginator
        recordsCount={props.datasetsCount}
        pageIndex={props.query["page"]}
        pageSize={props.query["pageSize"]}
        onIndexChange={props.onDatasetsPage}
        onSizeChange={props.onDatasetsPageSize}
        sizes={PAGE_SIZES}/>
    </React.Fragment>
  )
}

DatasetsView.propTypes = {
  // From connect.
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  // From dataset-list.
  "query": PropTypes.object.isRequired,
  "onDatasetsPage": PropTypes.func.isRequired,
  "onDatasetsPageSize": PropTypes.func.isRequired,
  "onDatasetsSort": PropTypes.func.isRequired,
  "onShowMoreDatasets": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
  // From view container.
  "datasets": PropTypes.array.isRequired,
  "datasetsCount": PropTypes.number.isRequired,
};

register({
  "name": DATASET_LIST_DATASET_VIEW,
  "element": connect((state) => ({
    "t": selectT(state),
    "tLabel": selectTLabel(state),
    "tUrl": selectTUrl(state),
    "tLiteral": selectTLiteral(state),
  }), (dispatch) => ({
    "fetchLabels": (iris) => dispatch(fetchLabels(iris)),
  }))(DatasetsView),
});

function getShowPublisher(query) {
  return !(query[QUERY_DATASET_LIST_PUBLISHER] &&
    query[QUERY_DATASET_LIST_PUBLISHER].length > 0);
}

function getShowMoreVisible(datasetCount, query, datasets) {
  const lastVisible = (query["page"] * query["pageSize"]) + datasets.length;
  return lastVisible < datasetCount;
}