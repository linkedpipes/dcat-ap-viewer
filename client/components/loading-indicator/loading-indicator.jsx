import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {isLoaderActiveSelector} from "./loading-indicator-reducer";

const IndeterminateLoader = ({active}) => (
    <div className="indeterminate-loader">
        {active &&
        <div className="progress"></div>
        }
    </div>
);

export const LoaderIndicator = connect(
    (state, ownProps) => ({
        "active": isLoaderActiveSelector(state)
    }),
    (dispatch, ownProps) => ({})
)(IndeterminateLoader);
