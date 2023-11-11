import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {getElement, register, t} from "../viewer-api";
import translations from "./dataset-detail-applications.json";
import {useApplications} from "./applications-service";
import {configuration} from "../viewer-api";

function DatasetDetailApplications(props) {
  const {
    loading,
    failed,
    applications
  } = useApplications(props.language, props.dataset.iri);

  if (loading) {
    const Component = getElement("application.loading").element;
    return (<Component/>);
  }

  if (failed) {
    const Component = getElement("application.failed").element;
    return (<Component/>);
  }

  if (applications.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <h2>{t("dataset-detail.applicationsTitle")}</h2>
      <br/>
      {applications.map(item => (
        <div>
          <Link to={item.href} rel="nofollow noopener noreferrer"
                target="_blank">
            <h4>{item.label}</h4>
          </Link>
          <p>
            {item.description}
          </p>
        </div>
      ))}
    </React.Fragment>
  );
}

DatasetDetailApplications.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

if (configuration.applicationsUrl !== undefined
  && configuration.applicationsUrl !== "") {
  register({
    "name": "dataset-detail.applications",
    "element": DatasetDetailApplications,
    "translations": translations,
  });

}

