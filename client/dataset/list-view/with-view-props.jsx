import {connect} from "react-redux";
import {
  selectFacet,
  selectDatasets,
  selectDatasetsCount,
  selectFacetCount,
  selectFacetAllFetched,
} from "./dataset-list-reducer";

export default function withViewProps(WrappedComponent) {
  return connect((state) => ({
    "datasets": selectDatasets(state),
    "datasetsCount": selectDatasetsCount(state),
    "publishers": selectFacet(state, "publisher"),
    "publishersCount": selectFacetCount(state, "publisher"),
    "publishersAllFetched": selectFacetAllFetched(state, "publisher"),
    "themes": selectFacet(state, "theme"),
    "themesCount": selectFacetCount(state, "theme"),
    "themesAllFetched": selectFacetAllFetched(state, "theme"),
    "keywords": selectFacet(state, "keyword"),
    "keywordsCount": selectFacetCount(state, "keyword"),
    "keywordsAllFetched": selectFacetAllFetched(state, "keyword"),
    "formats": selectFacet(state, "format"),
    "formatsCount": selectFacetCount(state, "format"),
    "formatsAllFetched": selectFacetAllFetched(state, "format"),
  }))(WrappedComponent);
}
