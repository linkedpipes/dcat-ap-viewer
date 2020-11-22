import React, {useContext} from "react";
import {Col, Container, Row} from "reactstrap";

import {
  register, getElement, useDatasetListQuery, useDatasetListApi,
  NavigationContext, usePageTitle, useLabelApi,
} from "../viewer-api";

import translations from "./dataset-list.json";

const DatasetList = () => {
  const selectLabel = useLabelApi();
  const navigation = useContext(NavigationContext);
  const [query, updateQuery] = useDatasetListQuery();

  const state = useDatasetListApi(navigation.language, query);

  usePageTitle(
    "page-title.datasets", undefined,
    selectTitleFromQuery(query, selectLabel));

  console.log("DatasetList.Render\n", query, "\n", state);

  if (state.loading) {
    const LoadingView = getElement("application.loading").element;
    return (<LoadingView/>);
  }

  if (state.failed) {
    const FailedView = getElement("application.failed").element;
    return (<FailedView/>);
  }

  const FacetFilter = getElement("app.dataset-list.facets").element;
  const Query = getElement("app.dataset-list.query").element;
  const View = selectView(query.view);
  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <FacetFilter
            query={query}
            onUpdateQuery={updateQuery}
            state={state}
          />
        </Col>
        <Col xs={12} md={9}>
          <div className="m-md-1">
            <Query
              query={query}
              onUpdateQuery={updateQuery}
            />
          </div>
          <div className="m-md-1">
            <View
              query={query}
              state={state}
              onUpdateQuery={updateQuery}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

function selectTitleFromQuery(query, selectLabel) {
  const filtersIri = [...query.publishers, ...query.themes];
  const filters = query.keywords;
  const size =  filtersIri.length + filters.length;
  if (size !== 1) {
    return undefined;
  }
  if (filtersIri.length === 1) {
    return selectLabel(filtersIri[0]);
  }
  if (filters.length === 1) {
    return filters[0];
  }
}

function selectView(view) {
  switch (view) {
  default:
  case 0:
    return getElement("app.dataset-list.view-dataset").element;
  case 1:
    return getElement("app.dataset-list.view-keyword").element;
  case 2:
    return getElement("app.dataset-list.view-theme").element;
  }
}

register({
  "url": "/datasets",
  "name": "dataset-list.view",
  "view": DatasetList,
  "navigation": {
    "cs": {
      "/datasets": "/datové-sady",
      "keywords": "klíčová-slova",
      "themes": "témata",
      "formats": "formáty",
      "page": "stránka",
      "pageSize": "velikost-stránky",
      "search": "dotaz",
      "temporalEnd": "časové-období-začátek",
      "temporalStart": "časové-období-konec",
      "view": "vizualizace",
      "sort": "pořadí",
      "publishers": "poskytovatel",
      "language": "jazyk",
      "iri": "iri",
      "isPartOf": "nadřazený-dataset",
    },
    "en": {
      "/datasets": "/datasets",
      "keywords": "keywords",
      "themes": "themes",
      "formats": "formats",
      "page": "page",
      "pageSize": "page-size",
      "search": "query",
      "temporalEnd": "temporal-end",
      "temporalStart": "temporal-start",
      "view": "visualization",
      "sort": "sort",
      "publishers": "publisher",
      "language": "language",
      "iri": "iri",
      "isPartOf": "is-part-of",
    },
  },
  "translations": translations,
});