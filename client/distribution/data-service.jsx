import React from "react";
import {getString} from "../../../app-services/strings";
import {selectLabelNoIri} from "../../../app-services/labels/index";
import {selectLabel} from "../../../app-services/labels";
import authorship from "./terms-of-use/authorship";
import databaseAuthorship from "./terms-of-use/database-authorship";
import protectedDatabaseAuthorship
  from "./terms-of-use/protected-database-authorship";
import personalData from "./terms-of-use/personal-data";
import schemaListItem from "./access/schema-list-item";
import mediaTypeItem from "./access/media-type-item";
import compressFormat from "./access/compress-format-item";
import packageFormat from "./access/package-format-item";
import endpointDescription from "./access/endpoint-description-item";
import endpointUrl from "./access/endpoint-url-item";

import {PropTypes} from "prop-types";

export default class DataService extends React.PureComponent {
  render() {
    const {labels, distribution, openModal} = this.props;

    const title = selectLabelNoIri(labels, distribution);

    return (
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
        <div className="card p-2">
          <div className="card-body px-2">
            {title === undefined ?
              <span className="sr-only">
                {getString("unnamed_distribution")}
              </span>
              :
              <h5 className="card-title">
                {title}
              </h5>
            }
            {dataFormatItem(labels, distribution)}
          </div>
          <div className="row">
            <div className="col-6 pr-1">
              {licenseColumn(distribution, openModal)}
            </div>
            <div className="col-6 pl-1">
              {accessColumn(labels, distribution, openModal)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DataService.propTypes = {
  "labels": PropTypes.object.isRequired,
  "distribution": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
};

function dataFormatItem(labels, distribution) {
  const label = selectLabel(labels, distribution.format);
  if (label === undefined) {
    return (
      <h6 className="card-subtitle mb-2 text-muted">
        {getString("data_service")}
      </h6>
    );
  }
  return (
    <h6 className="card-subtitle mb-2 text-muted">
      {getString("data_service")} {label}
    </h6>
  )
}

function licenseColumn(distribution, openModal) {
  return (
    <div className="card">
      <h6 className="card-title text-muted pl-2 pt-2">
        {getString("distribution_license")}
      </h6>
      <ul className="list-group list-group-flush">
        {authorship(distribution, openModal)}
        {databaseAuthorship(distribution, openModal)}
        {protectedDatabaseAuthorship(distribution, openModal)}
        {personalData(distribution, openModal)}
      </ul>
    </div>
  )
}

function accessColumn(labels, distribution, openModal) {
  return (
    <div className="card">
      <h6 className="card-title text-muted pl-2 pt-2">
        {getString("distribution_access")}
      </h6>
      <ul className="list-group list-group-flush">
        {endpointDescription(labels, distribution)}
        {endpointUrl(labels, distribution)}
        {schemaListItem(distribution, openModal)}
        {mediaTypeItem(labels, distribution, openModal)}
        {compressFormat(labels, distribution)}
        {packageFormat(labels, distribution)}
      </ul>
    </div>
  );
}
