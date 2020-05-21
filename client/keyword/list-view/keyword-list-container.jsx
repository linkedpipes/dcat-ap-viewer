import React from "react";
import {connect} from "react-redux";
import {onMount, onUnMount} from "./keyword-list-action";
import {
  selectKeywords,
  selectError,
  selectReady,
} from "./keyword-list-reducer";
import {fetchKeywordList} from "../../api/api-action";
import {getRegisteredElement} from "../../app/register";
import {ELEMENT_KEYWORD_LIST} from "../../app/component-list";
import {PropTypes} from "prop-types";


class KeywordListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const KeywordList = getRegisteredElement(ELEMENT_KEYWORD_LIST);
    const {ready, error, keywords} = this.props;
    return (
      <KeywordList ready={ready} error={error} keywords={keywords}/>
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

KeywordListContainer.propTypes = {
  "ready": PropTypes.bool.isRequired,
  "error": PropTypes.number.isRequired,
  "keywords": PropTypes.arrayOf(PropTypes.object).isRequired,
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "ready": selectReady(state),
  "error": selectError(state),
  "keywords": selectKeywords(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => {
    dispatch(onMount());
    dispatch(fetchKeywordList());
  },
  "onUnMount": () => {
    dispatch(onUnMount());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordListContainer);
