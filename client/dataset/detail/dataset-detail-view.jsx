import React from "react";
import {connect} from "react-redux";
import {
    fetchDataset,
    fetchDistribution,
    setDistributionPageIndex
} from "./dataset-detail-actions";
import {Container, Table} from "reactstrap";
import Paginator from "../../components/paginator";
import TagLine from "../../components/tag-line";

// TODO Add other fields.
// TODO Extract to component.
const DatasetPropertyTable = ({dataset}) => (
    <Table>
        <thead>
        <tr>
            <th>Pole</th>
            <th>Hodnota</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Správce</td>
            <td>{dataset.publisher}</td>
        </tr>
        <tr>
            <td>Naposledy aktualizováno</td>
            <td>{dataset.modified}</td>
        </tr>
        <tr>
            <td>Vytvořeno</td>
            <td>{dataset.issued}</td>
        </tr>
        <tr>
            <td>Periodicita aktualizace</td>
            <td>{dataset.accrualPeriodicity}</td>
        </tr>
        </tbody>
    </Table>
);

class DistributionList extends React.Component {

    render() {
        const distributions = this.props.values;

        const pageSize = 10;
        let rows = [];
        const iterStart = this.props.page * pageSize;
        const iterEnd = Math.min(
            (this.props.page + 1) * pageSize,
            this.props.keys.length);

        for (let index = iterStart; index < iterEnd; ++index) {
            const key = this.props.keys[index];
            const distribution = distributions[key];
            if (distribution == undefined) {

                this.props.fetchDistribution(key);

                rows.push((
                    <tr key={key}>
                        <td colSpan="2">
                            Loading ...
                        </td>
                    </tr>
                ));
            } else {
                let title = distribution.title;
                if (title === undefined || title === "") {
                    title = "Nepojmenovaná distribuce";
                }
                rows.push((
                    <tr key={key}>
                        <td>
                            <a href={distribution.accessURL}>
                                {title}
                            </a>
                        </td>
                        <td>
                            {distribution.license.substr &&
                            <a href={distribution.license}>
                                {distribution.license.substr(
                                    distribution.license.lastIndexOf("/") + 1)}
                            </a>
                            }
                        </td>
                    </tr>
                ));
            }
        }

        const pageCount = Math.floor(this.props.keys.length / pageSize);

        return (
            <div>
                <h4>Distribuce</h4>
                <Table>
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Licence</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Paginator
                    start={0}
                    value={this.props.page}
                    end={pageCount}
                    onChange={this.props.setPage}/>
            </div>
        );
    }

}

class DatasetDetailViewComponent extends React.Component {

    componentWillMount() {
        this.props.fetchDataset(this.props.location.query.url);
    }

    render() {
        const dataset = this.props.dataset;
        const distributions = this.props.distributions;
        const ui = this.props.ui;

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

        return (
            <Container>
                <div style={{"marginTop": "2em"}}>
                    <h3>{dataset.title}</h3>
                    <p>{dataset.description}</p>
                    <TagLine values={dataset.keyword}/>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <h4>Vlastnosti</h4>
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
