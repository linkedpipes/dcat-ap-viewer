import {Button, Input, Row} from "reactstrap";
import {PropTypes} from "prop-types";
import React from "react";

import {t} from "../../viewer-api";

export default function TemporalFilter(props) {

  const onThisYear = () => {
    const year = (new Date()).getFullYear();
    props.setInterval(year + "-01-01", year + "-12-31");
  };

  const onLastYear = () => {
    const year = (new Date()).getFullYear() - 1;
    props.setInterval(year + "-01-01", year + "-12-31");
  };

  const styleMarginR = {"marginRight": "0.5rem"};
  const styleMarginLR = {"marginLeft": "0.5rem", "marginRight": "0.5rem"};
  return (
    <div style={{"margin": "1rem 1rem 0rem 2rem"}}>
      <Row style={{"lineHeight": "2.5rem"}}>
        <span style={styleMarginR}> {t("query.temporal")} </span>
        <span style={styleMarginR}> {t("query.from")} </span>
        <Input
          id="temporal-start"
          type="date"
          onChange={(event) => props.setStart(event.value)}
          value={props.start}
          style={{"width": "11rem"}}
        />
        <span style={styleMarginLR}> {t("query.to")} </span>
        <Input
          id="temporal-end"
          type="date"
          onChange={(event) => props.setEnd(event.value)}
          value={props.end}
          style={{
            "width": "11rem",
            "marginRight": "0.5rem",
          }}/>
        <Button style={styleMarginR} onClick={onThisYear}>
          {t("query.thisYear")}
        </Button>
        <Button onClick={onLastYear}>
          {t("query.lastYear")}
        </Button>
      </Row>
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
