import React from "react";
import {PropTypes} from "prop-types";
import {getString} from "./../application/strings";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

/**
 * Wrap AsyncTypeahead component.
 *
 * The AsyncTypeahead use multiple callbacks to handle input change.
 * For our use-case we need to perform search on enter or selection
 * of an item from the typeahead list.
 */
class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.fetchOptions = this.fetchOptions.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.submitValue = this.submitValue.bind(this);

        // We use member property as setState does not change fast enough,
        // because we need to record the change in between calls of member
        // functions.
        this.status = {
            "value": "",
            "searchExecuted": ""
        }
    }

    getInitialState() {
        return {
            "isLoading": false,
            "options": []
        }
    }

    render() {
        return (
            <div>
                {getString("s.search")}
                <AsyncTypeahead
                    promptText={""}
                    searchText={getString("s.searching")}
                    useCache={false}
                    isLoading={this.state.isLoading}
                    minLength={2}
                    onSearch={this.fetchOptions}
                    options={this.state.options}
                    onChange={this.onChange}
                    onInputChange={this.onInputChange}
                    onKeyDown={this.onKeyDown}
                    selected={[this.props.value]}
                    emptyLabel={getString("s.no_data_found")}
                />
            </div>
        )
    }

    /**
     * Perform fetch of values that user can select from.
     */
    fetchOptions(query) {
        if (query === "") {
            this.setState({"options": []});
        }
        this.setState({"isLoading": true});
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
            this.submitValue();
        }
    }

    /**
     * Called on change of data, which is NOT after every keypress.
     */
    onChange(value) {
        if (value[0] === undefined) {
            return;
        }
        value = value[0];
        this.props.onValueChange(value);
        if (this.props.value === this.status.value) {
            // This means that user selected new value from list
            // by pressing enter. In that case we ignore the change.
        } else {
            this.submitValue();
        }
    }

    /**
     * This function is called whenever value change, basically after every
     * key press or value selection.
     */
    onInputChange(value) {
        this.status.value = value;
        this.status.searchExecuted = false;
    }

    /**
     * Handle submit of value ie. user request for search.
     */
    submitValue() {
        if (this.status.searchExecuted) {
            return;
        }
        this.status.searchExecuted = true;
        this.props.onSearch(this.status.value);
    }

}

SearchBox.propTypes = {
    "value": PropTypes.string.isRequired,
    "onFetchOptions": PropTypes.func.isRequired,
    "onSearch": PropTypes.func.isRequired,
    "onValueChange": PropTypes.func.isRequired
};

export default SearchBox;

