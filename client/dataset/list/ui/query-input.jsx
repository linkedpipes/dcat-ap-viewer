import React from "react";
import {getString} from "../../../app/strings";
import SearchBox from "./search-box"
import ViewSelector from "./view-selector";
import {Row, Col, Input, Button} from "reactstrap";
import {
    querySelector
} from "../dataset-list-reducer";
import {connect} from "react-redux";
import {
    clearQuery,
    updateQuery,
    updateQueryFilters
} from "../dataset-list-actions";
import {
    PAGE_QUERY,
    VIEW_QUERY,
    STRING_QUERY,
    TEMPORAL_END,
    TEMPORAL_START
} from "../../../app/navigation";


class _QueryInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialStatus();
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.onThisYear = this.onThisYear.bind(this);
        this.onLastYear = this.onLastYear.bind(this);
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
                    query={this.props.query}
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
                               style={{"width": "11REM"}}/>
                        <span style={{
                            "marginRight": "0.5REM",
                            "marginLeft": "0.5REM"
                        }}>
                            {getString("s.to")}
                        </span>
                        <Input type="date" id="temporal-end"
                               onChange={this.props.setTemporalEnd}
                               value={this.props.query.temporalEnd}
                               style={{
                                   "width": "11REM",
                                   "marginRight": "0.5REM"
                               }}/>
                        <Button style={{"marginRight": "0.5REM"}}
                                onClick={this.onThisYear}>
                            This year
                        </Button>
                        <Button onClick={this.onLastYear}>
                            Last year
                        </Button>
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
                            <ViewSelector
                                value={this.props.query.datasetListView}
                                onChange={this.props.setView}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    onThisYear() {
        const now = new Date;
        let start = now.getFullYear() + "-01-01";
        let end = now.getFullYear() + "-12-31";
        this.props.setTemporal(start, end);
    }

    onLastYear() {
        const now = new Date;
        let start = (now.getFullYear() - 1) + "-01-01";
        let end = (now.getFullYear() - 1) + "-12-31";
        this.props.setTemporal(start, end);
    }

}


const mapStateToProps = (state, ownProps) => ({
    "query": querySelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "clearFilters": () => dispatch(clearQuery(ownProps.location)),
    "setTemporalStart": (event) => dispatch(updateQuery(
        ownProps.location, {[TEMPORAL_START]: event.target.value}, [PAGE_QUERY]
    )),
    "setTemporalEnd": (event) => dispatch(updateQuery(
        ownProps.location, {[TEMPORAL_END]: event.target.value}, [PAGE_QUERY]
    )),
    "setTemporal": (start, end) => dispatch(updateQuery(
        ownProps.location, {
            [TEMPORAL_START]: start,
            [TEMPORAL_END]: end
        }, [PAGE_QUERY]
    )),
    "setSearchString": (value) => dispatch(updateQuery(
        ownProps.location, {[STRING_QUERY]: value}, [PAGE_QUERY]
    )),
    "setView": (sortBy) => dispatch(updateQuery(
        ownProps.location, {[VIEW_QUERY]: sortBy}, [PAGE_QUERY]
    ))
});

const QueryInput = connect(mapStateToProps, mapDispatchToProps)(_QueryInput);

export default QueryInput;
