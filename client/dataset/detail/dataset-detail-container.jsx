import React from "react";
import {connect} from "react-redux";
import {
    onMount,
    onUnMount,
    fetchDataset
} from "./dataset-detail-actions";
import {statusSelector, datasetSelector} from "./dataset-detail-reducer"
import {
    getQuery,
    DATASET_QUERY,
    DATASET_LIST_URL,
    PUBLISHER_QUERY,
    getUrl
} from "app/navigation";
import {getString} from "app/strings";
import setPageTitle from "app-services/page-title";
import {isDataReady} from "app-services/http-request";
import {selectLabel, labelsSelector} from "app-services/labels";
import {HttpRequestStatus} from "app/http-request-status";
import {DatasetDetail} from "./dataset-detail";
import {DatasetWebPageMetadata} from "./webpage-metadata";
import {DistributionListContainer} from "./distribution";

class _DatasetDetailContainer extends React.Component {

    componentWillMount() {
        setPageTitle(getString("title.dataset"));
        this.props.onMount();
        this.props.fetchDataset();
    }

    render() {
        if (!isDataReady(this.props.status)) {
            return (
                <HttpRequestStatus status={this.props.status}/>
            )
        } else {
            const labels = this.props.labels;
            const title = selectLabel(labels, this.props.dataset);
            setPageTitle(title);

            const publisherLabel =
                selectLabel(labels, this.props.dataset.publisher);
            const publisherUrl = getUrl(DATASET_LIST_URL, {
                [PUBLISHER_QUERY]: publisherLabel
            });

            return (
                <div className="container">
                    <DatasetDetail
                        dataset={this.props.dataset}
                        publisherUrl={publisherUrl}
                        labels={labels}/>
                    <DistributionListContainer dataset={this.props.dataset}/>
                    <DatasetWebPageMetadata
                        dataset={this.props.dataset}
                        labels={labels}/>
                </div>
            )
        }
    }

    componentWillUnmount() {
        this.props.onUnMount();
    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": statusSelector(state),
    "dataset": datasetSelector(state),
    "labels": labelsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "onMount": () => dispatch(onMount()),
    "onUnMount": () => dispatch(onUnMount()),
    "fetchDataset": () => {
        const queryKey = getQuery(DATASET_QUERY);
        const iri = ownProps.location.query[queryKey];
        dispatch(fetchDataset(iri));
    }
});

export const DatasetDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DatasetDetailContainer);
