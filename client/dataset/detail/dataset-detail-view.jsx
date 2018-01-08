import React from "react";
import {connect} from "react-redux";
import {
    fetchDataset,
    fetchDistribution,
    setDistributionPageIndex,
    setDistributionPageSize
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
import {isDataReady} from "./../../services/http-request";
import {selectLabel, selectLabels} from "./../../services/labels";
import {HttpRequestStatus} from "./../../application/http-request-status";

class DatasetMetadataComponent extends React.Component {
    render() {
        const dataset = this.props.dataset;
        let content = '\n{\n' +
            '"@context":"http://schema.org/",\n' +
            '"@type":"Dataset",\n' +
            '"name":"' + selectLabel(dataset["title"]) + '",\n' +
            '"description":"' + selectLabel(dataset["description"]) + '",\n' +
            '"url":"' + dataset["@id"] + '"\n';

        if (dataset["catalog"] !== undefined) {
            content += ',"includedInDataCatalog": "' + dataset["catalog"] + '"\n';
        }

        if (dataset["spatial"] !== undefined) {
            content += ',"spatialCoverage":"' + dataset["spatial"]["@id"] + '"\n';
        }

        if (dataset["temporal"] !== undefined) {
            content += ',"temporalCoverage":"' + dataset["temporal"]["startDate"] + "/" + dataset["temporal"]["endDate"] + '"\n';
        }

        if (dataset["keywords"] !== undefined) {
            content += ',"keywords":' + JSON.stringify(selectLabels(dataset["keywords"])) + '\n';
        }

        if (dataset["publisher"] !== undefined) {
            content += ',' +
                '"creator":{\n' +
                ' "@type":"Organization",\n' +
                ' "url": "' + dataset["publisher"]["@id"] + '",\n' +
                ' "name":"' + selectLabel(dataset["publisher"]) + '"\n' +
                ' }\n' +
                '}\n';
        }

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

        if (!isDataReady(dataset.status)) {
            return (
                <HttpRequestStatus status={dataset.status}/>
            )
        }

        const distributions = this.props.distributions;
        const ui = this.props.ui;

        // TODO Use IRI as a filter.
        const publisherUrl = getUrl(DATASET_LIST_URL, {
            [PUBLISHER_QUERY]: selectLabel(dataset.publisher)
        });

        const title = selectLabel(dataset.title);
        setPageTitle(title);

        return (
            <Container>
                <div style={{"marginTop": "2em"}}>
                    <h3>{title}</h3>
                    <h4>
                        <Link
                            to={publisherUrl}>{selectLabel(dataset.publisher)}</Link>
                    </h4>
                    <p>{selectLabel(dataset.description)}</p>
                    <TagLine values={selectLabels(dataset.keywords)}/>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <DatasetPropertyTable dataset={dataset}/>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <DistributionList
                        keys={dataset.distributions}
                        values={distributions}
                        fetchDistribution={this.props.fetchDistribution}
                        setPage={this.props.setDistributionPageIndex}
                        setPageSize={this.props.setDistributionPageSize}
                        pageIndex={ui.distributionsPageIndex}
                        pageSize={ui.distributionsPageSize}
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
    },
    "setDistributionPageSize": (page) => {
        dispatch(setDistributionPageSize(page));
    }
});

export const DatasetDetailView = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatasetDetailViewComponent);
