import React from "react";

import {register} from "../viewer-api";

import "./loading-indicator.css";

export function Indicator() {
  return (
    <div className="indeterminate-loader fixed-top">
      <div className="progress"/>
    </div>
  );
}

register({
  "name": "loading-indicator.element",
  "element": Indicator,
});
