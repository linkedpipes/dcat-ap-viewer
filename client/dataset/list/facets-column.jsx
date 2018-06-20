import React from "react";
import {
    PUBLISHER_QUERY,
    KEYWORDS_QUERY,
    FORMAT_QUERY
} from "../../app/navigation";
import {getString} from "../../app/strings";
import FacetFilter from "./components/facet-filter";
import {
    formatsSelector,
    keywordsSelector,
    publishersSelector,
    querySelector
} from "./dataset-list-reducer";
import {
    updateQueryFilters
} from "./dataset-list-actions";
import {connect} from "react-redux";
import {Col, Button} from "reactstrap";

class _FacetsColumn extends React.Component {

    constructor(props) {
        super(props);
        this.toggleFacets = this.toggleFacets.bind(this);
        this.state = FacetsColumn.getInitialState();
    }

    static getInitialState() {
        return {
            "areFacetsOpen": false
        }
    }

    toggleFacets() {
        this.setState({
            "areFacetsOpen": !this.state.areFacetsOpen
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
                        label="s.publishers"
                        values={this.props.publisher}
                        active={this.props.query.publisher}
                        onChange={this.props.setPublisherFacet}
                    />
                    <FacetFilter
                        label="s.keywords"
                        values={this.props.keyword}
                        active={this.props.query.keyword}
                        onChange={this.props.setKeywordsFacet}
                    />
                    <FacetFilter
                        label="s.formats"
                        values={this.props.format}
                        active={this.props.query.format}
                        onChange={this.props.setFormatFacet}
                    />
                </div>
            </Col>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    "keyword": keywordsSelector(state),
    "publisher": publishersSelector(state),
    "format": formatsSelector(state),
    "query": querySelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "setKeywordsFacet": (facet, isActive) => dispatch(updateQueryFilters(
        ownProps.location, KEYWORDS_QUERY, facet.label, isActive
    )),
    "setPublisherFacet": (facet, isActive) => dispatch(updateQueryFilters(
        ownProps.location, PUBLISHER_QUERY, facet.label, isActive
    )),
    "setFormatFacet": (facet, isActive) => dispatch(updateQueryFilters(
        ownProps.location, FORMAT_QUERY, facet.label, isActive
    ))
});

const FacetsColumn = connect(
    mapStateToProps,
    mapDispatchToProps
)(_FacetsColumn);

export default FacetsColumn;

function ToggleFiltersButton({areFacetsOpen, onClick}) {
    let label;
    if (areFacetsOpen) {
        label = getString("s.hide_facets");
    } else {
        label = getString("s.show_facets");
    }
    return (
        <Button onClick={onClick} style={{"margin": "1em"}}>
            {label}
        </Button>
    )
}
