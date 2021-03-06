import React, {useContext, useState} from "react";
import {PropTypes} from "prop-types";
import {Button, Col, Row} from "reactstrap";

import SearchBox from "./search-box";
import ViewSelector from "./view-selector";
import TemporalFilter from "./temporal-filter";
import {t, register, fetchTypeahead, NavigationContext} from "../../viewer-api";

import translations from "./dataset-list-query.json";

function DatasetListQuery(props) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [temporalStart, setTemporalStart] = useState(props.query.temporalStart);
  const [temporalEnd, setTemporalEnd] = useState(props.query.temporalEnd);
  const navigation = useContext(NavigationContext);

  const onSetInterval = (start, end) => {
    setTemporalStart(start);
    setTemporalEnd(end);
    props.onUpdateQuery({
      "page": 0,
      "showMore": 0,
      "temporalStart": start,
      "temporalEnd": end,
    });
  };

  const onClearFilters = (searchBoxRef) => {
    searchBoxRef.clear();
    setTemporalStart("");
    setTemporalEnd("");
    props.onUpdateQuery({
      "page": 0,
      "showMore": 0,
      "search": "",
      "publishers": [],
      "themes": [],
      "keywords": [],
      "formats": [],
      "temporalStart": "",
      "temporalEnd": "",
      "isPartOf": [],
    });
  };

  const onSetSearchText = (text) => {
    props.onUpdateQuery({
      "page": 0,
      "showMore": 0,
      "search": text,
      "temporalStart": temporalStart,
      "temporalEnd": temporalEnd,
    });
  };

  const onFetchTypeahead = (text) => {
    return fetchTypeahead(navigation.language, props.query, text);
  };

  const onSetViewType = (value) => {
    props.onUpdateQuery({
      "page": 0,
      "showMore": 0,
      "view": value,
    });
  };

  let searchBox = undefined;
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
        value={props.query.search}
        ref={(ref) => searchBox = ref}
        onSetValue={onSetSearchText}
        fetchTypeahead={onFetchTypeahead}
      />
      {
        showAdvanced &&
        <TemporalFilter
          start={temporalStart}
          setStart={setTemporalStart}
          end={temporalEnd}
          setEnd={setTemporalEnd}
          setInterval={onSetInterval}
        />
      }
      <Row>
        <Col>
          <Button
            className="mt-2 me-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? t("query.hideFilters") : t("query.showFilters")}
          </Button>
          <Button
            className="mt-2"
            onClick={() => onClearFilters(searchBox)}>
            {t("query.clearFilters")}
          </Button>
        </Col>
        <Col className="mt-2">
          <div className="float-lg-end">
            <ViewSelector
              value={props.query.view}
              onChange={onSetViewType}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

register({
  "name": "app.dataset-list.query",
  "element": DatasetListQuery,
  "translations": translations,
});

DatasetListQuery.propTypes = {
  "query": PropTypes.object.isRequired,
  "onUpdateQuery": PropTypes.func.isRequired,
};
