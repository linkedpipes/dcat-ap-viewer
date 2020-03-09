import React from "react";
import {connect} from "react-redux";
import {onMount, onUnMount} from "./keyword-tagloud-action";
import {
  selectKeywords,
  selectFailed,
  selectReady,
} from "./keyword-tagloud-reducer";
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
    if (this.props.failed) {
      return (
        <div>
          publisher-list : loading ... failed
        </div>
      );
    } else if (this.props.ready) {
      return (
        <KeywordList keywords={this.props.keywords}/>
      )
    } else {
      return (
        <div>
          publisher-list : loading ...
        </div>
      );
    }
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

KeywordListContainer.propTypes = {
  "ready": PropTypes.bool.isRequired,
  "failed": PropTypes.bool.isRequired,
  "keywords": PropTypes.arrayOf(PropTypes.object).isRequired,
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "ready": selectReady(state),
  "failed": selectFailed(state),
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
  mapDispatchToProps,
)(KeywordListContainer);
