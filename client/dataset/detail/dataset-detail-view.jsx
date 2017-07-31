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
import {Link} from "react-router";
import {getString} from "../../application/strings";
import setPageTitle from "../../services/page-title";

class DatasetMetadataComponent extends React.Component {
    render() {
        const dataset = this.props.dataset;
        let content = '\n{\n' +
            '"@context":"http://schema.org/",\n' +
            '"@type":"Dataset",\n' +
            '"name":"' + dataset["title"] + '",\n' +
            '"description":"' + dataset["description"] + '",\n' +
            '"url":"' + dataset["iri"] + '",\n' +
            '"spatialCoverage":"' + dataset["spatial"] + '",\n' +
            '"includedInDataCatalog": "' + dataset["catalog"] + '",\n';

        if (dataset["temporal"] !== undefined) {
            content += '"temporalCoverage":"' + dataset["temporal"]["startDate"] + "/" + dataset["temporal"]["endDate"] + '",\n';
        }

        if (dataset["keywords"] !== undefined) {
            content += '"keywords":' + JSON.stringify(dataset["keywords"]) + '",\n';
        }

        content += '' +
            '"creator":{\n' +
            ' "@type":"Organization",\n' +
            ' "url": "' + dataset["publisher"]["iri"] + '",\n' +
            ' "name":"' + dataset["publisher"]["label"] + '"\n' +
            ' }\n' +
            '}\n';

        content += '}';

        return (
            <script type="application/ld+json">
                {content}
            </script>
        )
    }
}

class DatasetDetailViewComponent extends React.Component {

    componentWillMount() {
        const queryKey = getQuery(DATASET_QUERY);
        this.props.fetchDataset(this.props.location.query[queryKey]);
    }

    render() {
        setPageTitle(getString("title.dataset"));

        const dataset = this.props.dataset;
        const distributions = this.props.distributions;
        const ui = this.props.ui;

        // TODO Export status report to another component
        if (dataset.status === "uninitialized") {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.no_data")}
                </div>
            )
        } else if (dataset.status === "fetching") {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.fetching")}
                </div>
            )
        } else if (dataset.status === "failed") {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.failed")}
                </div>
            )
        }

        const publisherUrl = getUrl(DATASET_LIST_URL, {
            [PUBLISHER_QUERY]: dataset.publisher.label
        });

        setPageTitle(dataset.title);

        return (
            <Container>
                <div style={{"marginTop": "2em"}}>
                    <h3>{dataset.title}</h3>
                    <h4>
                        {/* TODO Replace with link component integrated with navigation */}
                        <Link to={publisherUrl}>{dataset.publisher.label}</Link>
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
                <DatasetMetadataComponent dataset={dataset}/>
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
