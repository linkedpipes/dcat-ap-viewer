import React from "react";
import {connect} from "react-redux";
import {
    fetchDataset,
    fetchDistribution,
    setDistributionPageIndex
} from "./dataset-detail-actions";
import {Container} from "reactstrap";
import DistributionList from "./distribution-list";
import TagLine from "../../components/tag-line";
import DatasetPropertyTable from "./dataset-property-table";
import {
    getUrl,
    getQuery,
    DATASET_LIST_URL,
    PUBLISHER_QUERY,
    DATASET_QUERY
} from "../../application/navigation";

class DatasetDetailViewComponent extends React.Component {

    componentWillMount() {
        const queryKey = getQuery(DATASET_QUERY);
        this.props.fetchDataset(this.props.location.query[queryKey]);
    }

    render() {
        const dataset = this.props.dataset;
        const distributions = this.props.distributions;
        const ui = this.props.ui;

        // TODO Export status report to another componanet
        // TODO Add translation
        if (dataset.status === "uninitialized") {
            return (
                <Container>
                    There are no data ...
                </Container>
            )
        }

        if (dataset.status === "fetching") {
            return (
                <Container>
                    Loading ...
                </Container>
            )
        }

        const publisherUrl = getUrl(DATASET_LIST_URL, {
            [PUBLISHER_QUERY]: dataset.publisher.label
        });

        return (
            <Container>
                <div style={{"marginTop": "2em"}}>
                    <h3>{dataset.title}</h3>
                    <h4>
                        {/* TODO Replace with link component integrated with navigation */}
                        <a href={publisherUrl}>{dataset.publisher.label}</a>
                    </h4>
                    <p>{dataset.description}</p>
                    <TagLine values={dataset.keyword}/>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <DatasetPropertyTable dataset={dataset}/>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <DistributionList
                        keys={dataset.distribution}
                        values={distributions}
                        fetchDistribution={this.props.fetchDistribution}
                        setPage={this.props.setDistributionPageIndex}
                        page={ui.distributionsPageIndex}
                    />
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    "ui": state.dataset.detail.ui,
    "dataset": state.dataset.detail.dataset,
    "distributions": state.dataset.detail.distributions
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchDataset": (iri) => {
        dispatch(fetchDataset(iri));
    },
    "fetchDistribution": (iri) => {
        dispatch(fetchDistribution(iri));
    },
    "setDistributionPageIndex": (page) => {
        dispatch(setDistributionPageIndex(page));
    }
});

export const DatasetDetailView = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatasetDetailViewComponent);
