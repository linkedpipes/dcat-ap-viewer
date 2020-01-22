import React from "react";
import {connect} from "react-redux";
import {selectedKeywordsSelector, queryKeywordsSelector} from "../dataset-list-reducer";
import {KEYWORDS_QUERY} from "../../../app/navigation";
import {updateQueryFilters} from "../dataset-list-actions";
import {TagCloud} from "react-tagcloud";
import {keywordsMapSelector} from "../../../keyword/keyword-reducer";
import {PropTypes} from "prop-types";

class _KeywordCloud extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const renderer = (tag, size) => // tag, size, color
      tagRenderer(this.props.all, this.props.selected, tag, size);
    return (
      <div className="col col-sm-12 col-md-9 offset-md-1"
        style={{"textAlign": "center", "display": "block"}}>
        <br/>
        <TagCloud minSize={20}
          maxSize={52}
          shuffle={false}
          tags={this.props.query}
          renderer={renderer}
          onClick={this.onClick}/>
      </div>
    );
  }

  onClick(tag) {
    this.props.setKeywordsFacet(tag.label, true);
  }

}

function tagRenderer (all, selected, tag, size) {
  const style = {
    "marginLeft": "1REM",
    "verticalAlign": "middle",
    "display": "inline-block",
    "cursor": "pointer",
  };
    // If all elements have the same count, then size is NaN.
  if (isNaN(size)) {
    size = 32;
  }

  const entry = all[tag["@id"]];

  let color = "black";
  if (entry) {
    color = entry["color"];
  }

  return (
    <span className="tag-cloud-tag" style={style} key={tag.label}>
      <span style={{"color": color, "fontSize": size}}>
        {tag.label}
      </span>
    </span>
  )
}

_KeywordCloud.propTypes = {
  "all": PropTypes.array.isRequired,
  "selected": PropTypes.array.isRequired,
  "query": PropTypes.object.isRequired,
  "labels": PropTypes.object.isRequired,
  "setKeywordsFacet": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "all": keywordsMapSelector(state),
  "selected": selectedKeywordsSelector(state),
  "query": queryKeywordsSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "setKeywordsFacet": (value, isActive) => dispatch(updateQueryFilters(
    ownProps.location, KEYWORDS_QUERY, value, isActive,
  )),
});

const KeywordCloud = connect(mapStateToProps, mapDispatchToProps)(_KeywordCloud);

export default KeywordCloud;