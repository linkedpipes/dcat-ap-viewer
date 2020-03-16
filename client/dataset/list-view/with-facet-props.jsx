import {connect} from "react-redux";
import {
  selectFacet,
  selectFacetAllFetched,
  selectFacetCount,
} from "./dataset-list-reducer";

export default function withFaceProps(WrappedComponent, facetName) {
  return connect(
    (state) => ({
      "facetName": facetName,
      "facetData": selectFacet(state, facetName),
      "facetAllFetched": selectFacetAllFetched(state, facetName),
      "facetCount": selectFacetCount(state, facetName),
    }))(WrappedComponent);
}
