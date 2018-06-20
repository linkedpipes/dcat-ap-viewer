import React from "react";
import {isDataReady} from "../../app-services/http-request";
import {Col} from "reactstrap";
import QueryInput from "./query-input";
import {HttpRequestStatus} from "../../app/http-request-status";
import QueryStatus from "./query-status";
import DatasetList from "./dataset-list";

export default class DatasetColumn extends React.Component {
    render() {
        let datasetComponent;
        if (isDataReady(this.props.status)) {
            datasetComponent = (
                <DatasetList location={this.props.location}/>
            );
        } else {
            datasetComponent = (
                <HttpRequestStatus status={this.props.status}/>
            );
        }
        return (
            <Col xs={12} md={9}>
                <div className="m-md-1">
                    <QueryInput location={this.props.location}/>
                </div>
                <div className="m-md-1">
                    <QueryStatus/>
                </div>
                {datasetComponent}
            </Col>
        )
    }
}

