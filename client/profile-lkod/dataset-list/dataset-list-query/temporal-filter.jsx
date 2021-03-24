import {Button, Input} from "reactstrap";
import {PropTypes} from "prop-types";
import React from "react";

import {t} from "../../viewer-api";
import "./temporal-filter.css";

export default function TemporalFilter(props) {

  const onThisYear = () => {
    const year = (new Date()).getFullYear();
    props.setInterval(year + "-01-01", year + "-12-31");
  };

  const onLastYear = () => {
    const year = (new Date()).getFullYear() - 1;
    props.setInterval(year + "-01-01", year + "-12-31");
  };
  return (
    <div className="temporal-filter">
      {t("query.temporal")}&nbsp;
      <label htmlFor="temporal-start"> {t("query.from")} </label> &nbsp;
      <Input
        id="temporal-start"
        type="date"
        onChange={(event) => props.setStart(event.value)}
        value={props.start}
        style={{"width": "11rem"}}
      /> &nbsp;
      <label htmlFor="temporal-end"> {t("query.to")} </label> &nbsp;
      <Input
        id="temporal-end"
        type="date"
        onChange={(event) => props.setEnd(event.value)}
        value={props.end}
        style={{
          "width": "11rem",
          "marginRight": "0.5rem",
        }}/> &nbsp;
      <Button onClick={onThisYear}>
        {t("query.thisYear")}
      </Button> &nbsp;
      <Button onClick={onLastYear}>
        {t("query.lastYear")}
      </Button>
    </div>
  );
}

TemporalFilter.propTypes = {
  "start": PropTypes.string,
  "setStart": PropTypes.func.isRequired,
  "end": PropTypes.string,
  "setEnd": PropTypes.func.isRequired,
  "setInterval": PropTypes.func.isRequired,
};
