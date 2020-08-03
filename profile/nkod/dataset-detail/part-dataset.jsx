import React from "react";
import {PropTypes} from "prop-types";

const Dataset = (props) => {
  const {dataset, quality, tLabel} = props;
  console.log("dataset", dataset, quality);
  const title = tLabel(dataset.iri, null);
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
      <div className="card p-2">
        <div className="card-body px-2">
          {title !== null &&
          <h5 className="card-title">
            {title}
          </h5>
          }
          Dataset
        </div>
        <div className="row">
          <div className="col-6 pr-1">

          </div>
          <div className="col-6 pl-1">

          </div>
        </div>
      </div>
    </div>
  );
};

Dataset.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "quality": PropTypes.object.isRequired,
  //
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
};

export default Dataset;
