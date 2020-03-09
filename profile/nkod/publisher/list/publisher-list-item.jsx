import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import {formatNumber} from "../../utils";

export default function PublisherListItem(
  {publisher, isExceptional, t, tUrl, tLabel, fetchLabels}) {
  //
  fetchLabels([publisher.iri]);
  return (
    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
      <div className="card p-2">
        <div className="card-body px-2">
          <h5 className="card-title">
            <Link to={tUrl("/datasets", {"publisher": publisher.iri})}>
              <h4>{tLabel(publisher.iri)}</h4>
            </Link>
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {getDatasetCountLabel(publisher.datasetCount, t)}
          </li>
          {isExceptional &&
          <li className="list-group-item">
            <i
              className="material-icons"
              style={{"verticalAlign": "bottom", "color": "#F9BC38"}}
            >
              star
            </i>&nbsp;<span>{t("exceptional_publisher")}</span>
          </li>
          }
        </ul>
      </div>
    </div>
  );
}

function getDatasetCountLabel(count, t) {
  if (count === undefined || count === null) {
    return "";
  } else if (count === 1) {
    return t("one_dataset");
  } else if (count <= 4) {
    return count + t("two_three_datasets");
  } else {
    return formatNumber(count) + t("many_datasets");
  }
}

PublisherListItem.propTypes = {
  "publisher": PropTypes.object.isRequired,
  "isExceptional": PropTypes.bool,
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};
