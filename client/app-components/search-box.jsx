import React from "react";
import {PropTypes} from "prop-types";
import {getString} from "../app/strings";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

/**
 * Wrap AsyncTypeahead component.
 *
 * The issue is that we want to perform search for data that are not
 * suggested, ie. on user pressing enter with any string and the
 * component is not designed for that.
 */
class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.fetchOptions = this.fetchOptions.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitValue = this.submitValue.bind(this);
        this.lastSubmitedValue = null;
    }

    getInitialState() {
        return {
            // We start by selecting the value from props.
            "isLoading": false,
            "options": []
        }
    }

    render() {
        return (
            <div>
                {getString("s.search")}
                <AsyncTypeahead
                    minLength={2}
                    multiple={false}
                    useCache={false}
                    isLoading={this.state.isLoading}
                    onSearch={this.fetchOptions}
                    options={this.state.options}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    defaultSelected={[this.props.value]}
                    searchText={getString("s.searching")}
                    emptyLabel={getString("s.no_data_found")}
                />
            </div>
        )
    }

    fetchOptions(query) {
        if (query === "") {
            this.setState({"options": []});
        }
        this.setState({"isLoading": true});
        // TODO Covert to promise.
        this.props.onFetchOptions(query, (options) => {
            this.setState({
                "isLoading": false,
                "options": options
            });
        }, () => {
            this.setState({
                "isLoading": false,
                "options": []
            });
        });
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            // This can happen in text box after user input, or
            // in the expansion with suggestion. Luckily in both
            // cases the target has the right value by now.
            this.submitValue(event.target.value);
        }
    }

    /**
     * Called when use select a suggested value.
     */
    onChange(value) {
        if (value.length === 0) {
            // There is change only in text, ignore this.
            return;
        }
        this.submitValue(value[0]);
    }

    submitValue(value) {
        if (this.props.value === value) {
            // Same value as given by props, ie. no change to the actually
            // visible results.
            return
        }
        if (this.lastSubmitedValue === value) {
            // This can happen when user use enter to select form suggestion,
            // as in this case the onKeyDown and then onChange are called.
            return;
        }
        this.lastSubmitedValue = value;
        this.props.onSearch(value);
    }

}

SearchBox.propTypes = {
    "value": PropTypes.string.isRequired,
    "onFetchOptions": PropTypes.func.isRequired,
    "onSearch": PropTypes.func.isRequired,
    // TODO Remove as not used.
    // Can be used to synchronize value outside search, enabling
    // user to change value, click filter and use given value
    // without submission.
    "onValueChange": PropTypes.func.isRequired
};

export default SearchBox;

