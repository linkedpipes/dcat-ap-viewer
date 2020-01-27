import React from "react";
import {isDataReady} from "../../app-services/http-request";
import {Col} from "reactstrap";
import QueryInput from "./ui/query-input";
import {HttpRequestStatus} from "../../app-ui/http-request-status";
import DatasetList from "./view/dataset-list";
import {PropTypes} from "prop-types";
import ThemeCloud from "./view/theme-cloud";
import KeywordCloud from "./view/keyword-cloud";

export default class ViewColumn extends React.Component {

  render() {
    let view;
    if (isDataReady(this.props.status)) {

      if (this.props.view === 1) {
        view = (
          <KeywordCloud location={this.props.location}/>
        );
      } else if (this.props.view === 2) {
        view = (
          <ThemeCloud location={this.props.location}/>
        );
      } else {
        view = (
          <DatasetList location={this.props.location}/>
        );
      }
    } else {
      view = (
        <HttpRequestStatus status={this.props.status}/>
      );
    }
    return (
      <Col xs={12} md={9}>
        <div className="m-md-1">
          <QueryInput location={this.props.location}/>
        </div>
        {view}
      </Col>
    )
  }

}

ViewColumn.propTypes = {
  "status": PropTypes.string,
  "location": PropTypes.object.isRequired,
  "view": PropTypes.number.isRequired,
};
