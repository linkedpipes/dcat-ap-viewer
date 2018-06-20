import React from "react";
import {getString} from "../../app/strings";
import SearchBox from "./components/search-box"
import SortSelector from "./components/sort-selector";
import {Row, Col, Input, Button} from "reactstrap";
import {
    querySelector
} from "./dataset-list-reducer";
import {connect} from "react-redux";
import {
    clearQuery,
    updateQuery,
    updateQueryFilters
} from "./dataset-list-actions";
import {
    PAGE_QUERY, SORT_QUERY,
    STRING_QUERY,
    TEMPORAL_END,
    TEMPORAL_START
} from "../../app/navigation";


class _QueryInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialStatus();
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    getInitialStatus() {
        // TODO Make filters visible on first opening if they are used.
        return {
            "visible": false
        }
    }

    toggleVisibility() {
        this.setState({"visible": !this.state.visible});
    }

    render() {
        return (
            <div style={{
                "borderStyle": "solid",
                "borderWidth": "1px",
                "borderColor": "#E0E0E0",
                "padding": "0.5REM",
                "marginBottom": "1REM"
            }}>
                <SearchBox
                    defaultValue={this.props.query.search}
                    onSearch={this.props.setSearchString}
                />
                {this.state.visible &&
                <div style={{"margin": "1REM 1REM 0REM 2REM"}}>
                    <Row style={{"lineHeight": "2.5REM"}}>
                        <span style={{"marginRight": "0.5REM"}}>
                            {getString("s.temporal")}
                        </span>
                        <span style={{"marginRight": "0.5REM"}}>
                            {getString("s.from")}
                        </span>
                        <Input type="date" id="temporal-start"
                               onChange={this.props.setTemporalStart}
                               value={this.props.query.temporalStart}
                               style={{"width": "12REM"}}/>
                        <span style={{
                            "marginRight": "0.5REM",
                            "marginLeft": "0.5REM"
                        }}>
                            {getString("s.to")}
                        </span>
                        <Input type="date" id="temporal-end"
                               onChange={this.props.setTemporalEnd}
                               value={this.props.query.temporalEnd}
                               style={{"width": "12REM"}}/>
                    </Row>
                </div>
                }
                <Row>
                    <Col>
                        <Button
                            className="mt-2 mr-2"
                            onClick={this.toggleVisibility}>
                            {this.state.visible ?
                                getString("s.hide_filters") :
                                getString("s.show_filters")}
                        </Button>
                        <Button
                            className="mt-2"
                            onClick={this.props.clearFilters}>
                            {getString("s.clear_filters")}
                        </Button>
                    </Col>
                    <Col className="mt-2">
                        <div className="float-lg-right">
                            <SortSelector
                                value={this.props.query.sort}
                                onChange={this.props.setSort}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => ({
    "query": querySelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "clearFilters": () => dispatch(clearQuery(ownProps.location)),
    "setTemporalStart": (event) => dispatch(updateQueryFilters(
        ownProps.location, {[TEMPORAL_START]: event.target.value}, [PAGE_QUERY]
    )),
    "setTemporalEnd": (event) => dispatch(updateQueryFilters(
        ownProps.location, {[TEMPORAL_END]: event.target.value}, [PAGE_QUERY]
    )),
    "setSearchString": (value) => dispatch(updateQuery(
        ownProps.location, {[STRING_QUERY]: value}, [PAGE_QUERY]
    )),
    "setSort": (sortBy) => dispatch(updateQuery(
        ownProps.location, {[SORT_QUERY]: sortBy}, [PAGE_QUERY]
    )),
});

const QueryInput = connect(mapStateToProps, mapDispatchToProps)(_QueryInput);

export default QueryInput;