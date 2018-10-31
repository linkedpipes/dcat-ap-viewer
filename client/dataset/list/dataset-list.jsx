import React from "react";
import {connect} from "react-redux";
import {querySelector, dataStatusSelector} from "./dataset-list-reducer"
import {getString} from "@/app-services/strings";
import FacetsColumn from "./facets-column";
import ViewColumn from "./view-column";
import {Container, Row} from "reactstrap";
import {fetchData} from "./dataset-list-actions";
import {DATASET_LIST_URL} from "@/app/navigation";
import HeadLinks from "@/app-ui/head-links";

class DatasetListViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.getPageTitle = this.getPageTitle.bind(this);
    }

    componentDidMount() {
        this.props.fetchData(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.query !== this.props.query) {
            this.props.fetchData(nextProps.query);
        }
    }

    render() {
        return (
            <Container>
                <HeadLinks title={this.getPageTitle()}
                           url={DATASET_LIST_URL}/>
                <Row>
                    <FacetsColumn location={this.props.location}/>
                    <ViewColumn location={this.props.location}
                                status={this.props.status}
                                view={this.props.query.datasetListView}/>
                </Row>
            </Container>
        )
    }

    getPageTitle() {
      if (this.props.query.publisher.length !== 0) {
          return this.props.query.publisher[0];
      } else {
          return getString("datasets");
      }
  }

}

const mapStateToProps = (state, ownProps) => ({
    "query": querySelector(state),
    "status": dataStatusSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": (query) => dispatch(fetchData(query))
});

export const DatasetList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatasetListViewComponent);
