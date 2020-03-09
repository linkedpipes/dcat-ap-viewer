import React, {useState} from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import SearchBox from "../../user-iterface/search-box";
import {Button, Col, Input, Row} from "reactstrap";
import ViewSelector from "./view-selector";
import {
  selectT,
  QUERY_DATASET_LIST_VIEW,
  QUERY_DATASET_LIST_SEARCH,
  QUERY_DATASET_LIST_TEMPORAL_START,
  QUERY_DATASET_LIST_TEMPORAL_END,
} from "../../../client-api";

function QueryElement(
  {t, query, onSearch, onSetView, onFetchTypeahead}) {
  //
  let searchBox = undefined;
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [temporalStart, setTemporalStart] = useState(
    query[QUERY_DATASET_LIST_TEMPORAL_START] ?
      query[QUERY_DATASET_LIST_TEMPORAL_START][0] : undefined,
  );
  const [temporalEnd, setTemporalEnd] = useState(
    query[QUERY_DATASET_LIST_TEMPORAL_END] ?
      query[QUERY_DATASET_LIST_TEMPORAL_END][0] : undefined,
  );

  const onClearAllFilters = () => {
    searchBox.clear();
    // Search with empty query removing all filters (even facets).
    onSearch({});
  };

  const onSetTemporal = (start, end) => {
    onSearch({
      ...query,
      [QUERY_DATASET_LIST_TEMPORAL_START]: start,
      [QUERY_DATASET_LIST_TEMPORAL_END]: end,
    });
  };

  const onSetSearch = (value) => {
    if (value === "") {
      value = undefined;
    }
    onSearch({
      ...query,
      [QUERY_DATASET_LIST_SEARCH]: value,
    });
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
        t={t}
        defaultValue={getSearchString(query)}
        ref={(ref) => searchBox = ref}
        onSetValue={onSetSearch}
        onFetchTypeahead={onFetchTypeahead}
      />
      {
        showAdvanced &&
        <TemporalFilters
          t={t}
          start={temporalStart}
          setStart={setTemporalStart}
          end={temporalEnd}
          setEnd={setTemporalEnd}
          setTemporal={onSetTemporal}
        />
      }
      <Row>
        <Col>
          <Button
            className="mt-2 mr-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? t("query.hide_filters") : t("query.show_filters")}
          </Button>
          <Button
            className="mt-2"
            onClick={onClearAllFilters}
          >
            {t("query.clear_filters")}
          </Button>
        </Col>
        <Col className="mt-2">
          <div className="float-lg-right">
            <ViewSelector
              t={t}
              value={getActiveView(query)}
              onChange={onSetView}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

QueryElement.propTypes = {
  "t": PropTypes.func.isRequired,
  "query": PropTypes.object.isRequired,
  "onSearch": PropTypes.func.isRequired,
  "onSetView": PropTypes.func.isRequired,
  "onFetchTypeahead": PropTypes.func.isRequired,
};

export default connect((state) => ({
  "t": selectT(state),
}))(QueryElement);

function getActiveView(query) {
  return query[QUERY_DATASET_LIST_VIEW] ?
    parseInt(query[QUERY_DATASET_LIST_VIEW][0]) : 0;
}

function getSearchString(query) {
  return query[QUERY_DATASET_LIST_SEARCH] ?
    query[QUERY_DATASET_LIST_SEARCH][0] : "";
}

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
