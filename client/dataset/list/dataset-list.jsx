import React from "react";
import {Link} from "react-router-dom";
import {
    getUrl,
    DATASET_DETAIL_URL,
    DATASET_QUERY,
    DATASET_LIST_URL,
    PUBLISHER_QUERY,
    PAGE_QUERY,
    PAGE_SIZE_QUERY
} from "../../app/navigation";
import {Badge} from "reactstrap";
import Paginator from "app-components/paginator";
import {
    querySelector,
    datasetsSelector,
    datasetsTotalCountSelector
} from "./dataset-list-reducer";
import {connect} from "react-redux";
import {
    updateQueryFilters
} from "./dataset-list-actions";

class _DatasetList extends React.Component {

    render() {
        const showPublisher = this.props.query.publisher.length === 0;
        return (
            <div>
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

const mapStateToProps = (state, ownProps) => ({
    "query": querySelector(state),
    "datasets": datasetsSelector(state),
    "datasetCount": datasetsTotalCountSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "setPageIndex": (event) => dispatch(updateQueryFilters(
        ownProps.location, {[PAGE_QUERY]: value}, []
    )),
    "setPageSize": (event) => dispatch(updateQueryFilters(
        ownProps.location, {[PAGE_SIZE_QUERY]: value}, [PAGE_QUERY]
    ))
});

const DatasetList = connect(mapStateToProps, mapDispatchToProps)(_DatasetList);

export default DatasetList;

const DatasetListItem = ({value, showPublisher}) => {
    const datasetUrl = getUrl(DATASET_DETAIL_URL, {
        [DATASET_QUERY]: value.iri
    });
    const publisherUrl = getUrl(DATASET_LIST_URL, {
        [PUBLISHER_QUERY]: value.publisher
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
                "WebkitBoxOrient": "vertical"
            }}>
                {value.description}
            </p>
            <TagLine values={value.format} size={0.7}/>
            <hr/>
        </div>
    )
};

// TODO Duplicity to query-status.line.jsx
const TagLine = ({values, size = 1}) => {
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
                        "fontSize": size + "em"
                    }}
                    color="info"
                    pill
                    key={item}>
                    {item}
                </Badge>
            ))}
        </div>
    );
};
