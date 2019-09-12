import React from "react";
import {
  PUBLISHER_QUERY,
  KEYWORDS_QUERY,
  FORMAT_QUERY,
  THEME_QUERY,
} from "@/app/navigation";
import {getString} from "@/app-services/strings";
import FacetFilter from "./ui/facet-filter";
import {
  queryFormatsSelector,
  selectedFormatsSelector,
  queryKeywordsSelector,
  selectedKeywordsSelector,
  queryPublishersSelector,
  selectedPublishersSelector,
  queryThemesSelector,
  selectedThemesSelector,
  querySelector,
} from "./dataset-list-reducer";
import {
  updateQueryFilters,
} from "./dataset-list-actions";
import {connect} from "react-redux";
import {Col, Button} from "reactstrap";
import {labelsSelector} from "@/app-services/labels";
import {PropTypes} from "prop-types";

class _FacetsColumn extends React.Component {

  constructor(props) {
    super(props);
    this.toggleFacets = this.toggleFacets.bind(this);
    this.state = _FacetsColumn.getInitialState();
  }

  static getInitialState() {
    return {
      "areFacetsOpen": false,
    }
  }

  toggleFacets() {
    this.setState({
      "areFacetsOpen": !this.state.areFacetsOpen,
    });
  }

  render() {
    let facetClassName = this.state.areFacetsOpen ?
      "collapse-sm-down show" :
      "collapse-sm-down";
    return (
      <Col xs={12} md={3}>
        <div className="d-sm-none">
          <ToggleFiltersButton
            areFacetsOpen={this.state.areFacetsOpen}
            onClick={this.toggleFacets}/>
        </div>
        <div className={facetClassName}>
          <FacetFilter
            label="publishers"
            values={this.props.publisherQuery}
            active={this.props.publisherSelected}
            onChange={this.props.setPublisherFacet}
          />
          <FacetFilter
            label="themes"
            values={this.props.themeQuery}
            active={this.props.themeSelected}
            onChange={this.props.setThemeFacet}
            useIris={true}
            labels={this.props.labels}
          />
          <FacetFilter
            label="keywords"
            values={this.props.keywordQuery}
            active={this.props.keywordSelected}
            onChange={this.props.setKeywordsFacet}
          />
          <FacetFilter
            label="formats"
            values={this.props.formatQuery}
            active={this.props.formatSelected}
            onChange={this.props.setFormatFacet}
          />
        </div>
      </Col>
    )
  }
}

_FacetsColumn.propTypes = {
  "setKeywordsFacet": PropTypes.func.isRequired,
  "setPublisherFacet": PropTypes.func.isRequired,
  "setFormatFacet": PropTypes.func.isRequired,
  "setThemeFacet": PropTypes.func.isRequired,
  "keywordSelected": PropTypes.array.isRequired,
  "keywordQuery": PropTypes.array.isRequired,
  "publisherSelected": PropTypes.array.isRequired,
  "publisherQuery": PropTypes.array.isRequired,
  "formatSelected": PropTypes.array.isRequired,
  "formatQuery": PropTypes.array.isRequired,
  "themeSelected": PropTypes.array.isRequired,
  "themeQuery": PropTypes.array.isRequired,
  "query": PropTypes.object.isRequired,
  "labels": PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  "keywordSelected": selectedKeywordsSelector(state),
  "keywordQuery": queryKeywordsSelector(state),
  "publisherSelected": selectedPublishersSelector(state),
  "publisherQuery": queryPublishersSelector(state),
  "formatSelected": selectedFormatsSelector(state),
  "formatQuery": queryFormatsSelector(state),
  "themeSelected": selectedThemesSelector(state),
  "themeQuery": queryThemesSelector(state),
  "query": querySelector(state),
  "labels": labelsSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "setKeywordsFacet": (value, isActive) => dispatch(updateQueryFilters(
    ownProps.location, KEYWORDS_QUERY, value, isActive
  )),
  "setPublisherFacet": (value, isActive) => dispatch(updateQueryFilters(
    ownProps.location, PUBLISHER_QUERY, value, isActive
  )),
  "setFormatFacet": (value, isActive) => dispatch(updateQueryFilters(
    ownProps.location, FORMAT_QUERY, value, isActive
  )),
  "setThemeFacet": (value, isActive) => dispatch(updateQueryFilters(
    ownProps.location, THEME_QUERY, value, isActive
  )),
});

const FacetsColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FacetsColumn);

export default FacetsColumn;

function ToggleFiltersButton({areFacetsOpen, onClick}) {
  let label;
  if (areFacetsOpen) {
    label = getString("facet.hide");
  } else {
    label = getString("facet.show");
  }
  return (
    <Button onClick={onClick} style={{"margin": "1em"}}>
      {label}
    </Button>
  )
}

ToggleFiltersButton.propTypes = {
  "onClick": PropTypes.func.isRequired,
  "areFacetsOpen": PropTypes.bool.isRequired,
};
