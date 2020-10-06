import React from "react";
import {PropTypes} from "prop-types";
import {getRegisteredElement, register, Status} from "../../client-api";
import {STATUS_FAILED, STATUS_LOADING} from "../nkod-component-names";

function PartSystem({part}) {
  const LoadingView = getRegisteredElement(STATUS_LOADING);
  const FailedView = getRegisteredElement(STATUS_FAILED);
  switch (part.resourceStatus) {
  case Status.Undefined:
  case Status.Loading:
    return (
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
        <LoadingView/>
      </div>
    );
  case Status.Failed:
    return (
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
        <FailedView/>
      </div>
    );
  default:
    return null;
  }
}

PartSystem.propTypes = {
  "part": PropTypes.object.isRequired,
  "t": PropTypes.func.isRequired,
};

register({
  "name": "nkod.dataset-detail.system-part",
  "element": PartSystem,
});
