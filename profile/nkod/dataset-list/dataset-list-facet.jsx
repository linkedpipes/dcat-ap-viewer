import React, {useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {PropTypes} from "prop-types";
import {
  register,
  selectTLabel,
  getRegisteredElement,
} from "../../client-api";
import {
  selectThemesFacet,
  selectKeywordsFacet,
  selectFormatsFacet,
  selectPublishersFacet,
  toggleFacet,
} from "../../../client/dataset-list";

function datasetListFilters(props) {
  const tLabel = useSelector(selectTLabel);
  const publishers = useSelector(selectPublishersFacet);
  const themes = useSelector(selectThemesFacet);
  const keywords = useSelector(selectKeywordsFacet);
  const formats = useSelector(selectFormatsFacet);
  const isPartOf = queryToIsPartOfFacet(props.query);
  const dispatch = useDispatch();
  const Facet = getRegisteredElement("app.dataset-list.facets.element");
  //
  const onClickIsPartOf = useCallback((value) => {
    const nextQuery = toggleFacet(props.query, "isPartOf", value);
    props.onUpdateViewQuery(nextQuery);
  }, [props.query]);
  const [onFetchPublishers, onClickPublishers] =
    createDatasetCallback(dispatch, props, "publisher");
  const [onFetchThemes, onClickThemes] =
    createDatasetCallback(dispatch, props, "theme");
  const [onFetchKeywords, onClickKeywords] =
    createDatasetCallback(dispatch, props, "keyword");
  const [onFetchFormats, onClickFormats] =
    createDatasetCallback(dispatch, props, "format");
  return (
    <div>
      {isPartOf.count > 0 &&
      <Facet
        label={"isPartOfFacet"}
        facetData={isPartOf.facets}
        activeFacets={props.query.isPartOf}
        facetCount={isPartOf.count}
        onFacetClick={onClickIsPartOf}
        selectFacetLabel={(item) => tLabel(item.code)}
        hydeCount={true}
      />
      }
      <Facet
        label={"facet.publishers"}
        facetData={publishers.facets}
        activeFacets={props.query.publisher}
        facetCount={publishers.count}
        onFacetClick={onClickPublishers}
        onFetchMore={onFetchPublishers}
        selectFacetLabel={(item) => tLabel(item.iri)}
      />
      <Facet
        label={"facet.themes"}
        facetData={themes.facets}
        activeFacets={props.query.theme}
        facetCount={themes.count}
        onFacetClick={onClickThemes}
        onFetchMore={onFetchThemes}
        selectFacetLabel={(item) => tLabel(item.iri)}
      />
      <Facet
        label={"facet.keywords"}
        facetData={keywords.facets}
        activeFacets={props.query.keyword}
        facetCount={keywords.count}
        onFacetClick={onClickKeywords}
        onFetchMore={onFetchKeywords}
        selectFacetLabel={(item) => item.code}
      />
      <Facet
        label={"facet.formats"}
        facetData={formats.facets}
        activeFacets={props.query.format}
        facetCount={formats.count}
        onFacetClick={onClickFormats}
        onFetchMore={onFetchFormats}
        selectFacetLabel={(item) => tLabel(item.iri)}
      />
    </div>
  );
}

datasetListFilters.propTypes = {
  "query": PropTypes.object.isRequired,
  "state": PropTypes.object.isRequired,
  "onUpdateViewQuery": PropTypes.func.isRequired,
  "onUpdateViewState": PropTypes.func.isRequired,
};

function createDatasetCallback(dispatch, props, name) {
  const onFetchMore = useCallback((count) => {
    const nextState = {...props.state};
    nextState[name + "Limit"] = count;
    props.onUpdateViewState(nextState);
  }, [props.state, name]);
  const onClickFacet = useCallback((value) => {
    const nextQuery = toggleFacet(props.query, name, value);
    props.onUpdateViewQuery(nextQuery);
  }, [props.query, name]);
  return [onFetchMore, onClickFacet];
}

function queryToIsPartOfFacet(query) {
  return {
    "facets": query.isPartOf.map((iri) => ({
      "code": iri,
    })),
    "count": query.isPartOf.length,
  };
}

register({
  "name": "app.dataset-list.facets",
  "element": datasetListFilters,
});
