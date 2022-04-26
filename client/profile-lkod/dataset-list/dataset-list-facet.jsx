import React, {useCallback} from "react";
import {PropTypes} from "prop-types";

import {register, getElement, useLabelApi} from "../viewer-api";

function DatasetListFilters(props) {
  const Facet = getElement("app.dataset-list.facets.element").element;
  const callbacks = useCallbacks(props.onUpdateQuery, props.query, props.state);
  const selectLabel = useLabelApi();
  return (
    <React.Fragment>
      {props.query.isPartOf.length > 0 &&
      <Facet
        label={"isPartOfFacet"}
        facetData={props.state.isPartOf}
        activeFacets={props.query.isPartOf}
        facetCount={props.query.isPartOf.length}
        datasetsCount={props.state.datasetsCount}
        onFacetClick={callbacks.onClickIsPartOf}
        selectFacetLabel={
          (item) => selectLabel(item.queryCode, undefined, "Dataset")
        }
        hydeCount={true}
      />
      }
      <Facet
        label={"facet.themes"}
        facetData={props.state.themes}
        activeFacets={props.query.themes}
        facetCount={props.state.themesCount}
        datasetsCount={props.state.datasetsCount}
        onFacetClick={callbacks.onClickThemes}
        onFetchMore={callbacks.onFetchThemes}
        selectFacetLabel={(item) => selectLabel(item.queryCode)}
      />
      <Facet
        label={"facet.keywords"}
        facetData={props.state.keywords}
        activeFacets={props.query.keywords}
        facetCount={props.state.keywordsCount}
        datasetsCount={props.state.datasetsCount}
        onFacetClick={callbacks.onClickKeywords}
        onFetchMore={callbacks.onFetchKeywords}
        selectFacetLabel={(item) => item.queryCode}
      />
      <Facet
        label={"facet.formats"}
        facetData={props.state.formats}
        activeFacets={props.query.formats}
        facetCount={props.state.formatsCount}
        datasetsCount={props.state.datasetsCount}
        onFacetClick={callbacks.onClickFormats}
        onFetchMore={callbacks.onFetchFormats}
        selectFacetLabel={(item) => selectLabel(item.queryCode)}
      />
    </React.Fragment>
  );
}

DatasetListFilters.propTypes = {
  "query": PropTypes.shape({
    "isPartOf": PropTypes.arrayOf(PropTypes.string).isRequired,
    "publishers": PropTypes.arrayOf(PropTypes.string).isRequired,
    "themes": PropTypes.arrayOf(PropTypes.string).isRequired,
    "keywords": PropTypes.arrayOf(PropTypes.string).isRequired,
    "formats": PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  "state": PropTypes.shape({
    "isPartOf": PropTypes.arrayOf(PropTypes.shape({
      "title": PropTypes.object,
      "queryCode": PropTypes.string.isRequired,
      "count": PropTypes.number,
    })).isRequired,
    "themes": PropTypes.arrayOf(PropTypes.shape({
      "title": PropTypes.object,
      "queryCode": PropTypes.string.isRequired,
      "count": PropTypes.number,
    })).isRequired,
    "themesCount": PropTypes.number.isRequired,
    "keywords": PropTypes.arrayOf(PropTypes.shape({
      "title": PropTypes.object,
      "queryCode": PropTypes.string.isRequired,
      "count": PropTypes.number,
    })).isRequired,
    "keywordsCount": PropTypes.number.isRequired,
    "formats": PropTypes.arrayOf(PropTypes.shape({
      "title": PropTypes.object,
      "queryCode": PropTypes.string.isRequired,
      "count": PropTypes.number,
    })).isRequired,
    "formatsCount": PropTypes.number.isRequired,
    "datasetsCount":  PropTypes.number.isRequired,
  }).isRequired,
  "onUpdateQuery": PropTypes.func.isRequired,
};

function useCallbacks(onUpdateQuery, query, state) {

  const onClickIsPartOf = useCallback((value) => {
    onUpdateQuery({
      "isPartOf": toggleInArray(query.isPartOf, value),
    });
  }, [onUpdateQuery, query]);

  const onFetchThemes = useCallback((count) => {
    onUpdateQuery({
      "themesLimit": Math.min(
        query.themesLimit + count,
        state.themesCount,
      ),
    });
  }, [onUpdateQuery, query.themesLimit, state.themesCount]);

  const onClickThemes = useCallback((value) => {
    onUpdateQuery({
      "themes": toggleInArray(query.themes, value),
      "page": 0,
    });
  }, [onUpdateQuery, query]);

  const onFetchKeywords = useCallback((count) => {
    onUpdateQuery({
      "keywordsLimit": Math.min(
        query.keywordsLimit + count,
        state.keywordsCount,
      ),
    });
  }, [onUpdateQuery, query.keywordsLimit, state.keywordsCount]);

  const onClickKeywords = useCallback((value) => {
    onUpdateQuery({
      "keywords": toggleInArray(query.keywords, value),
      "page": 0,
    });
  }, [onUpdateQuery, query.keywords]);

  const onFetchFormats = useCallback((count) => {
    onUpdateQuery({
      "formatsLimit": Math.min(
        query.formatsLimit + count,
        state.formatsCount,
      ),
    });
  }, [onUpdateQuery, query.formatsLimit, state.formatsCount]);

  const onClickFormats = useCallback((value) => {
    onUpdateQuery({
      "formats": toggleInArray(query.formats, value),
      "page": 0,
    });
  }, [onUpdateQuery, query.formats]);

  return {
    "onClickIsPartOf": onClickIsPartOf,
    "onFetchThemes": onFetchThemes,
    "onClickThemes": onClickThemes,
    "onFetchKeywords": onFetchKeywords,
    "onClickKeywords": onClickKeywords,
    "onFetchFormats": onFetchFormats,
    "onClickFormats": onClickFormats,
  };

}

function toggleInArray(array, value) {
  const index = array.indexOf(value);
  if (index === -1) {
    return [...array, value];
  } else {
    return [
      ...array.slice(0, index),
      ...array.slice(index + 1),
    ];
  }
}

register({
  "name": "app.dataset-list.facets",
  "element": DatasetListFilters,
});
