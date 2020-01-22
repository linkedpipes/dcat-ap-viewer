import React from "react";
import {PropTypes} from "prop-types";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {InputGroup, InputGroupAddon, InputGroupText, Button} from "reactstrap";

import {getString} from "../../../app-services/strings";
import {constructTypeaheadUrl} from "../../../dataset/solr-api";
import {fetchJson} from "../../../app-services/http-request";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

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
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    // Last value as submitted.
    this.lastSubmittedValue = undefined;
    // Last user provided value, is set to lastSubmittedValue on submit.
    this.currentInputValue = undefined;
  }

  getInitialState() {
    return {
      // We start by selecting the value from props.
      "isLoading": false,
      "options": [],
    }
  }

  render() {
    let defaultSelected = [];
    if (this.props.defaultValue !== undefined) {
      defaultSelected = [this.props.defaultValue];
    }
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="material-icons">search</i>
          </InputGroupText>
        </InputGroupAddon>
        <AsyncTypeahead
          id="search-box"
          minLength={2}
          multiple={false}
          useCache={false}
          isLoading={this.state.isLoading}
          onSearch={this.fetchOptions}
          options={this.state.options}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onInputChange={this.onInputChange}
          defaultSelected={defaultSelected}
          searchText={getString("search.searching")}
          emptyLabel={getString("search.no_data_found")}
          ref={(ref) => this.typeahead = ref}
          filterBy={() => { // option, props
            // Just show all that we get.
            return true;
          }}
          renderMenuItemChildren={(text) => { // text, props, idx
            return (
              <span>{text}</span>
            )
          }}
        />
        <InputGroupAddon addonType="append">
          <Button color="primary"
            onClick={this.onSearch}>
            {getString("search.search")}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    )
  }

  fetchOptions(textQuery) {
    if (textQuery === "") {
      this.setState({"options": []});
    }
    this.setState({"isLoading": true});

    // TODO Move to some sort of API/action file?
    const url = constructTypeaheadUrl(textQuery, this.props.query);
    return fetchJson(url).then((data) => {
      const options = data.json.response.docs.map((item) => item.title);
      this.setState({
        "isLoading": false,
        "options": options,
      });
    }).catch(() => {
      this.setState({
        "isLoading": false,
        "options": [],
      });
    });
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      // This can happen in text box after user input, or
      // in the expansion with suggestion. Luckily in both
      // cases the target has the right value by now.
      this.typeahead.getInstance().blur();
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
    if (this.lastSubmittedValue === value) {
      // This can happen when user use enter to select form suggestion,
      // as in this case the onKeyDown and then onChange are called.
      return;
    }
    this.emitOnSearchEvent(value);
  }

  emitOnSearchEvent(value) {
    this.lastSubmittedValue = value;
    this.currentInputValue = value;
    this.props.onSearch(value);
  }

  onSearch() {
    if (this.currentInputValue === undefined) {
      // User do not change the search so it's same as when he come to
      // this page.
      return;
    }
    // Take current value and submit for search.
    let value = this.currentInputValue;
    if (this.lastSubmittedValue === value) {
      // We already have results for this value.
      return;
    }
    this.emitOnSearchEvent(value);
  }

  onInputChange(value) {
    this.currentInputValue = value;
  }

  clear() {
    this.typeahead.getInstance().clear();
    this.lastSubmittedValue = undefined;
    this.currentInputValue = undefined;
  }

}

SearchBox.propTypes = {
  "defaultValue": PropTypes.string,
  "onSearch": PropTypes.func.isRequired,
  "query": PropTypes.object.isRequired,
  "value": PropTypes.string,
};

export default SearchBox;
