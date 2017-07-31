import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {Row, Col, Container} from "reactstrap";
import {fetchDataRequest} from "./organisation-list-action";
import {formatNumber} from "../../services/formats";
import {
    getUrl,
    DATASET_LIST_URL,
    PUBLISHER_QUERY
} from "../../application/navigation";
import {getString} from "../../application/strings";
import setPageTitle from "../../services/page-title";

const OrganisationListItem = ({value}) => {
    let datasetCountLabel;
    if (value.count === 1) {
        datasetCountLabel = getString("s.one_dataset");
    } else if (value.count <= 4) {
        datasetCountLabel = value.count +
            getString("s.two_three_datasets");
    } else {
        datasetCountLabel = formatNumber(value.count) +
            getString("s.many_datasets");
    }
    return (
        <div>
            <Link
                to={getUrl(DATASET_LIST_URL, {[PUBLISHER_QUERY]: value.label})}>
                <h4>{value.label}</h4>
            </Link>
            <p>
                {datasetCountLabel}
            </p>
            <hr/>
        </div>
    );
};

const OrganisationList = ({values}) => {
    return (
        <div>
            <hr/>
            {values.map((item) => (
                <OrganisationListItem key={item.label} value={item}/>
            ))}
        </div>
    )
};

class OrganisationListViewComponent extends React.Component {

    componentDidMount() {
        this.props.fetchData(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        // Check whether we need to update data.
        if (nextProps.query !== this.props.query) {
            this.props.fetchData(nextProps.query);
        }
    }

    render() {
        const props = this.props;

        setPageTitle(getString("title.organisations"));

        // TODO Export status report to another component
        if (this.props.status === "uninitialized") {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.no_data")}
                </div>
            )
        } else if (this.props.status === "fetching") {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.fetching")}
                </div>
            )
        } else if (this.props.status === "failed") {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.failed")}
                </div>
            )
        }

        // TODO Extract "organisations.length", update label
        return (
            <Container>
                <Row>
                    <Col>
                        <div style={{"margin": "1em 1em 1em 1em"}}>
                            <h4>
                                {formatNumber(props.organisations.length)}
                                &nbsp;{getString("s.publishers_found")}
                            </h4>
                            <OrganisationList values={props.organisations}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    "status": state.organisation.list.data.status,
    "organisations": state.organisation.list.data.organisations
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": (query) => {
        dispatch(fetchDataRequest(query));
    }
});

export const OrganisationListView = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganisationListViewComponent);
