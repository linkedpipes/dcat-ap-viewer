import React, {useState} from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import SearchBox from "../../user-iterface/search-box";
import {Button, Col, Input, Row} from "reactstrap";
import ViewSelector from "./view-selector";
import {selectT} from "../../../client-api";

function QueryElement(props) {
  let searchBox = undefined;
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [temporalStart, setTemporalStart] = useState(props.query.temporalStart);
  const [temporalEnd, setTemporalEnd] = useState(props.query.temporalEnd);

  const onClearAllFilters = () => {
    searchBox.clear();
    props.onClearFilters();
  };

  return (
    <div style={{
      "borderStyle": "solid",
      "borderWidth": "1px",
      "borderColor": "#E0E0E0",
      "padding": "0.5rem",
      "marginBottom": "1rem",
    }}>
      <SearchBox
        t={props.t}
        defaultValue={props.query.search}
        ref={(ref) => searchBox = ref}
        onSetValue={props.onSetSearchText}
        fetchTypeahead={props.fetchTypeahead}
      />
      {
        showAdvanced &&
        <TemporalFilters
          t={props.t}
          start={temporalStart}
          setStart={setTemporalStart}
          end={temporalEnd}
          setEnd={setTemporalEnd}
          setTemporal={props.onSetTemporal}
        />
      }
      <Row>
        <Col>
          <Button
            className="mt-2 mr-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ?
              props.t("query.hide_filters")
              : props.t("query.show_filters")}
          </Button>
          <Button
            className="mt-2"
            onClick={onClearAllFilters}
          >
            {props.t("query.clear_filters")}
          </Button>
        </Col>
        <Col className="mt-2">
          <div className="float-lg-right">
            <ViewSelector
              t={props.t}
              value={props.query.view}
              onChange={props.onSetView}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

QueryElement.propTypes = {
  "t": PropTypes.func.isRequired,
  "query": PropTypes.object.isRequired,
  "onSetView": PropTypes.func.isRequired,
  "onSetSearchText": PropTypes.func.isRequired,
  "onClearFilters": PropTypes.func.isRequired,
  "onSetTemporal": PropTypes.func.isRequired,
  // From with-typeahead-props.jsx
  "fetchTypeahead": PropTypes.func.isRequired,
};

export default connect((state) => ({
  "t": selectT(state),
}))(QueryElement);

function TemporalFilters({t, start, setStart, end, setEnd, setTemporal}) {

  const onThisYear = () => {
    const year = (new Date()).getFullYear();
    setTemporal(year + "-01-01", year + "-12-31");
  };

  const onLastYear = () => {
    const year = (new Date()).getFullYear() - 1;
    setTemporal(year + "-01-01", year + "-12-31");
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
          onChange={(event) => setStart(event.value)}
          value={start}
          style={{"width": "11rem"}}
        />
        <span style={styleMarginLR}> {t("query.to")} </span>
        <Input
          id="temporal-end"
          type="date"
          onChange={(event) => setEnd(event.value)}
          value={end}
          style={{
            "width": "11rem",
            "marginRight": "0.5rem",
          }}/>
        <Button style={styleMarginR} onClick={onThisYear}>
          {t("query.this_year")}
        </Button>
        <Button onClick={onLastYear}>
          {t("query.last_year")}
        </Button>
      </Row>
    </div>
  );
}

TemporalFilters.propTypes = {
  "t": PropTypes.func.isRequired,
  "start": PropTypes.string,
  "setStart": PropTypes.func.isRequired,
  "end": PropTypes.string,
  "setEnd": PropTypes.func.isRequired,
  "setTemporal": PropTypes.func.isRequired,
};
