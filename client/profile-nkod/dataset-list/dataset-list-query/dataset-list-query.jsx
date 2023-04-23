import React, {useContext, useState} from "react";
import {PropTypes} from "prop-types";
import {Button, Col, FormGroup, Input, Label, Row} from "reactstrap";

import SearchBox from "../../../profile-lkod/dataset-list/dataset-list-query/search-box";
import ViewSelector from "../../../profile-lkod/dataset-list/dataset-list-query/view-selector";
import TemporalFilter from "../../../profile-lkod/dataset-list/dataset-list-query/temporal-filter";
import {t, register, fetchTypeahead, NavigationContext} from "../../viewer-api";
import VdfFilter from "./vdf-filter";

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
      "fileTypes": [],
      "dataServiceTypes": [],
      "temporalStart": "",
      "temporalEnd": "",
      "isPartOf": [],
      "containsService": false,
      "isVdfCodelist": false,
      "isVdfPublicData": false,
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

  const onUpdateQuery = (value) => {
    props.onUpdateQuery({
      ...value,
      "page": 0,
      "showMore": 0,
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
        <div style={{"margin": "1rem 0 1rem 0"}}>
          <TemporalFilter
            start={temporalStart}
            setStart={setTemporalStart}
            end={temporalEnd}
            setEnd={setTemporalEnd}
            setInterval={onSetInterval}
          />
          <VdfFilter
            isVdfCodelist={props.query.isVdfCodelist}
            isVdfPublicData={props.query.isVdfPublicData}
            onUpdateQuery={onUpdateQuery}
          />
        </div>
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
          <ViewSelector
            value={props.query.view}
            onChange={onSetViewType}
            className="float-lg-end"
          />
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
