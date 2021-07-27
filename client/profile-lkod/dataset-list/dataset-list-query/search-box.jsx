import React from "react";
import {PropTypes} from "prop-types";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {InputGroup, InputGroupText, Button} from "reactstrap";

import {t} from "../../viewer-api";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "./search-box.css";

/**
 * Wrap AsyncTypeahead component.
 *
 * The issue is that we want to perform search for data that are not
 * suggested, ie. on user pressing enter with any string and the
 * component is not designed for that.
 */
export default class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // We start by selecting the value from props.
      "isLoading": false,
      "options": [],
      "selected": [""],
    };
    this.typeahead = React.createRef();
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

  componentDidMount() {
    // Set initial value, for example use may open link with search value.
    this.setState({"selected": [this.props.value]});
  }

  componentDidUpdate(prevProps) {
    // We update only if the value has changed, for example back navigation.
    if (prevProps.value !== this.props.value) {
      this.setState({"selected": [this.props.value]});
    }
  }

  render() {
    return (
      <InputGroup id="search-box">
        <InputGroupText>
          <i className="material-icons">search</i>
        </InputGroupText>
        <AsyncTypeahead
          id="search-box-typeahead"
          minLength={2}
          multiple={false}
          useCache={false}
          isLoading={this.state.isLoading}
          onSearch={this.fetchOptions}
          options={this.state.options}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onInputChange={this.onInputChange}
          searchText={t("search.searching")}
          emptyLabel={t("search.noDataFound")}
          selected={this.state.selected}
          ref={this.typeahead}
          filterBy={() => { // option, props
            // Just show all that we get -> apply no filter.
            return true;
          }}
          renderMenuItemChildren={(text) => ( // text, props, idx
            <span>{text}</span>
          )}
        />
        <Button
          color="primary"
          onClick={this.onSearch}
        >
          {t("search.search")}
        </Button>
      </InputGroup>
    );
  }

  fetchOptions(textQuery) {
    if (textQuery === "") {
      this.setState({"options": []});
    }
    this.setState({"isLoading": true});
    this.props.fetchTypeahead(textQuery)
      .then((data) => {
        this.setState({
          "isLoading": false,
          "options": data.map(item => item.title),
        });
      })
      .catch(() => {
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
      this.typeahead.current.blur();
      this.submitValue(event.target.value);
    }
  }

  /**
   * Called when use select a suggested value.
   */
  onChange(value) {
    this.setState({"selected": value});
    if (value.length === 0) {
      // There is change only in text, ignore this.
      return;
    }
    this.submitValue(value[0]);
  }

  submitValue(value) {
    if (this.props.defaultValue === value) {
      // Same value as given by props, ie. no change to the actually
      // visible results.
      return;
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
    this.props.onSetValue(value);
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
    this.typeahead.current.clear();
    this.lastSubmittedValue = undefined;
    this.currentInputValue = undefined;
  }

}

SearchBox.propTypes = {
  // Last set value.
  "value": PropTypes.string,
  "defaultValue": PropTypes.string,
  "onSetValue": PropTypes.func.isRequired,
  "fetchTypeahead": PropTypes.func.isRequired,
};
