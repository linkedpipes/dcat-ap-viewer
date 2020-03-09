import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {selectShowLoadingIndicator} from "./app-reducer";

function LoaderIndicator({active}) {
  // TODO Check CSS.
  if (!active) {
    return null;
  }
  return (
    <div className="indeterminate-loader fixed-top">
      <div className="progress"/>
    </div>
  )
}

LoaderIndicator.propTypes = {
  "active": PropTypes.bool.isRequired,
};

export default connect((state) => ({
  "active": selectShowLoadingIndicator(state),
}))(LoaderIndicator)
