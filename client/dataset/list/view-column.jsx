import React from "react";
import {isDataReady} from "../../app-services/http-request";
import {Col} from "reactstrap";
import QueryInput from "./ui/query-input";
import {HttpRequestStatus} from "../../app-ui/http-request-status";
import QueryStatus from "./ui/query-status";
import DatasetList from "./view/dataset-list";

export default class ViewColumn extends React.Component {
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

