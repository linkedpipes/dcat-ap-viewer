import React, {useState} from "react";
import {useSelector} from "react-redux";
import {PropTypes} from "prop-types";
import {Button, Col, Input, Row} from "reactstrap";
import {
  register,
  selectT,
  selectLanguage,
} from "../../client-api";
import ViewSelector from "./ui/view-selector";
import SearchBox from "./ui/search-box";
import {
  createDefaultQuery,
  toDatasetListQuery,
} from "./dataset-list-query-service";
import {fetchDatasetTypeahead} from "../../../client/dataset-list";

function datasetListQuery(props) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [temporalStart, setTemporalStart] = useState(props.query.temporalStart);
  const [temporalEnd, setTemporalEnd] = useState(props.query.temporalEnd);
  const t = useSelector(selectT);
  const service = useDatasetListQueryService(
    props.onUpdateNavigation, props.query);
  //
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
        defaultValue={props.query.search}
        ref={(ref) => searchBox = ref}
        onSetValue={service.onSetSearchText}
        fetchTypeahead={service.onFetchTypeahead}
      />
      {
        showAdvanced &&
        <TemporalFilters
          t={t}
          start={temporalStart}
          setStart={setTemporalStart}
          end={temporalEnd}
          setEnd={setTemporalEnd}
          setTemporal={service.onSetTemporal}
        />
      }
      <Row>
        <Col>
          <Button
            className="mt-2 mr-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ?
              t("query.hideFilters")
              : t("query.showFilters")}
          </Button>
          <Button
            className="mt-2"
            onClick={() => service.onClearFilters(searchBox)}>
            {t("query.clearFilters")}
          </Button>
        </Col>
        <Col className="mt-2">
          <div className="float-lg-right">
            <ViewSelector
              t={t}
              value={props.query.view}
              onChange={service.onSetView}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

register({
  "name": "app.dataset-list.query",
  "element": datasetListQuery,
});

datasetListQuery.propTypes = {
  "query": PropTypes.object.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
};

function useDatasetListQueryService(onUpdateNavigation, query) {
  const language = useSelector(selectLanguage);
  return {
    "onSetView": (view) => {
      onUpdateNavigation({...query, "view": view});
    },
    "onSetSearchText": (text) => {
      onUpdateNavigation({...query, "search": text});
    },
    "onClearFilters": (searchBox) => {
      searchBox.clear();
      onUpdateNavigation(createDefaultQuery());
    },
    "onSetTemporal": (start, end) => {
      onUpdateNavigation({
        ...query,
        "temporalStart": start,
        "temporalEnd": end,
        "showMore": 0,
        "page": 0,
      });
    },
    "onFetchTypeahead": (text) => {
      const datasetQuery = toDatasetListQuery(query);
      return fetchDatasetTypeahead(datasetQuery, language, text);
    },
  };
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
          {t("query.thisYear")}
        </Button>
        <Button onClick={onLastYear}>
          {t("query.lastYear")}
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
