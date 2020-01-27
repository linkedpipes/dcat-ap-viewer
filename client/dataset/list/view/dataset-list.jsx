import React from "react";
import {Link} from "react-router-dom";
import {
  getUrl,
  DATASET_DETAIL_URL,
  DATASET_QUERY,
  DATASET_LIST_URL,
  PUBLISHER_QUERY,
  PAGE_QUERY,
  PAGE_SIZE_QUERY,
  SORT_QUERY,
} from "../../../app/navigation";
import {Badge} from "reactstrap";
import Paginator from "../../../app-ui/paginator";
import {
  querySelector,
  datasetsSelector,
  datasetsTotalCountSelector,
} from "../dataset-list-reducer";
import {connect} from "react-redux";
import {
  updateQuery,
} from "../dataset-list-actions";
import SortSelector from "./ui/sort-selector";
import {Row, Col} from "reactstrap";
import QueryStatus from "./ui/query-status";
import {PropTypes} from "prop-types";

class _DatasetList extends React.Component {

  render() {
    const showPublisher = this.props.query.publisher.length === 0;
    return (
      <div>
        <Row>
          <Col className="mt-2">
            <div className="float-lg-right">
              <SortSelector
                value={this.props.query.sort}
                onChange={this.props.setSort}/>
            </div>
          </Col>
        </Row>
        <div className="m-md-1">
          <QueryStatus/>
        </div>
        <br/>
        {this.props.datasets.map((dataset) => (
          <DatasetListItem
            key={dataset.id}
            value={dataset}
            showPublisher={showPublisher}/>
        ))}
        <Paginator
          recordsCount={this.props.datasetCount}
          pageIndex={this.props.query.page}
          pageSize={this.props.query.pageSize}
          onIndexChange={this.props.setPageIndex}
          onSizeChange={this.props.setPageSize}
          sizes={[10, 20, 40, 80]}
        />
      </div>
    )
  }

}

_DatasetList.propTypes = {
  "setSort": PropTypes.func.isRequired,
  "setPageIndex": PropTypes.func.isRequired,
  "setPageSize": PropTypes.func.isRequired,
  "query": PropTypes.object.isRequired,
  "datasets": PropTypes.arrayOf(PropTypes.object).isRequired,
  "datasetCount": PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  "query": querySelector(state),
  "datasets": datasetsSelector(state),
  "datasetCount": datasetsTotalCountSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "setPageIndex": (value) => dispatch(updateQuery(
    ownProps.location, {[PAGE_QUERY]: value}, [],
  )),
  "setPageSize": (value) => dispatch(updateQuery(
    ownProps.location, {[PAGE_SIZE_QUERY]: value}, [PAGE_QUERY],
  )),
  "setSort": (sortBy) => dispatch(updateQuery(
    ownProps.location, {[SORT_QUERY]: sortBy}, [PAGE_QUERY],
  )),
});

const DatasetList = connect(mapStateToProps, mapDispatchToProps)(_DatasetList);

export default DatasetList;

function DatasetListItem({value, showPublisher}) {
  const datasetUrl = getUrl(DATASET_DETAIL_URL, {
    [DATASET_QUERY]: value.iri,
  });
  const publisherUrl = getUrl(DATASET_LIST_URL, {
    [PUBLISHER_QUERY]: value.publisher,
  });
  return (
    <div>
      <Link to={datasetUrl}>
        <h4>{value.title}</h4>
      </Link>
      {showPublisher &&
            <Link to={publisherUrl}>{value.publisher}</Link>
      }
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
      }}>
        {value.description}
      </p>
      <TagLine values={value.format} size={0.7}/>
      <hr/>
    </div>
  )
}

DatasetListItem.propTypes = {
  "value": PropTypes.object.isRequired,
  "showPublisher": PropTypes.bool.isRequired,
};

// TODO Duplicity to query-status.line.jsx
function TagLine({values, size = 1}) {
  if (values === undefined) {
    return null;
  }
  return (
    <div style={{"marginTop": "0.2em"}}>
      {values.map((item) => (
        <Badge
          style={{
            "marginLeft": "1em",
            "marginBottom": "0.5em",
            "fontSize": size + "em",
          }}
          color="info"
          pill
          key={item}>
          {item}
        </Badge>
      ))}
    </div>
  );
}

TagLine.propTypes = {
  "values": PropTypes.arrayOf(PropTypes.string).isRequired,
  "size": PropTypes.number,
};
