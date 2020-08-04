import React from "react";
import {
  QUERY_DATASET_IS_PART_OF,
  QUERY_DATASET_LIST_FORMAT,
  QUERY_DATASET_LIST_KEYWORD,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_THEME,
  register,
} from "../../../client-api";
import {getRegisteredElement} from "../../../../client/app/register";
import {
  DATASET_LIST_FACET_FILTER,
  DATASET_LIST_FACET_FILTERS,
} from "../../nkod-component-names";
import {Button} from "reactstrap";
import {PropTypes} from "prop-types";
import FacetIsPartOf from "./facet-is-part-of";

class Facets extends React.PureComponent {

  constructor(props) {
    super(props);
    this.publisherFetchMore = this.publisherFetchMore.bind(this);
    this.togglePublisherFacet = this.togglePublisherFacet.bind(this);
    this.themeFetchMore = this.themeFetchMore.bind(this);
    this.toggleThemeFacet = this.toggleThemeFacet.bind(this);
    this.keywordFetchMore = this.keywordFetchMore.bind(this);
    this.toggleKeywordFacet = this.toggleKeywordFacet.bind(this);
    this.formatFetchMore = this.formatFetchMore.bind(this);
    this.toggleFormatFacet = this.toggleFormatFacet.bind(this);
    this.toggleIsPartOfFacet = this.toggleIsPartOfFacet.bind(this);
    //
    this.state = {
      "facetsOpen": true,
      // Used to delay initial render after componentDidMount method.
      "initialised": false,
    };
    //
    this.PublisherFacet = null;
  }

  componentDidMount() {
    const {withFacetProps} = this.props;
    // Create functions - so they do not change between renders.
    this.FacetFilter = getRegisteredElement(DATASET_LIST_FACET_FILTER);
    this.PublisherFacet = withFacetProps(
      this.FacetFilter, QUERY_DATASET_LIST_PUBLISHER);
    this.ThemeFacet = withFacetProps(
      this.FacetFilter, QUERY_DATASET_LIST_THEME);
    this.KeywordFacet = withFacetProps(
      this.FacetFilter, QUERY_DATASET_LIST_KEYWORD);
    this.FormatFacet = withFacetProps(
      this.FacetFilter, QUERY_DATASET_LIST_FORMAT);
    this.setState({"initialised": true});
  }

  render() {
    if (!this.state.initialised) {
      return null;
    }
    const {t, tLabel, activeFacet} = this.props;
    const facetsOpen = this.state.facetsOpen;
    const {PublisherFacet, ThemeFacet, KeywordFacet, FormatFacet} = this;
    //
    const facetClassName = "collapse-sm-down"
      + (this.state.facetsOpen ? " show" : "");
    return (
      <React.Fragment>
        <div className="d-sm-none">
          <Button
            onClick={() => this.setState({"facetsOpen": !facetsOpen})}
            style={{"margin": "1em"}}
          >
            {t(facetsOpen ? "facet.hide" : "facet.show")}
          </Button>
        </div>
        <div className={facetClassName}>
          <FacetIsPartOf
            t={t}
            tLabel={tLabel}
            values={activeFacet.isPartOf}
            deselect={this.toggleIsPartOfFacet}
          />
          <PublisherFacet
            t={t}
            label="publishers"
            getFacetLabel={(item) => tLabel(item.iri)}
            fetchMore={this.publisherFetchMore}
            toggleFacet={this.togglePublisherFacet}
            facetActive={activeFacet[QUERY_DATASET_LIST_PUBLISHER]}
            fetchLabels={this.props.fetchLabels}
          />
          <ThemeFacet
            t={t}
            label="themes"
            getFacetLabel={(item) => tLabel(item.iri)}
            fetchMore={this.themeFetchMore}
            toggleFacet={this.toggleThemeFacet}
            facetActive={activeFacet[QUERY_DATASET_LIST_THEME]}
            fetchLabels={this.props.fetchLabels}
          />
          <KeywordFacet
            t={t}
            label="keywords"
            getFacetLabel={(item) => item.code}
            fetchMore={this.keywordFetchMore}
            toggleFacet={this.toggleKeywordFacet}
            facetActive={activeFacet[QUERY_DATASET_LIST_KEYWORD]}
          />
          <FormatFacet
            t={t}
            label="formats"
            getFacetLabel={(item) => tLabel(item.iri)}
            fetchMore={this.formatFetchMore}
            toggleFacet={this.toggleFormatFacet}
            facetActive={activeFacet[QUERY_DATASET_LIST_FORMAT]}
            fetchLabels={this.props.fetchLabels}
          />
        </div>
      </React.Fragment>
    );
  }

  publisherFetchMore(count) {
    this.props.fetchMoreFacet(QUERY_DATASET_LIST_PUBLISHER, count);
  }

  togglePublisherFacet(item) {
    this.props.toggleFacet(QUERY_DATASET_LIST_PUBLISHER, item);
  }

  themeFetchMore(count) {
    this.props.fetchMoreFacet(QUERY_DATASET_LIST_THEME, count);
  }

  toggleThemeFacet(item) {
    this.props.toggleFacet(QUERY_DATASET_LIST_THEME, item);
  }

  keywordFetchMore(count) {
    this.props.fetchMoreFacet(QUERY_DATASET_LIST_KEYWORD, count);
  }

  toggleKeywordFacet(item) {
    this.props.toggleFacet(QUERY_DATASET_LIST_KEYWORD, item);
  }

  formatFetchMore(count) {
    this.props.fetchMoreFacet(QUERY_DATASET_LIST_FORMAT, count);
  }

  toggleFormatFacet(item) {
    this.props.toggleFacet(QUERY_DATASET_LIST_FORMAT, item);
  }

  toggleIsPartOfFacet(item) {
    this.props.toggleFacet(QUERY_DATASET_IS_PART_OF, item);
  }

}


Facets.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "withFacetProps": PropTypes.func.isRequired,
  "fetchMoreFacet": PropTypes.func.isRequired,
  "toggleFacet": PropTypes.func.isRequired,
  "activeFacet": PropTypes.shape({
    "isPartOf" : PropTypes.array.isRequired,
    [QUERY_DATASET_IS_PART_OF]: PropTypes.array.isRequired,
    [QUERY_DATASET_LIST_PUBLISHER]: PropTypes.array.isRequired,
    [QUERY_DATASET_LIST_THEME]: PropTypes.array.isRequired,
    [QUERY_DATASET_LIST_KEYWORD]: PropTypes.array.isRequired,
    [QUERY_DATASET_LIST_FORMAT]: PropTypes.array.isRequired,
  }).isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

register({
  "name": DATASET_LIST_FACET_FILTERS,
  "element": Facets,
});
