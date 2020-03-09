import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {isLoaderActiveSelector} from "./loading-indicator-reducer";

const LoaderIndicator = ({active}) => {
  if (active) {
    return (
      <div className="indeterminate-loader fixed-top">
        <div className="progress"/>
      </div>
    )
  } else {
    return null;
  }
};

LoaderIndicator.propTypes = {
  "active": PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    "active": isLoaderActiveSelector(state),
  }),
)(LoaderIndicator);

