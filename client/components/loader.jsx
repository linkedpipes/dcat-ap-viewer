import React from "react";
import {PropTypes} from "prop-types";

export const IndeterminateLoader = ({active}) => {
    return (
        <div className="indeterminate-loader">
            {active &&
            <div className="progress"></div>
            }
        </div>
    );
};

IndeterminateLoader.propTypes = {
    "active": PropTypes.bool.isRequired
};
