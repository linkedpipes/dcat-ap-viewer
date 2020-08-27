import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import {getRegisteredElement} from "../app/register";
import {KeywordListActions} from "./keyword-list-action";

export const ELEMENT_KEYWORD_LIST = "app.keyword-list";

class KeywordListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const KeywordList = getRegisteredElement(ELEMENT_KEYWORD_LIST);
    return (
      <KeywordList/>
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

KeywordListContainer.propTypes = {
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => dispatch(KeywordListActions.mountKeywordList()),
  "onUnMount": () => dispatch(KeywordListActions.unMountKeywordList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordListContainer);
